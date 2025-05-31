import { NextFunction, Request, RequestHandler, Response } from "express";
import JWT from "../jwt";

/**
 * 
 * @param {{secret: string, tokenname: string}} authParams 
 * @returns 
 */
function authMiddleware({secret, tokenname}:{secret: string, tokenname: string}):RequestHandler{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token=req.headers.authorization?.split(" ")[1]||req.headers[tokenname]||req.body[tokenname]||req.params[tokenname]||req.query[tokenname]||"";
            if(!token) throw new Error("Unauthorised");
            const data=await JWT.verifyToken({authSecret:secret,token});         
            req.user=data;
            next();
        } catch (error:unknown) {
            next(error);
        }
        
    }  
}

export default authMiddleware;