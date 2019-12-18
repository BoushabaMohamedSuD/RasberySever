import { UpdateData } from './../../Logics/RasberyOperation/Responsibilities/res/UpdateData';
import { Test1 } from './Test1';
export class Testa {
    private data: {
        username: string,
        lastname: string,
        info: string,
    };
    private i: number = 0;
    public constructor() {
        this.data = {
            username: "",
            lastname: "test",
            info: "bravobravo"
        };
        console.log("TEST");
        for (let t in this.data) {
            console.log(t);
        }
        console.log(Object.keys(this.data));
    }
    public process() {
        console.log("process");
        console.log(this.data);
        const t1: Test1 = new Test1(this.data, this.i);
        // console.log(this.i);
        console.log(this.data);
        console.log("update..........")
        new UpdateData(this.data, { info: "coolcool", username: "coolcool" })
            .processOperation()
            .then(res => console.log(this.data))
            .catch(err => console.log(err))
    }
}