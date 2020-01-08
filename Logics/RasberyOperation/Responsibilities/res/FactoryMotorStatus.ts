import { MotorStatusSetOff } from './../Factories/RasberyMotorStatus/Set/MotorStatusOffSet';
import { MotorStatusSetOn } from './../Factories/RasberyMotorStatus/Set/MotorStatusOnSet';
import { MotorStatusGet } from './../Factories/RasberyMotorStatus/Get/MotorStatusGet';
import { RasberyResponsabilities } from './../containers/RasberyResponsabilities';
import { TurnOff } from './../Factories/RasberyStatus/TurnOff';
import { TurnOn } from './../Factories/RasberyStatus/TurnOn';
import { AdminChange } from '../Factories/Authority/AuthorityChange/AdminChange';
import { GuestChange } from '../Factories/Authority/AuthorityChange/GuestChange';
import { AdminCheck } from '../Factories/Authority/AuthorityCheck/AdminCheck';
import { GuestCheck } from '../Factories/Authority/AuthorityCheck/GuestCheck';
import { Request, Response, ParamsDictionary } from 'express-serve-static-core';



export class FactoryMotorStatus {

    public static setStatus(request: Request<ParamsDictionary>, response: Response<any>
        , data: any, status: string, operation: string): RasberyResponsabilities {
        let MotorStatus;
        if (operation == 'get') {
            MotorStatus = new MotorStatusGet(request, response, data);
            return MotorStatus;
        } else if (operation == 'set') {
            if (status == 'on') {
                MotorStatus = new MotorStatusSetOn(request, response, data);
                return MotorStatus;
            } else if (status == 'off') {
                MotorStatus = new MotorStatusSetOff(request, response, data);
                return MotorStatus;
            }
        }
        throw new Error('no Factory selected');

    }
}