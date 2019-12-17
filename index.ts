import { Rasbery } from './Mysql/Rasbery';
import { RasberyId } from './proprieties/RasberyId';
export { };



import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './Mysql/MysqlConnectivity';


const RouterAuthenticate = require('./router/Authenticate').router;
const RouterUserInfo = require('./router/UserInfo').router;


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
app.use('/Rasbery', RouterUserInfo);







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
        Rasbery.create()
            .then(() => {
                const server = app.listen(4000);
                console.log("server has been created");
            })
            .catch((err) => {
                console.log('connot create rasbery table');
                console.log(err);
            })


    })
    .catch((err) => {
        console.log(err);
        console.log("failed to create databases  or tables");
    })






//const server = app.listen(3000);

