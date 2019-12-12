import { User } from './../../../../Mysql/User';
import { Observable, Observer } from 'rxjs';
import { AuthenticateChaine } from '../containers/AuthenticateChaine';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
export class DestroyToken implements AuthenticateChaine {
    private Nextchaine!: AuthenticateChaine;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;


    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        this.request = request;
        this.response = response;
    }


    public setNextChaine(chaine: AuthenticateChaine): void {
        this.Nextchaine = chaine;
    }
    public processOperation(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.process().subscribe(
                (resp) => {
                    if (resp) {
                        console.log('Log Out achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in lOG OUT');
                    reject(false);

                },
                () => {
                    console.log('log out complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            const bearer = (this.request.header('authorization') as string).split(' ');
            let token: string = bearer[1];
            console.log(token);

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


        });



    }




}