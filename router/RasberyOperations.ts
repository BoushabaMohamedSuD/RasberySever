import { RasberyTurnOnMotorMember } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyTurnOnMotorMember';
import { RasberyTurnOnMotorAdmin } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyTurnOnMotorAdmin';
import { RasberyGetAllMember } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyGetAllMember';
import { RasberyDeleteUser } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyDeleteUser';
import { RasberyInvitationValidation } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyInvitationValidation';
import { RasberyInvitation } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyInvitation';
import { RasberySignUp } from './../Logics/RasberyOperation/Strategy/Strategies/RasberySignUp';
import { RasberyContext } from './../Logics/RasberyOperation/Strategy/contents/RasberyContext';


import express from 'express';
import { AuthorizationUserInfo } from '../Logics/Authenticate/Strategy/Strategys/AuthorizationUserInfo';
const router = express.Router();



router.get('/TurnOnAdmin', (req, res) => {
    new RasberyContext(new RasberyTurnOnMotorAdmin(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("turn on motor admin true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("turn on motor admin  false");
            }
        });

});



router.get('/TurnOnMember', (req, res) => {
    new RasberyContext(new RasberyTurnOnMotorMember(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("turn on motor member true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("turn on motor member  false");
            }
        });

});




exports.router = router;
