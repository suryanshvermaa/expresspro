import express,{RequestHandler} from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/auth';
import response from './utils/response';
import bcrypt from "bcrypt"

function corsMiddleware(): RequestHandler {
    return cors();
}

express.cors = corsMiddleware;
express.auth = authMiddleware;
express.resp=response;
express.bcrypt=bcrypt;

//for common js
module.exports=express;
//for modular js/ts
export default express;