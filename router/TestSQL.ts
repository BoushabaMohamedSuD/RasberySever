import { User } from './../Mysql/User';
import { RasberySql } from './../Mysql/RasberySQL';
import { UserInfoHandlerStrategy } from './../Logics/Authenticate/Strategy/Strategys/UserInfoHandlerStrategy';
import { AuthenticateContent } from './../Logics/Authenticate/Strategy/Contents/AuthenticateContent';

import express from 'express';
import { AuthorizationUserInfo } from '../Logics/Authenticate/Strategy/Strategys/AuthorizationUserInfo';
const router = express.Router();


//for testing 

router.get('/test', (req, res) => {
    /* console.log("test");
     User.findOne({ where: { username: "Ahmed" } })
         .then((user) => {
             if (user != null) {
                 user.$get('RasberyHolder')
                     .then((rasbery) => {
                         console.log(rasbery);
                         if (rasbery != null) {
                             user.$remove('RasberyHolder', rasbery)
                                 .then(() => {
                                     console.log("okkkkkkkkk");
 
                                 })
                                 .catch((err) => {
                                     console.log("we can't remove rasbery from user");
 
                                 });
                         } else {
                             console.log("rasebry fetched from user is null");
 
                         }
                     })
                     .catch((err) => {
                         console.log('can not get the rasbery from user');
                         console.log(err);
 
                     });
             } else {
 
                 console.log("user after fitching is null");
             }
         })
         .catch((err) => {
 
             console.log('can not find user');
         });*/


});


exports.router = router;
