import express,{RequestHandler} from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/auth';
import response from './utils/response';

function corsMiddleware(): RequestHandler {
    return cors();
}

express.cors = corsMiddleware;
express.auth = authMiddleware;
express.resp=response;

//for common js
module.exports=express;
//for modular js/ts
export default express;