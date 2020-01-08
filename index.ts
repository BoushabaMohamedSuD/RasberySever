
import { RasberyId } from './proprieties/RasberyId';
export { };



import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './Mysql/MysqlConnectivity';
import { RasberySql } from './Mysql/RasberySQL';
import e from 'express';


const RouterAuthenticate = require('./router/Authenticate').router;
const RouterUserInfo = require('./router/UserInfo').router;
const RouterRabsery = require('./router/RasberryRegistering').router;
const RouterTest = require('./router/TestJohhnyFive').router;
const RouterTestSQl = require('./router/TestSQL').router;
const RouterRabseryOperation = require('./router/RasberyOperations').router;
const RouterRabseryNotifications = require('./router/RasberyNotificationOperations').router;


const app = express();
const five = require("johnny-five");


//const board = new five.Board();




//initializing the configuration
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "Username,Authorization,authorization,PictureData");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Authorization,Username,Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser({ extended: false }));
app.use('/images', express.static(__dirname + '/uploads/public/images'));
app.use(RouterAuthenticate);
app.use('/UserInfo', RouterUserInfo);
app.use('/Rasbery', RouterRabsery);
app.use('/RasberyOperation', RouterRabseryOperation);
app.use('/RasberyNotification', RouterRabseryNotifications);

app.use('/Test', RouterTest);
app.use('/TestSQl', RouterTestSQl);







// connect to board arduino
// board.on("ready", function () {
//     console.log("succes connect to arduino");
//     //creating databases
//     sequelize.sync(/*{ force: true }*/)
//         .then(() => {
//             //creating server
//             const server = app.listen(3000);
//             //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
//             //Socket Integration and johnny-five


//             console.log("begin blink 500 ms");
//             var led = new five.Led(13);
//             led.blink(500);


//             //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

//         })
//         .catch((err) => {
//             console.log(err);
//             console.log("failed to create databases  or tables");
//         })

// });


sequelize.sync(/*{ force: true }*/)
    .then(() => {
        //just one time
        /* RasberySql.create()
             .then(() => {
 
 
             })
             .catch((err) => {
                 console.log('connot create rasbery table');
                 console.log(err);
             })*/
        const server = app.listen(4000);
        console.log("server has been created");


    })
    .catch((err) => {
        console.log(err);
        console.log("failed to create databases  or tables");
    })






//const server = app.listen(3000);

