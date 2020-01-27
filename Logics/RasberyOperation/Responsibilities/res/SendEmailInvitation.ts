import { EndPointInfo } from './../../../../proprieties/EndPointInfo';
import { RasberyResponsabilities } from '../containers/RasberyResponsabilities';
import { Request, ParamsDictionary, Response } from 'express-serve-static-core';
import { Observable, Observer } from 'rxjs';
import jwt from 'jsonwebtoken';
var nodemailer = require('nodemailer');


export class SendEmailInvitation implements RasberyResponsabilities {
    private Nextchaine!: RasberyResponsabilities;
    private request: Request<ParamsDictionary>;
    private response: Response<any>;
    private data: any;


    constructor(request: Request<ParamsDictionary, any, any>, response: Response<any>, data: any) {
        this.request = request;
        this.response = response;
        this.data = data;
    }


    public setNextChaine(chaine: RasberyResponsabilities): void {
        this.Nextchaine = chaine;
    }
    public processOperation(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.process().subscribe(
                (resp) => {
                    if (resp) {
                        console.log('SendEmail  achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in Send Email');
                    reject(false);

                },
                () => {
                    console.log('SendEmail complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                // secure: true, // use SSL
                secureConnection: false,
                requireTLS: true,
                auth: {
                    user: 'nodejs1998yz@gmail.com',
                    pass: 'NodeJs2020'
                },
                tls: {
                    rejectUnauthorized: false
                },
            });
            jwt.sign({
                username: this.data.username,
                email: this.data.email,
                type: "invitation"
            }, 'NodeJsIotSUD', { expiresIn: 60 * 60 * 24 }, (errToken, resToken) => {
                let htmlMessage: string = "<a href='" + EndPointInfo.getInstance().getEndPointEmail() + "ValidateInvitation/" + resToken + "'>link text</a>";
                transporter.sendMail({
                    from: 'Iot SUD ',
                    //in this case we permute the username with target name
                    //and in is ready we permute email by target email
                    to: this.data.email,
                    subject: 'invitation',
                    text: "invitation from " + this.request.body.username,
                    html: htmlMessage
                }, (error: any, resp: any) => {
                    //Email not sent
                    if (error) {
                        console.log(error);
                        observer.error(false);
                    }
                    //email send sucessfully
                    else {
                        console.log('email has been send sucessfully');
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
                    }
                });

            });





        });


    }




}