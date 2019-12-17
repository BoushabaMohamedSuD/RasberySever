import { Observable } from 'rxjs';


export interface RasberyResponsabilities {

    setNextChaine: (chaine: RasberyResponsabilities) => void;
    process: () => Observable<boolean>;
    processOperation: () => Promise<boolean>;

}