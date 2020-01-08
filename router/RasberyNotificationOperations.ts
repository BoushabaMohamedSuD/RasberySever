import { RasberyGetNotificationsAdmin } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyGetNotificationsAdmin';
import { RasberyTurnOffMotorMember } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyTurnOffMotorMember';
import { RasberyTurnOffMotorAdmin } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyTurnOffMotorAdmin';
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



router.get('/GetAllNotificationAdmin', (req, res) => {
    new RasberyContext(new RasberyGetNotificationsAdmin(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("turn get all notification true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("turn on motor admin  false");
            }
        });

});








exports.router = router;
