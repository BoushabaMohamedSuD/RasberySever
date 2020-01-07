import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { RasberySql } from './../../../../Mysql/RasberySQL';

import { User } from '../../../../Mysql/User';

import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import { reject } from 'bluebird';
export class GetAllUsers implements RasberyResponsabilities {
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
                        console.log('rasbery is blocked achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in rasbery is blocked');
                    reject(false);

                },
                () => {
                    console.log('rasbery is blocked complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {

        return new Observable((observer: Observer<boolean>) => {

            RasberySql.findOne({ where: { id: 1 } })
                .then((rasbery) => {
                    if (rasbery != null) {
                        rasbery.$get('users')
                            .then((users: any) => {
                                if (users != null) {
                                    //console.log(users);
                                    console.log(users.length);
                                    console.log(users[0].username);
                                    let i = 0;
                                    while (i < users.length) {
                                        if (users[i].username != this.data.username) {
                                            this.data.usernames.push(users[i].username);
                                        }

                                        i++;
                                    }
                                    console.log(this.data.usernames);
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
                                        this.response.json(this.data.usernames);
                                        observer.next(true);
                                        observer.complete();
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log("we cannot fecth all users from rasbery");
                                observer.error(false);
                            })

                    } else {
                        observer.error(false);
                        console.log("rasbery after fitching is null");
                    }
                })
                .catch((err) => {
                    observer.error(false);
                    console.log('can not find rasbery');
                });

        });


    }





}