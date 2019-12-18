import { userInfo } from 'os';
import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { RasberySql } from './../../../../Mysql/RasberySQL';

import { User } from '../../../../Mysql/User';

import { Observable, Observer } from 'rxjs';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class UpdateData implements RasberyResponsabilities {
    private Nextchaine!: RasberyResponsabilities;
    private data: any;
    private dataChange: any;


    constructor(data: any, dataChange: any) {
        this.data = data;
        this.dataChange = dataChange;
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

            this.Update();

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

    private Update(): void {
        console.log("#####update data########");
        console.log(this.data);
        let counter1: number = 0;
        for (let instance in this.data) {
            let counter2: number = 0
            for (let newInstance in this.dataChange) {
                if (Object.keys(this.data)[counter1] == Object.keys(this.dataChange)[counter2]) {
                    this.data[Object.keys(this.data)[counter1]] = this.dataChange[Object.keys(this.data)[counter1]]
                    break;
                }
                counter2++;
            }
            counter1++;
        }
        console.log(this.data);
        console.log("#####End update data########");

    }




}