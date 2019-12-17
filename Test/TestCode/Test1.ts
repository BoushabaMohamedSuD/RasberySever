import { Test2 } from './Test2';
export class Test1 {
    private data: any;
    constructor(data: any, i: number) {
        console.log("test1=======")
        /* this.data = data;
         this.data.username = "Mohamed";*/
        this.data = data;
        data.username = 'Mohamed';
        new Test2(this.data);
        // console.log(this.data);
        i++;
        console.log("===========end");
    }
}