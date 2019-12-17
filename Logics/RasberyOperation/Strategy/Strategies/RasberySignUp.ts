import { Rasbery } from './../containers/Rasbery';


import { Request, ParamsDictionary, Response } from 'express-serve-static-core';

export class RasberySignUp implements Rasbery {
    private chaine1!: Rasbery;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;
    private data: any;

    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {

        console.log(request.body);
        this.request = request;
        this.response = response;


    }

    public processOperation(): Promise<boolean> {
        console.log("Rasbery Sign up startegy");
        return new Promise((resolve, reject) => {
            /* if (Object.keys(this.request.body).length !== 0) {
                 this.chaine1.processOperation()
                     .then((resp) => {
                         if (resp) {
                             console.log('succes in sign up strategy');
                             resolve(true);
                         } else {
                             console.log('error in sign up strategy');
                             reject(false);
                         }
 
                     })
                     .catch((err) => {
                         console.log('error in sign up strategy');
                         reject(false);
                     })
             } else {
                 console.log('request is null');
                 reject(false);
             }*/

        });

    }
}