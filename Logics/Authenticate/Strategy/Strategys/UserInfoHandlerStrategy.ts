import { ChangeState } from './../../ChaineOfResponsability/contents/ChangeState';
import { UserInfoRegestering } from './../../ChaineOfResponsability/contents/UserInfoRegestering';
import { UserInfo } from './../../../../Mysql/UserInfo';
import { SignIn } from '../../ChaineOfResponsability/contents/SignIn';
import { AuthenticateChaine } from '../../ChaineOfResponsability/containers/AuthenticateChaine';
import { AuthenticateStrategy } from '../Containers/AuthenticateStrategy';
import { EmailVerification } from '../../ChaineOfResponsability/contents/EmailVerification';
import { SignUp } from '../../ChaineOfResponsability/contents/SignUp';
import { GenerateToken } from '../../ChaineOfResponsability/contents/GenerateToken';
import { userInfo } from 'os';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class UserInfoHandlerStrategy implements AuthenticateStrategy {
    private chaine1!: AuthenticateChaine;
    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        this.chaine1 = new UserInfoRegestering();
        const chaine2: AuthenticateChaine = new GenerateToken();
        const chaine3: AuthenticateChaine = new ChangeState(request, response);
        this.chaine1.setNextChaine(chaine2);
        chaine2.setNextChaine(chaine3);


    }
    public processOperation(): Promise<boolean> {
        console.log("user info handler startegy");
        return new Promise((resolve, reject) => {
            this.chaine1.processOperation()
                .then((resp) => {
                    if (resp) {
                        console.log('succes in user Info handler strategy');
                        resolve(true);
                    } else {
                        console.log('error in user info handler strategy');
                        reject(false);
                    }

                })
                .catch((err) => {
                    console.log('error in user info handler strategy');
                    reject(false);
                })
        });

    }

}