import { ChangeState } from './../../ChaineOfResponsability/contents/ChangeState';
import { IsActive } from './../../ChaineOfResponsability/contents/IsActive';
import { SignIn } from '../../ChaineOfResponsability/contents/SignIn';
import { AuthenticateChaine } from '../../ChaineOfResponsability/containers/AuthenticateChaine';
import { AuthenticateStrategy } from '../Containers/AuthenticateStrategy';
import { EmailVerification } from '../../ChaineOfResponsability/contents/EmailVerification';
import { SignUp } from '../../ChaineOfResponsability/contents/SignUp';
import { GenerateToken } from '../../ChaineOfResponsability/contents/GenerateToken';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class EmailVerificationStartegy implements AuthenticateStrategy {
    private chaine1!: AuthenticateChaine;
    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        this.chaine1 = new IsActive();
        const chaine2: AuthenticateChaine = new EmailVerification();
        const chain3: AuthenticateChaine = new ChangeState(request, response);
        this.chaine1.setNextChaine(chaine2);
        chaine2.setNextChaine(chain3);


    }
    public processOperation(): Promise<boolean> {
        console.log("Email Verification startegy");
        return new Promise((resolve, reject) => {
            this.chaine1.processOperation()
                .then((resp) => {
                    if (resp) {
                        console.log('succes in Email Verification strategy');
                        resolve(true);
                    } else {
                        console.log('error in Email Verification strategy');
                        reject(false);
                    }

                })
                .catch((err) => {
                    console.log('error in Email Verification strategy');
                    reject(false);
                })
        });

    }

}