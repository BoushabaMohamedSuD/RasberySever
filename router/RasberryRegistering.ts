import { UserInfoHandlerStrategy } from './../Logics/Authenticate/Strategy/Strategys/UserInfoHandlerStrategy';
import { AuthenticateContent } from './../Logics/Authenticate/Strategy/Contents/AuthenticateContent';

import express from 'express';
import { AuthorizationUserInfo } from '../Logics/Authenticate/Strategy/Strategys/AuthorizationUserInfo';
const router = express.Router();


router.post('/SignUp', (req, res) => {
    console.log('submiting the data');
    // console.log(req.headers);
    new AuthenticateContent(new UserInfoHandlerStrategy(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("user handler true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("user handler false");
            }
        });

});


exports.router = router;
