export interface RasberyStrategy {

    processOperation: () => Promise<boolean>;

}