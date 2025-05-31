import "express";
import type * as Bcrypt from "bcrypt";
declare module "express"{
      interface Express{
            bcrypt: Bcrypt;
            errorHandler: RequestHandler;
            auth(authParams: IAuth): RequestHandle;
            cors(): RequestHandler;
            resp(res:Response,status: number,message: string,data: object):Response;
            async(fn: (req:Request, res:Response, next:NextFunction)=>Promise<any>):RequestHandler;
      }
      export function resp(res:Response,status: number,message: string,data: object):Response;
      export function cors(): RequestHandler;
      export function auth(authParams: IAuth): RequestHandler;
      export const errorHandler: RequestHandler;
      export let bcrypt: Bcrypt;
      export function async(fn: (req:Request, res:Response, next:NextFunction)=>Promise<any>):RequestHandler;
}
