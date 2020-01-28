import { Lcd } from './../../../Johhny-five/Lcd';
import { userInfo } from 'os';
import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { RasberySql } from './../../../../Mysql/RasberySQL';

import { User } from '../../../../Mysql/User';

import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import { constants } from 'buffer';
export class TurnOnMotor implements RasberyResponsabilities {
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
                        console.log(' Update data achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in update data');
                    reject(false);

                },
                () => {
                    console.log('update data complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            console.log("::::::::::::::::::::::::::turn on the Motor:::::::::::::::::::::::::::::::")
            const message: string = this.data.username + "turn on ";
            console.log(message);
            new Lcd().WriteMessage(message);

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