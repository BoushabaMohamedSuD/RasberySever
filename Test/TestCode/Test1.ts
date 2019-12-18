import { Test2 } from './Test2';
export class Test1 {
    private data: any;
    constructor(data: any, i: number) {
        console.log("test1=======")
        /* this.data = data;
         this.data.username = "Mohamed";*/
        this.data = data;
        // this.data = JSON.parse(this.data);
        console.log(this.data);

        console.log(this.data.lenght);
        console.log("---------");
        console.log(this.data['lastname']);
        this.data['lastname'] = 'dhjdss';
        console.log(Object.keys(this.data));
        //console.log(Object.va)
        /*  let newdata={username:"mohamed"};
          this.data = {
              data,
          };*/
        console.log(Object.values(this.data));

        this.data.username = 'Mohamed';
        this.data[Object.keys(this.data)[0]] = "hello";
        //new Test2(this.data);
        // console.log(this.data);
        i++;
        console.log("===========end");
    }
}