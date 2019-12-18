import { Test1 } from './Test1';
export class Testa {
    private data: {
        username: string,
        lastname: string
    };
    private i: number = 0;
    public constructor() {
        this.data = {
            username: "",
            lastname: "test"
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
    }
}