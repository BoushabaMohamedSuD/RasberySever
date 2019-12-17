import { RasberySignUp } from './../Logics/RasberyOperation/Strategy/Strategies/RasberySignUp';
import { RasberyContext } from './../Logics/RasberyOperation/Strategy/contents/RasberyContext';


import express from 'express';
import { AuthorizationUserInfo } from '../Logics/Authenticate/Strategy/Strategys/AuthorizationUserInfo';
const router = express.Router();


router.post('/SignUp', (req, res) => {
    console.log('submiting the data for rasbery');
    new RasberyContext(new RasberySignUp(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("rasbery registering true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("rasbery registering false");
            }
        });

});


exports.router = router;
