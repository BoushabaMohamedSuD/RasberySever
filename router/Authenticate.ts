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



//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//sgMail.setApiKey('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');
/*const msg = {
    to: 'med1998yz@gmail.com',
    from: 'med1998yz@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};*/



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
router.post('/ValidationEmail', async (req, res) => {
    console.log('email validation')

    var transporter = nodemailer.createTransport({

        port: 465,
        greetingTimeout: 90000,
        auth: {
            user: 'nodejs1998yz@gmail.com',
            pass: 'NodeJS1998@MED'
        },
        secureConnection: 'false',
        secure: false,
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false

        },


    });

    var mailOptions = {
        from: 'nodejs1998yz@gmail.com',
        to: 'med1998yz@gmail.com',
        subject: 'Test',
        html: "<b>Hello world?</b>"
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('ok');
        }
    });


    /*sgMail.send(msg)
        .then(() => res.send('ok'))
        .catch((err: any) => {
            console.log(err);
            res.send('not ok');
        });*/


    /* const transporter = nodemailer.createTransport(
         sendgridTransport({
             auth: {
                 api_key:
                     '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'
             }
         })
     );
     transporter.sendMail({
         to: 'med1998yz@gmail.com',
         from: 'shop@node-complete.com',
         subject: 'Signup succeeded!',
         html: '<h1>You successfully signed up!</h1>'
     })
         .then(() => res.send('ok'))
         .catch(() => res.send('not ok'));*/

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



router.post('/test', async (req, res) => {
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var transporter = nodemailer.createTransport({

        service: 'Gmail',
        pool: "smtps://username:password@smtp.example.com/?pool=true",

        auth: {
            user: 'nodejs1998yz@gmail.com',
            pass: 'NodeJS1998@MED'
        },

    });

    transporter.sendMail({
        from: 'nodejs1998yz@gmail.com',
        to: "med1998yz@gmail.com",
        subject: 'Test sujet',
        text: "test text",
        html: "<b>Test text</b>"
    }, function (error: any, response: any) {
        //Email not sent
        if (error) {
            console.log(error);
            res.send(error);
        }
        //email send sucessfully
        else {
            res.send('ok');
            console.log(response);
        }
    });






})


router.post('/test1', async (req, res) => {
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'nodejs1998yz@gmail.com',
            pass: 'NodeJS1998@MED'
        },

    });

    transporter.sendMail({
        from: 'Contact <nodejs1998yz@gmail.com>',
        to: "med1998yz@gmail.com",
        subject: 'Test sujet',
        text: "test text",
        html: "<b>Test text</b>"
    }, function (error: any, response: any) {
        //Email not sent
        if (error) {
            console.log(error);
            res.send(error);
        }
        //email send sucessfully
        else {
            res.send('ok');
            console.log(response);
        }
    });






})



exports.router = router;
