import { FactorySocket } from './../../Responsibilities/res/FactorySocket';
import { FactoryMotorStatus } from './../../Responsibilities/res/FactoryMotorStatus';
import { AddNotification } from './../../Responsibilities/res/AddNotification';
import { TurnOnMotor } from './../../Responsibilities/res/TurnOnMotor';
import { InvitationValidation } from '../../Responsibilities/res/InvitationValidation';
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

export class RasberyTurnOnMotorMember implements RasberyStrategy {
    private chaine1!: RasberyResponsabilities;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;
    private data: {
        username: string,
        email: string,
        message: string,
    };

    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        this.data = {
            username: "",
            email: "",
            message: "turn on the motor"
        };
        console.log(request.body);
        this.request = request;
        this.response = response;
        this.chaine1 = new TokenVerification(request, response, this.data);
        const chaine2 = new UserisReady(request, response, this.data);
        const chaine3 = FactoryAuthority.getAuthority(request, response, this.data, 'member', 'check');
        const chaine4 = FactoryMotorStatus.OpStatus(request, response, this.data, 'off', 'check');
        const chaine5 = FactorySocket.OpRuntime(request, response, this.data, 'wait');
        const chaine6 = new TurnOnMotor(request, response, this.data);
        const chaine7 = FactoryMotorStatus.OpStatus(request, response, this.data, 'on', 'set');
        const chaine8 = new AddNotification(request, response, this.data);
        const chaine9 = FactorySocket.OpRuntime(request, response, this.data, 'turnon');

        this.chaine1.setNextChaine(chaine2);
        chaine2.setNextChaine(chaine3);
        chaine3.setNextChaine(chaine4);
        chaine4.setNextChaine(chaine5);
        chaine5.setNextChaine(chaine6);
        chaine6.setNextChaine(chaine7);
        chaine7.setNextChaine(chaine8);
        chaine8.setNextChaine(chaine9);

    }

    public processOperation(): Promise<boolean> {
        console.log("Rasbery invitation validation startegy");
        return new Promise((resolve, reject) => {

            this.chaine1.processOperation()
                .then((resp) => {
                    if (resp) {
                        console.log('succes in invitation validation strategy');
                        resolve(true);
                    } else {
                        console.log('error in invitation validation strategy');
                        reject(false);
                    }

                })
                .catch((err) => {
                    console.log('error in invitation validation strategy');
                    reject(false);
                })


        });

    }
}