import { RasberySql } from './../Mysql/RasberySQL';
import { UserInfoHandlerStrategy } from './../Logics/Authenticate/Strategy/Strategys/UserInfoHandlerStrategy';
import { AuthenticateContent } from './../Logics/Authenticate/Strategy/Contents/AuthenticateContent';

import express from 'express';
import { AuthorizationUserInfo } from '../Logics/Authenticate/Strategy/Strategys/AuthorizationUserInfo';
const router = express.Router();


//for testing 

router.get('/test', (req, res) => {
    /* console.log("test");
     let usernames: Array<string> = new Array<string>();
     RasberySql.findOne({ where: { id: 1 } })
         .then((rasbery) => {
             if (rasbery != null) {
 
                 rasbery.$get('users')
                     .then((users: any) => {
                         if (users != null) {
                             console.log(users.length);
                             console.log(users[0].username);
                             let i = 0;
                             while (i < users.length) {
                                 usernames.push(users[i].username);
                                 i++;
                             }
 
                             res.json(usernames);
                         }
                     })
                     .catch((err) => {
                         console.log("we cannot fecth all users from rasbery");
                         res.json(false);
                     })
 
             } else {
                 console.log("rasbery after fitching is null");
                 res.json(false);
             }
         })
         .catch((err) => {
             res.json(false);
             console.log('can not find rasbery');
         });*/


});


exports.router = router;
