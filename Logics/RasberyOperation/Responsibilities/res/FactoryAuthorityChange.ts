import { AdminChange } from './../Factories/Authority/AuthorityChange/AdminChange';
import { GuestChange } from './../Factories/Authority/AuthorityChange/GuestChange';
import { AdminCheck } from '../Factories/Authority/AuthorityCheck/AdminCheck';
import { GuestCheck } from '../Factories/Authority/AuthorityCheck/GuestCheck';
import { Request, Response, ParamsDictionary } from 'express-serve-static-core';
import { Rasbery } from '../../Strategy/containers/Rasbery';
import e = require('express');

export class FactoryAuthority {

    public static getAuthority(request: Request<ParamsDictionary>, response: Response<any>
        , data: any, access: string, operation: string): Rasbery {
        let authority;
        if (operation == 'check') {
            if (access == 'guest') {
                authority = new GuestCheck(request, response, data);
                return authority;
            } else if (access == 'admin') {
                authority = new AdminCheck(request, response, data);
                return authority;
            }
        } else if (operation == 'change') {
            if (access == 'guest') {
                authority = new GuestChange(request, response, data);
                return authority;
            } else if (access == 'admin') {
                authority = new AdminChange(request, response, data);
                return authority;
            }
        }
        throw e();

    }
}