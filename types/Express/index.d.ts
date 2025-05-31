import { RequestHandler, Request,Response } from "express";

declare module "express" {
  export interface Express {
    cors(): RequestHandler;
    auth(authParams: IAuth): RequestHandler;
    errorHandler: RequestHandler;
    resp(res:Response,status: number,message: string,data: object): Response
  }
  export function resp(res:Response,status: number,message: string,data: object):Response
  export function cors(): RequestHandler;
  export function auth(authParams: IAuth): RequestHandler;
  export const errorHandler: RequestHandler;
}

