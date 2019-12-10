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
            res.send("SignIn true");
        })
        .catch((err) => {
            console.log(err);
            res.send("SignIn false");
        })

});
router.post('/SignUp', (req, res) => {
    console.log('Signup');
    new AuthenticateContent(new SignUpStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            res.send("Signup true");
        })
        .catch((err) => {
            console.log(err);
            res.send("Signup false");
        })
});
router.post('/SendEmail', (req, res) => {
    console.log('email verification');
    new AuthenticateContent(new EmailVerificationStartegy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            res.send("SendEmail true");
        })
        .catch((err) => {
            console.log(err);
            res.send("SendEmail false");
        })
})
router.post('/UserInfo', (req, res) => {
    console.log('UserInfo')
    new AuthenticateContent(new UserInfoHandlerStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            res.send("Userinfo true");
        })
        .catch((err) => {
            console.log(err);
            res.send("UserInfo false");
        });
})
router.post('/LogOut', (req, res) => {
    console.log('/Log out');
    new AuthenticateContent(new LogOutStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            res.send("LogOut true");
        })
        .catch((err) => {
            console.log(err);
            res.send("LogOut false");
        });
})

router.get('/ValidationEmail/:token', async (req, res) => {
    console.log('email validation');
    console.log(req.params['token']);
    res.send(req.params['token']);
})


exports.router = router;
