import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { User } from '../../../../Mysql/User';

import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class UserGetAuthority implements RasberyResponsabilities {
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
                        console.log('user get authority achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in user get authority');
                    reject(false);

                },
                () => {
                    console.log('user get authority complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            User.findOne({ where: { username: this.data.username } })
                .then((user) => {
                    if (user != null) {
                        this.data.email = user.email;
                        this.data.authority = user.authority;
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
                            this.response.json(this.data);
                            observer.next(true);
                            observer.complete();
                        }
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