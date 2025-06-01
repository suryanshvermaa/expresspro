import jwt from "jsonwebtoken";
import {AppError, NextFunction, Request, Response} from "express";
class Auth{
    private authSecret:string;
    private tokenname:string;
    constructor(authSecret:string,tokenname:string){
        this.authSecret=authSecret;
        this.tokenname=tokenname;
        this.authMiddleware = this.authMiddleware.bind(this);
    }

    public authMiddleware(){
        return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
            try {
                const token=req.headers.authorization?.split(" ")[1]||req.headers[this.tokenname]||req.body[this.tokenname]||req.params[this.tokenname]||req.query[this.tokenname]||"";
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
     * @returns {Promise<>} - Returns a promise that resolves to an object containing verification status and data
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

export default Auth;
