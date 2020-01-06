import { RasberyDeleteUser } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyDeleteUser';
import { RasberyInvitationValidation } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyInvitationValidation';
import { RasberyInvitation } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyInvitation';
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


router.post('/SendInvitation', (req, res) => {
    console.log('send invitation to' + req.body.targetname);
    new RasberyContext(new RasberyInvitation(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("rasbery send invitation true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("rasbery send invitation false");
            }
        });

});


router.get('/InvitationValidation/:token', (req, res) => {
    console.log('send invitation to' + req.body.targetname);
    new RasberyContext(new RasberyInvitationValidation(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("rasbery invitation validation true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("rasbery invitation validation false");
            }
        });

});


router.delete('/DeleteUserFromRasbery', (req, res) => {
    console.log('detlet user from rasbery ' + req.body.targetname);
    new RasberyContext(new RasberyDeleteUser(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("delete user true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("delete user  false");
            }
        });

});


exports.router = router;
