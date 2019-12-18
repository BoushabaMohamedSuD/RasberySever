import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { User } from '../../../../Mysql/User';

import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class DeleteUser implements RasberyResponsabilities {
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
                        console.log('is raedy achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in is ready');
                    reject(false);

                },
                () => {
                    console.log('is ready complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            User.findOne({ where: { username: this.request.body.targetname } })
                .then((user) => {
                    if (user != null) {
                        user.$get('RasberyHolder')
                            .then((rasbery) => {
                                if (rasbery != null) {
                                    user.$remove('RasberyHolder', rasbery)
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
                                            console.log("we can't remove rasbery from user");
                                            observer.error(false);
                                        });
                                } else {
                                    console.log("rasebry fetched from user is null");
                                    observer.error(false);
                                }
                            })
                            .catch((err) => {
                                console.log('can not get the rasbery from user');
                                observer.error(false);
                            });
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