import { Notification } from './../../../../Mysql/Notification';
import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { User } from '../../../../Mysql/User';

import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class AddNotification implements RasberyResponsabilities {
    private Nextchaine!: RasberyResponsabilities;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;
    private data: any;


    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>, data: any) {
        this.request = request;
        this.response = response;
        this.data = data;
    }

    public setNextChaine(chaine: RasberyResponsabilities): void {
        this.Nextchaine = chaine;
    }
    public processOperation(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.process().subscribe(
                (resp) => {
                    if (resp) {
                        console.log('add notification achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in add notification');
                    reject(false);

                },
                () => {
                    console.log('add notification complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            User.findOne({ where: { username: this.data.username } })
                .then((user) => {
                    if (user != null) {
                        Notification.create({ message: this.request.body.message })
                            .then((notification) => {
                                if (notification != null) {
                                    user.$add('notifications', notification)
                                        .then(() => {
                                            if (this.Nextchaine != null) {
                                                console.log('going to next chaine');
                                                this.Nextchaine.processOperation()
                                                    .then((resp) => {
                                                        console.log(resp);
                                                        observer.next(true);
                                                        observer.complete();
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                        console.log('Error');
                                                        observer.error(false);
                                                    });
                                            } else {
                                                console.log('this is the end of the chaine');
                                                observer.next(true);
                                                observer.complete();
                                            }

                                        })
                                        .catch((err) => {
                                            console.log("we can not add notification to user");
                                            observer.error(false);
                                        })
                                } else {
                                    console.log("ntification is null");
                                    observer.error(false);
                                }

                            })
                            .catch((err) => {
                                console.log("we can not create notification");
                                observer.error(false);
                            })
                    } else {
                        observer.error(false);
                        console.log("user after fitching is null");
                    }
                })
                .catch((err) => {
                    observer.error(false);
                    console.log('can not find user');
                });



        });


    }




}