import express,{RequestHandler,Express,Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

function corsMiddleware(): RequestHandler {
    return cors();
}

interface IAuth{
    secret: string;
    tokename: string;
}

function authMiddleware(authParams:IAuth):RequestHandler{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            const token=req.headers.authorization?.split(" ")[1]||req.headers[authParams.tokename]||req.body[authParams.tokename]||req.params[authParams.tokename]||req.query[authParams.tokename]||"";
            if(!token) throw new Error("token not found");
        } catch (error:unknown) {
            next(error);
        }
        
    }
}