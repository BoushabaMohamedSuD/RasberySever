import { RasberyStrategy } from './../containers/RasberyStrategy';
import { RasberyResponsabilities } from './../../Responsibilities/containers/RasberyResponsabilities';



export class RasberyContext {
    private ras!: RasberyStrategy;
    constructor(ras: RasberyStrategy) {
        this.ras = ras;

    }

    public process(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.ras.processOperation()
                .then((resp) => {
                    if (resp) {
                        resolve(true);
                    }
                    reject(false)
                })
                .catch((err) => {
                    reject(false);
                });



        });
    }
}
