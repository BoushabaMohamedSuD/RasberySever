import { reject } from 'bluebird';
import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';

import { User } from '../../../../Mysql/User';
import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
export class ForgetPasswordTokenValidation implements RasberyResponsabilities {
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
                        console.log('ForgetPasswordTokenVerification achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in ForgetPasswordTokenVerification');
                    reject(false);

                },
                () => {
                    console.log('ForgetPasswordTokenVerification complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            jwt.verify(this.request.params['token'], 'NodeJsIotSUD', (err: any, authdata: any) => {
                if (!err) {
                    if (authdata != null) {
                        if (authdata.type == 'ForgetPassword') {
                            this.data.username = authdata.username;
                            this.data.email = authdata.email;
                            if (this.request.body.password == this.request.body.cfpassword) {
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
                            } else {
                                observer.error(false);
                                console.log('cfpassord and password are not equal');
                            }

                        } else {
                            console.log("token is not match up with headres");
                            observer.error(false);
                        }
                    } else {
                        observer.error(false);
                        console.log('authdata is null');
                    }

                } else {
                    observer.error(false);
                    console.log('authorization field');
                }
            });





        });



    }




}