import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { RasberyId } from './../../../../proprieties/RasberyId';
import { User } from '../../../../Mysql/User';
import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class RequestVerification implements RasberyResponsabilities {
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
                        console.log('Request Verification achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in Request Verification');
                    reject(false);

                },
                () => {
                    console.log('Request Verification complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            if (this.Verification(this.request, this.response)) {
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
                console.log("key and id is not valide for rasbery");
                observer.error(false);
            }


        });

    }

    private Verification(request: Request<ParamsDictionary, any, any>,
        response: Response<any>): boolean {
        if (this.request.body.rasberyId == RasberyId.getInstance().getId()) {
            if (this.request.body.rasberyKey == RasberyId.getInstance().getKey()) {
                return true;
            }
        }
        return false;

    }




}