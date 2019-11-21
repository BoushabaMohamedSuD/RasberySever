export { };



import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './Mysql/MysqlConnectivity';

const app = express();
const five = require("johnny-five");
const board = new five.Board();



//initializing the configuration
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "Username,Authorization,authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Authorization,Username,Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser({ extended: false }));







// connect to board arduino
board.on("ready", function () {
    console.log("succes connect to arduino");
    //creating databases
    sequelize.sync(/*{ force: true }*/)
        .then(() => {
            //creating server
            const server = app.listen(3000);
            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
            //Socket Integration and johnny-five


            console.log("begin blink 500 ms");
            var led = new five.Led(13);
            led.blink(500);


            //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

        })
        .catch((err) => {
            console.log(err);
            console.log("failed to create databases  or tables");
        })

});







