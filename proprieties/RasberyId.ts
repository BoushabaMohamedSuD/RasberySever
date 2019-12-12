
export class RasberyId {
    private static Instance: RasberyId;
    private id: string;
    private key: string;

    private constructor() {
        this.id = 'RasberyId';
        this.key = 'BOSUHABAmohamed';
    }

    public setKey(newKey: string) {
        this.key = newKey;

    }

    public getKey(): string {
        return this.key;
    }
    public getId(): string {
        return this.id;
    }

    public static getInstance(): RasberyId {
        if (RasberyId.Instance == null) {
            RasberyId.Instance = new RasberyId();
        }
        return RasberyId.Instance;
    }
}