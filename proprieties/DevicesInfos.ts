
export class DeviceInfos {
    private static Instance: DeviceInfos;
    private lcd: any;
    private led: any;
    private servo: any;


    private constructor() {
        this.lcd = null;
        this.led = null;
        this.servo = null;
    }

    public setLcd(lcd: any) {
        this.lcd = lcd;

    }

    public getLcd(): any {
        return this.lcd;
    }


    public setLed(led: any) {
        this.led = led;

    }

    public getLed(): any {
        return this.led;
    }


    public setServo(servo: any) {
        this.servo = servo;

    }

    public getServo(): any {
        return this.servo;
    }


    public static getInstance(): DeviceInfos {
        if (DeviceInfos.Instance == null) {
            DeviceInfos.Instance = new DeviceInfos();
        }
        return DeviceInfos.Instance;
    }
}