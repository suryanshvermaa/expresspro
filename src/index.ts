import express from 'express';
import cors from 'cors';
import response from './utils/response';
import bcrypt from "bcryptjs"
import asyncHandler from './utils/asyncHandler';
import errorHandler from './middlewares/error';
import { AppError } from './utils/error';
import Auth from './jwt';
import jwt from 'jsonwebtoken';

express.cors = cors;
express.auth = Auth;
express.resp=response;
express.bcrypt=bcrypt;
express.asyncHandler=asyncHandler;
express.error=errorHandler;
express.AppError=AppError;
express.jwt=jwt;

module.exports = express; // for commonjs
export default express; // for ES modules