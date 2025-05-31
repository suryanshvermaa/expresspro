import { RequestHandler, Request } from "express";

interface IAuth {
  secret: string;
  tokename: string;
}

declare module "express" {
  export interface Express {
    cors(): RequestHandler;
    auth(authParams: IAuth): RequestHandler;
    errorHandler: RequestHandler;
  }

  export function cors(): RequestHandler;
  export function auth(authParams: IAuth): RequestHandler;
  export const errorHandler: RequestHandler;
}

