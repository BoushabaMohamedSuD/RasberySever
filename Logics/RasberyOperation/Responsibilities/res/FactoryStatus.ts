import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { TurnOff } from './../Factories/RasberyStatus/TurnOff';
import { TurnOn } from './../Factories/RasberyStatus/TurnOn';
import { AdminChange } from '../Factories/Authority/AuthorityChange/AdminChange';
import { GuestChange } from '../Factories/Authority/AuthorityChange/GuestChange';
import { AdminCheck } from '../Factories/Authority/AuthorityCheck/AdminCheck';
import { GuestCheck } from '../Factories/Authority/AuthorityCheck/GuestCheck';
import { Request, Response, ParamsDictionary } from 'express-serve-static-core';



export class FactoryStatus {

    public static setStatus(request: Request<ParamsDictionary>, response: Response<any>
        , data: any, operation: string): RasberyResponsabilities {

        if (operation == 'TurnOn') {
            return new TurnOn(request, response, data);
        } else if (operation == 'TurnOff') {
            return new TurnOff(request, response, data);
        }
        throw new Error('no Factory selected');

    }
}