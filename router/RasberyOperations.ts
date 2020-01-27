import { RasberyUserForceGetAuthority } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyUserForceGetAuthority';
import { RasberyUpdatePassword } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyUpdatePassword';
import { RasberyMotorGetStatusMember } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyMotorGetStatusMember';
import { RasberyMotorGetStatusAdmin } from './../Logics/RasberyOperation/Strategy/Strategies/RasberyMotorGetStatusAdmin';
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
import { RasberyRequestForgetPassword } from '../Logics/RasberyOperation/Strategy/Strategies/RasberyRequestForgetPassword';
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


router.get('/TurnOffAdmin', (req, res) => {
    new RasberyContext(new RasberyTurnOffMotorAdmin(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("turn off motor admin true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("turn off motor admin  false");
            }
        });

});


router.get('/TurnOffMember', (req, res) => {
    new RasberyContext(new RasberyTurnOffMotorMember(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send("turn off motor memeber true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("turn off motor member  false");
            }
        });

});



router.get('/MotorStatusAdmin', (req, res) => {
    new RasberyContext(new RasberyMotorGetStatusAdmin(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send(" motor  get statusm admin true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("motor  get statusm admin false");
            }
        });

});



router.get('/MotorStatusMember', (req, res) => {
    new RasberyContext(new RasberyMotorGetStatusMember(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send(" motor  get statusm member true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("motor  get statusm member false");
            }
        });

});





router.post('/RequestForgetPassword', (req, res) => {
    new RasberyContext(new RasberyRequestForgetPassword(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send(" RequestForgetPasswor true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("RequestForgetPasswor false");
            }
        });

});


router.post('/RequestUpdateForgetPassword/:token', (req, res) => {
    new RasberyContext(new RasberyUpdatePassword(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send(" RequestUpdateForgetPasswor true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("RequestUpdateForgetPasswor false");
            }
        });

});


router.get('/RasberyForceUpdateAuthority/', (req, res) => {
    new RasberyContext(new RasberyUserForceGetAuthority(req, res))
        .process()
        .then((resp) => {
            console.log(resp);
            if (!res.headersSent) {
                res.send(" RasberyUserForceGetAuthority true");
            }
        })
        .catch((err) => {
            console.log(err);
            if (!res.headersSent) {
                res.status(400).send("RasberyUserForceGetAuthority false");
            }
        });

});





exports.router = router;
