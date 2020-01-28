
export class DeviceInfos {
    private static Instance: DeviceInfos;
    private lcd: any;


    private constructor() {
        this.lcd = null;
    }

    public setLcd(lcd: any) {
        this.lcd = lcd;

    }

    public getLcd(): any {
        return this.lcd;
    }


    public static getInstance(): DeviceInfos {
        if (DeviceInfos.Instance == null) {
            DeviceInfos.Instance = new DeviceInfos();
        }
        return DeviceInfos.Instance;
    }
}