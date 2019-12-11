import { LogOutStrategy } from './../Logics/Authenticate/Strategy/Strategys/LogOutStrategy';
import { UserInfoHandlerStrategy } from './../Logics/Authenticate/Strategy/Strategys/UserInfoHandlerStrategy';
import { EmailVerificationStartegy } from './../Logics/Authenticate/Strategy/Strategys/EmailVerificationStrategy';
import { SignUpStrategy } from './../Logics/Authenticate/Strategy/Strategys/SignUpStrategy';
import { AuthenticateContent } from '../Logics/Authenticate/Strategy/Contents/AuthenticateContent';

import express from 'express';
import { SignInStrategy } from '../Logics/Authenticate/Strategy/Strategys/SignInStrategy';
const router = express.Router();

const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');




router.post('/SignIn', (req, res) => {
    console.log('SgnIn');
    new AuthenticateContent(new SignInStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("SignIn true");
            }

        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.send("SignIn false");
            }


        })

});
router.post('/SignUp', (req, res) => {
    console.log('Signup');
    new AuthenticateContent(new SignUpStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("Signup true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.send("Signup false");
            }
        })
});
router.post('/SendEmail', (req, res) => {
    console.log('email verification');
    new AuthenticateContent(new EmailVerificationStartegy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("Send email true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.send("sendemail false");
            }
        })
})
router.post('/UserInfo', (req, res) => {
    console.log('UserInfo')
    new AuthenticateContent(new UserInfoHandlerStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("userinfo true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.send("user info false");
            }
        });
})
router.post('/LogOut', (req, res) => {
    console.log('/Log out');
    new AuthenticateContent(new LogOutStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("logout true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.send("logout false");
            }
        });
})

import jwt from 'jsonwebtoken';
router.get('/ValidationEmail/:token', (req, res) => {

    console.log('email validation');
    new AuthenticateContent(new EmailVerificationStartegy(req, res))
        .process()
        .then((resp) => {
            console.log('email has been validated');
            res.send(true);
        })
        .catch((err) => {
            console.log(err);
            res.send(false);

        });

    /* console.log('email validation');
     console.log(req.params['token']);
     res.send(req.params['token']);
     jwt.verify(req.params['token'], 'NodeJsIotSUD', (err, authdata: any) => {
         if (err) {
             console.log("----error----");
             // res.send(false);
             console.log(err);
 
         } else {
             //res.send(authdata);
             console.log(authdata);
             if (authdata != null) {
                 console.log(authdata.username);
             }
 
         }
     });*/
})


exports.router = router;
