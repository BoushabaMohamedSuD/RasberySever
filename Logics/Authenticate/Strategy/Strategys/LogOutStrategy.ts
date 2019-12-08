import { LogOut } from './../../ChaineOfResponsability/contents/LogOut';
import { IsReady } from './../../ChaineOfResponsability/contents/IsReady';
import { IsActive } from './../../ChaineOfResponsability/contents/IsActive';
import { SignIn } from '../../ChaineOfResponsability/contents/SignIn';
import { AuthenticateChaine } from '../../ChaineOfResponsability/containers/AuthenticateChaine';
import { AuthenticateStrategy } from '../Containers/AuthenticateStrategy';
import { EmailVerification } from '../../ChaineOfResponsability/contents/EmailVerification';
import { SignUp } from '../../ChaineOfResponsability/contents/SignUp';
import { GenerateToken } from '../../ChaineOfResponsability/contents/GenerateToken';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class LogOutStrategy implements AuthenticateStrategy {
    private chaine1!: AuthenticateChaine;
    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        this.chaine1 = new IsActive();
        const chaine2: AuthenticateChaine = new IsReady();
        const chaine3: AuthenticateChaine = new LogOut();
        chaine2.setNextChaine(chaine3);
        this.chaine1.setNextChaine(chaine2);


    }
    public processOperation(): Promise<boolean> {
        console.log("log out  handler startegy");
        return new Promise((resolve, reject) => {
            this.chaine1.processOperation()
                .then((resp) => {
                    if (resp) {
                        console.log('succes in user Log out strategy');
                        resolve(true);
                    } else {
                        console.log('error in log out strategy');
                        reject(false);
                    }

                })
                .catch((err) => {
                    console.log('error in user log out  strategy');
                    reject(false);
                })
        });

    }

}