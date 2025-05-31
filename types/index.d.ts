import express,{Express} from "express";
declare module "expresspro" {
    import * as express from 'express';
    export = express;
}
declare namespace Express{
    export interface Request {
      user?: object;
    }
}
  