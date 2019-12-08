import { Observable, Observer } from 'rxjs';
import { AuthenticateChaine } from '../containers/AuthenticateChaine';
export class GenerateToken implements AuthenticateChaine {
    private Nextchaine!: AuthenticateChaine;
    public setNextChaine(chaine: AuthenticateChaine): void {
        this.Nextchaine = chaine;
    }
    public processOperation(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.process().subscribe(
                (resp) => {
                    if (resp) {
                        console.log('Genrate Token  achieved an response');
                        resolve(true);
                    }
                },
                (err) => {
                    console.log('Error in Genrate Token');
                    reject(false);

                },
                () => {
                    console.log('Genrate Token complete');
                }
            )
        });


    }

    public process(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {

            //:::::: your code her :::::::::::://  


            if (this.Nextchaine != null) {
                console.log('going to next chaine');
                this.Nextchaine.processOperation()
                    .then((resp) => {
                        console.log(resp);
                        observer.next(true);
                        observer.complete();
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log('Error');
                        observer.error(false);
                    });
            } else {
                console.log('this is the end of the chaine');
                observer.next(true);
                observer.complete();
            }
        });


    }




}