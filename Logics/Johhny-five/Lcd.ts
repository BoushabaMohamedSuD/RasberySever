import { DeviceInfos } from './../../proprieties/DevicesInfos';
var five = require("johnny-five"),
    board: any, lcd: any;

export class Lcd {
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

    public WriteMessage(message: string): void {
        DeviceInfos.getInstance().getLcd().clear();
        DeviceInfos.getInstance().getLcd().cursor(1, 0);;

        console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§" + message);
        DeviceInfos.getInstance().getLcd().print(message);
        console.log("success write in");

    }

}