import { SignIn } from '../../ChaineOfResponsability/contents/SignIn';
import { AuthenticateChaine } from '../../ChaineOfResponsability/containers/AuthenticateChaine';
import { AuthenticateStrategy } from '../Containers/AuthenticateStrategy';
import { EmailVerification } from '../../ChaineOfResponsability/contents/EmailVerification';
import { SignUp } from '../../ChaineOfResponsability/contents/SignUp';
import { GenerateToken } from '../../ChaineOfResponsability/contents/GenerateToken';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
export class SignInStrategy implements AuthenticateStrategy {
    private chaine1!: AuthenticateChaine;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;

    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>) {
        console.log(request.body);
        this.chaine1 = new SignIn(request, response);
        const chaine2: AuthenticateChaine = new GenerateToken();
        this.chaine1.setNextChaine(chaine2);
        this.request = request;
        this.response = response;


    }
    public processOperation(): Promise<boolean> {
        console.log("Sign in startegy");
        return new Promise((resolve, reject) => {
            if (Object.keys(this.request.body).length !== 0) {
                this.chaine1.processOperation()
                    .then((resp) => {
                        if (resp) {
                            console.log('succes in sign in strategy');
                            resolve(true);
                        } else {
                            console.log('error in sign in strategy');
                            reject(false);
                        }

                    })
                    .catch((err) => {
                        console.log('error in sign in strategy');
                        reject(false);
                    })

            } else {
                console.log('request is null');
                reject(false);
            }

        });

    }

}