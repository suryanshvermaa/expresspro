import express,{Application, RequestHandler} from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/auth';
import response from './utils/response';
import bcrypt from "bcrypt"
import asyncHandler from './utils/asyncHandler';
import errorHandler from './middlewares/error';

function corsMiddleware(): RequestHandler {
    return cors();
}


express.cors = corsMiddleware;
express.auth = authMiddleware;
express.resp=response;
express.bcrypt=bcrypt;
express.async=asyncHandler;
express.error=errorHandler

module.exports = express; // for commonjs
export default express; // for ES modules