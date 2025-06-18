import jwt from "jsonwebtoken";
import { NextFunction, Request, Response} from "express";
import { AppError } from "../utils/error";
/**
 * Auth class for handling JWT authentication
 * @class Auth
 * @param {string} authSecret - The secret key used to sign the JWT tokens
 * @param {string} tokenname - The name of the token in the request {headers/body/params/query/authorization-header}
 * @description This class provides methods to create and verify JWT tokens, and a middleware function to authenticate requests.
 */
class Auth{
    private authSecret:string;
    private tokenname:string;
    constructor(authSecret:string,tokenname:string){
        this.authSecret=authSecret;
        this.tokenname=tokenname;
        this.authMiddleware = this.authMiddleware.bind(this);
    }

    /**
     * 
     * @returns {Function} - Returns a middleware function that checks for a valid JWT token in the request headers or body
     * @throws {AppError} - Throws an error if the token is not provided or is invalid
     * @description - This middleware function checks for a valid JWT token in the request headers or body. If the token is valid, it adds the user data to the request object and calls the next middleware. If the token is invalid or not provided, it throws an AppError with a 401 status code.
     */
    public authMiddleware(){
        return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
            try {
                const token = (req.headers?.[this.tokenname] || req.body?.[this.tokenname] || req.params?.[this.tokenname] || req.query?.[this.tokenname]||req.headers.authorization?.split(" ")[1]) || "";
                if(!token) throw new AppError("Unauthorised",401);
                const data=await this.verifyToken(token);         
                req.user=data;
                next();
            } catch (error:unknown) {
                next(error);
            }
            
        } 
    } 

    
    /**
     * Creates a JWT token with the provided data and expiration time
     * @param {data:object} data - Data to be included in the token
     * @param {number} time - Expiration time in minutes
     * @returns {Promise<String>} - Returns a promise that resolves to the created token
     */
    public async createToken(data:object,time:number):Promise<string>{
        return new Promise(async(resolve,reject)=>{
            try{
                const token=await jwt.sign(data,this.authSecret,{expiresIn:`${time}m`}); //time in minutes
                resolve(token);
            }catch(err:any){
                reject(err);
            }
        })
    }
    /**
     * Verifies the provided JWT token
     * @param {string} token - The JWT token to verify
     * @returns {Promise<object>} - Returns a promise that resolves to an object containing verification status and data
     */
    public async verifyToken(token:string):Promise<object>{
        return new Promise(async(resolve,reject)=>{
            try {
                const isVerified=await jwt.verify(token,this.authSecret);
                if(!isVerified) reject(new Error("Token expires or invalid"));
                const data=JSON.parse(JSON.stringify(isVerified));
                resolve(data);
            } catch (err:any) {
                reject(err);
            }
        })
    }
}

export default Auth; //for module
module.exports=Auth; //for commonjs
