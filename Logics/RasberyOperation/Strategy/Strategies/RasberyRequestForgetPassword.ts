import { SendEmailForgetPassword } from './../../Responsibilities/res/SendEmailForgetPassword';
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

export class RasberyRequestForgetPassword implements RasberyStrategy {
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
        this.chaine1 = new SendEmailForgetPassword(this.request, this.response, this.data);


    }

    public processOperation(): Promise<boolean> {
        console.log("Rasbery request forget password startegy");
        return new Promise((resolve, reject) => {

            this.chaine1.processOperation()
                .then((resp) => {
                    if (resp) {
                        console.log('succes in request forget password   strategy');
                        resolve(true);
                    } else {
                        console.log('error in request forget password  strategy');
                        reject(false);
                    }

                })
                .catch((err) => {
                    console.log('error in request forget password  strategy');
                    reject(false);
                })


        });

    }
}