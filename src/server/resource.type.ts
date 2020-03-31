import {NextFunction, Request, Response} from "express";

export type HandlerFn = (req?: Request, res?: Response, done?: NextFunction) => Promise<any>;

export interface RouteDef {
    method: string,
    path: string,
    handler: HandlerFn
}

export interface ResourceBaseType {
    _namespace: string;
    getRoutes(): Array<RouteDef>;
}
