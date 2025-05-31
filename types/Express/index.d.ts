import { RequestHandler, Request,Response } from "express";
import type * as Bcrypt from "bcrypt";

declare module "express" {
  export interface Express {
    cors(): RequestHandler;
    auth(authParams: IAuth): RequestHandler;
    errorHandler: RequestHandler;
    resp(res:Response,status: number,message: string,data: object): Response;
    bcrypt: Bcrypt;
    async(fn: (req:Request, res:Response, next:NextFunction)=>Promise<any>): RequestHandler;
  }
  export function resp(res:Response,status: number,message: string,data: object):Response;
  export function cors(): RequestHandler;
  export function auth(authParams: IAuth): RequestHandler;
  export const errorHandler: RequestHandler;
  export let bcrypt: Bcrypt;
  export function async(fn: (req:Request, res:Response, next:NextFunction)=>Promise<any>):RequestHandler;
}

