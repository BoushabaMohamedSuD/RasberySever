import { DeviceInfos } from '../../proprieties/DevicesInfos';
var five = require("johnny-five"),
    board: any, lcd: any;

export class LedControl {
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

    public ledOnRed() {
        console.log("led red on");
        DeviceInfos.getInstance().getLed().off();
        DeviceInfos.getInstance().getLed().on();
        DeviceInfos.getInstance().getLed().color("#FF0000");
    }
    public ledOnGreen() {
        console.log("led green on");
        DeviceInfos.getInstance().getLed().off();
        DeviceInfos.getInstance().getLed().on();
        DeviceInfos.getInstance().getLed().color("#00FF00");
    }

}