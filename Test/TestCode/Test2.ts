export class Test2 {
    private data: any
    public constructor(data: any) {
        console.log("test2=======")
        this.data = data;
        this.data.username = "Bosuhaba";
        console.log(this.data);
        console.log("===========end");
    }
}