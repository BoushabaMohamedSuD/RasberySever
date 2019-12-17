import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { RasberyId } from './../../../../proprieties/RasberyId';
import { User } from '../../../../Mysql/User';
import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import { RasberySql } from '../../../../Mysql/RasberySQL';
export class UserToRasbery implements RasberyResponsabilities {
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
                        console.log('user to rasbery achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in user o rasbery');
                    reject(false);

                },
                () => {
                    console.log('user to rasbery complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            User.findOne({ where: { username: this.data.username } })
                .then((user) => {
                    if (user != null) {
                        RasberySql.findOne({ where: { id: 1 } })
                            .then((rasbery) => {
                                if (rasbery != null) {
                                    rasbery.$add('users', user)
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
                                            observer.error(false);
                                            console.log('we can not add user to rasbery');
                                        })
                                } else {
                                    observer.error(false);
                                    console.log("rasbery is null");
                                }
                            })
                            .catch((err) => {
                                observer.error(false);
                                console.log("can not fetch rasbery from database");
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