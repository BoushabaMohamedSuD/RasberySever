import { Test1 } from './Test1';
export class Testa {
    private data: {
        username: string
    };
    private i: number = 0;
    public constructor() {
        this.data = {
            username: ""
        };
        console.log("TEST");
    }
    public process() {
        console.log("process");
        console.log(this.data);
        const t1: Test1 = new Test1(this.data, this.i);
        console.log(this.i);
        console.log(this.data);
    }
}