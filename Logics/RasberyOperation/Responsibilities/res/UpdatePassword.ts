import { User } from '../../../../Mysql/User';
import { RasberySql } from '../../../../Mysql/RasberySQL';
import { RasberyResponsabilities } from '../containers/RasberyResponsabilities';
import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class UpdatePassword implements RasberyResponsabilities {
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
                        console.log('UpdatePassword achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in UpdatePassword');
                    reject(false);

                },
                () => {
                    console.log('UpdatePassword  complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            User.update({ password: this.request.body.password }, { where: { email: this.data.email } })
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
                .catch(err => {
                    console.log("we cannot get the user");
                    observer.error(false);
                })


        });


    }




}