import { FactoryMotorStatus } from './../../Responsibilities/res/FactoryMotorStatus';
import { SendEmailInvitation } from '../../Responsibilities/res/SendEmailInvitation';
import { UpdateData } from '../../Responsibilities/res/UpdateData';
import { RasberyResponsabilities } from '../../Responsibilities/containers/RasberyResponsabilities';
import { FactoryStatus } from '../../Responsibilities/res/FactoryStatus';
import { RequestVerification } from '../../Responsibilities/res/RequestVerification';
import { UserToRasbery } from '../../Responsibilities/res/UserToRasbery';
import { RasberyisBlocked } from '../../Responsibilities/res/RabseryisBlocked';
import { FactoryAuthority } from '../../Responsibilities/res/FactoryAuthority';
import { UserisReady } from '../../Responsibilities/res/UserisReady';
import { TokenVerification } from '../../Responsibilities/res/TokenVerification';
import { RasberyStrategy } from '../containers/RasberyStrategy';


import { Request, ParamsDictionary, Response } from 'express-serve-static-core';

export class RasberyMotorGetStatusAdmin implements RasberyStrategy {
    private chaine1!: RasberyResponsabilities;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;
    private data: {
        username: string,
        email: string,
        motorstatus: boolean,
    };

    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        this.data = {
            username: "",
            email: "",
            motorstatus: false,
        };
        console.log(request.body);
        this.request = request;
        this.response = response;
        this.chaine1 = new TokenVerification(request, response, this.data);
        const chaine2 = new UserisReady(request, response, this.data);
        const chaine3 = FactoryAuthority.getAuthority(request, response, this.data, 'admin', 'check');
        const chaine4 = FactoryMotorStatus.OpStatus(request, response, this.data, '', 'get');
        this.chaine1.setNextChaine(chaine2);
        chaine2.setNextChaine(chaine3);
        chaine3.setNextChaine(chaine4);




    }

    public processOperation(): Promise<boolean> {
        console.log("Rasbery invitation startegy");
        return new Promise((resolve, reject) => {

            this.chaine1.processOperation()
                .then((resp) => {
                    if (resp) {
                        console.log('succes in invitation  strategy');
                        resolve(true);
                    } else {
                        console.log('error in invitation strategy');
                        reject(false);
                    }

                })
                .catch((err) => {
                    console.log('error in inviattion strategy');
                    reject(false);
                })


        });

    }
}