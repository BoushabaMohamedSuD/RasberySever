import { UserInfoHandlerStrategy } from './../Logics/Authenticate/Strategy/Strategys/UserInfoHandlerStrategy';
import { AuthenticateContent } from './../Logics/Authenticate/Strategy/Contents/AuthenticateContent';

import express from 'express';
import { AuthorizationUserInfo } from '../Logics/Authenticate/Strategy/Strategys/AuthorizationUserInfo';
const router = express.Router();


//for testing 
var five = require("johnny-five"),
    board, lcd: any;

router.get('/LedTurnOn', (req, res) => {


    board = new five.Board();

    board.on("ready", function () {
        console.log("ready");

        lcd = new five.LCD({
            // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
            // Arduino pin # 7    8   9   10  11  12
            pins: [7, 8, 9, 10, 11, 12],
            backlight: 6,
            rows: 2,
            cols: 20


            // Options:
            // bitMode: 4 or 8, defaults to 4
            // lines: number of lines, defaults to 2
            // dots: matrix dimensions, defaults to "5x8"
        });
        // Tell the LCD you will use these characters:
        console.log("okkkkkkkk");
        lcd.useChar("check");
        lcd.useChar("heart");
        lcd.useChar("duck");

        // Line 1: Hi rmurphey & hgstrp!
        lcd.clear();
        lcd.cursor(1, 0);

        // Line 2: I <3 johnny-five
        // lcd.print("I").write(7).print(" johnny-five");
        // can now be written as:
        console.log("kteb 3afak");
        lcd.print("hello");
        console.log("bybybyb");
        res.send("ok");

    });



});


exports.router = router;
