
export class SocketInfo {
    private static Instance: SocketInfo;
    private socket: any;


    private constructor() {
        this.socket = null;
    }

    public setSocket(socket: any) {
        this.socket = socket;

    }

    public getSocket(): any {
        return this.socket;
    }


    public static getInstance(): SocketInfo {
        if (SocketInfo.Instance == null) {
            SocketInfo.Instance = new SocketInfo();
        }
        return SocketInfo.Instance;
    }
}