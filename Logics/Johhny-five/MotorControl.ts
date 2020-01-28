import { DeviceInfos } from '../../proprieties/DevicesInfos';
var five = require("johnny-five"),
    board: any, lcd: any;

export class MotorControl {
    //private message: string;
    constructor() {
        // this.message = "";
    }
    /*  public getMessage(): string {
          return this.message;
      }
      public setMessage(message: string): void {
          this.message = message;
      }*/

    public MotorOpen() {
        console.log("Motor Open");
        DeviceInfos.getInstance().getServo().to(135, 5000);

    }
    public MotorClose() {
        console.log("Motor Close");
        DeviceInfos.getInstance().getServo().to(0, 5000);

    }

}