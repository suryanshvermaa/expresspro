import { NextFunction, Request, RequestHandler, Response } from "express";
import JWT from "../jwt";

export interface IAuth {
    secret: string;
    tokename: string;
}

function authMiddleware(authParams:IAuth):RequestHandler{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token=req.headers.authorization?.split(" ")[1]||req.headers[authParams.tokename]||req.body[authParams.tokename]||req.params[authParams.tokename]||req.query[authParams.tokename]||"";
            if(!token) throw new Error("Unauthorised");
            const data=await JWT.verifyToken({authSecret:authParams.secret,token});         
            req.user=data;
            next();
        } catch (error:unknown) {
            next(error);
        }
        
    }  
}

export default authMiddleware;