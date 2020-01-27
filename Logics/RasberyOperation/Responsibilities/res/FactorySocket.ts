import { SocketForceUpdateStatus } from './../Factories/Socket/SocketForceUpdateStatus';
import { SocketWait } from './../Factories/Socket/SocketWait';
import { SocketTurnOff } from './../Factories/Socket/SocketTurnOff';
import { SocketTurnOn } from './../Factories/Socket/SocketTurnOn';
import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { TurnOff } from './../Factories/RasberyStatus/TurnOff';
import { TurnOn } from './../Factories/RasberyStatus/TurnOn';
import { AdminChange } from '../Factories/Authority/AuthorityChange/AdminChange';
import { GuestChange } from '../Factories/Authority/AuthorityChange/GuestChange';
import { AdminCheck } from '../Factories/Authority/AuthorityCheck/AdminCheck';
import { GuestCheck } from '../Factories/Authority/AuthorityCheck/GuestCheck';
import { Request, Response, ParamsDictionary } from 'express-serve-static-core';



export class FactorySocket {

    public static OpRuntime(request: Request<ParamsDictionary>, response: Response<any>
        , data: any, operation: string): RasberyResponsabilities {

        if (operation == 'turnon') {
            return new SocketTurnOn(request, response, data);
        } else if (operation == 'turnoff') {
            return new SocketTurnOff(request, response, data);
        } else if (operation == 'wait') {
            return new SocketWait(request, response, data);
        } else if (operation == 'forceupdate') {
            return new SocketForceUpdateStatus(request, response, data);
        }
        throw new Error('no Factory selected');

    }
}