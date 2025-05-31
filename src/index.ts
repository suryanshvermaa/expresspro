import express,{RequestHandler,Request,Response,NextFunction} from 'express';
import cors from 'cors';

function corsMiddleware(): RequestHandler {
    return cors();
}


