import { RasberyResponsabilities } from './../../Responsibilities/containers/RasberyResponsabilities';
import { FactoryStatus } from './../../Responsibilities/res/FactoryStatus';
import { RequestVerification } from './../../Responsibilities/res/RequestVerification';
import { UserToRasbery } from './../../Responsibilities/res/UserToRasbery';
import { RasberyisBlocked } from './../../Responsibilities/res/RabseryisBlocked';
import { FactoryAuthority } from './../../Responsibilities/res/FactoryAuthority';
import { UserisReady } from './../../Responsibilities/res/UserisReady';
import { TokenVerification } from './../../Responsibilities/res/TokenVerification';
import { RasberyStrategy } from '../containers/RasberyStrategy';


import { Request, ParamsDictionary, Response } from 'express-serve-static-core';

export class RasberySignUp implements RasberyStrategy {
    private chaine1!: RasberyResponsabilities;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;
    private data: {
        username: string,
        email: string,
    };

    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        this.data = {
            username: "",
            email: "",
        };
        console.log(request.body);
        this.request = request;
        this.response = response;
        this.chaine1 = new TokenVerification(request, response, this.data);
        const chaine2 = new UserisReady(request, response, this.data);
        const chaine3 = FactoryAuthority.getAuthority(request, response, this.data, 'guest', 'check');
        const chaine4 = new RasberyisBlocked(request, response, this.data);
        const chaine5 = new RequestVerification(request, response, this.data);
        const chaine6 = new UserToRasbery(request, response, this.data);
        const chaine7 = FactoryStatus.setStatus(request, response, this.data, 'TurnOff');
        const chaine8 = FactoryAuthority.getAuthority(request, response, this.data, 'admin', 'change')
        this.chaine1.setNextChaine(chaine2);
        chaine2.setNextChaine(chaine3);
        chaine3.setNextChaine(chaine4);
        chaine4.setNextChaine(chaine5);
        chaine5.setNextChaine(chaine6);
        chaine6.setNextChaine(chaine7);
        chaine7.setNextChaine(chaine8);

    }

    public processOperation(): Promise<boolean> {
        console.log("Rasbery Sign up startegy");
        return new Promise((resolve, reject) => {
            if (Object.keys(this.request.body).length !== 0) {
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
            }

        });

    }
}