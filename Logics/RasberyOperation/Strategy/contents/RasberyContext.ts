import { Rasbery } from './../../../../Mysql/Rasbery';

export class RasberyContext {
    private ras!: Rasbery;
    constructor(ras: Rasbery) {
        this.ras = ras;

    }

    public process(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            /*this.ras.processOperation()
                .then((resp) => {
                    if (resp) {
                        resolve(true);
                    }
                    reject(false)
                })
                .catch((err) => {
                    reject(false);
                });*/



        });
    }
}
