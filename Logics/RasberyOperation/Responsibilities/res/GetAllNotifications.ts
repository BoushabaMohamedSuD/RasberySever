import { Notification } from './../../../../Mysql/Notification';
import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { User } from '../../../../Mysql/User';

import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class GetAllNotifications implements RasberyResponsabilities {
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

            Notification.findAll()
                .then((notifications) => {
                    if (notifications != null) {
                        let counter = 0;
                        while (counter < notifications.length) {
                            this.data.notifications
                                .push({
                                    sendername: notifications[counter].sendername,
                                    message: notifications[counter].message,
                                });
                            counter++;
                        }
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
                            this.response.json(this.data.notifications);
                            observer.next(true);
                            observer.complete();
                        }
                    } else {
                        console.log("notifications are null");
                        observer.error(false);
                    }
                })
                .catch(err => {
                    console.log("we connot fecth all notifiactions");
                    observer.error(false);
                })


        });


        /*
        
         */


    }




}