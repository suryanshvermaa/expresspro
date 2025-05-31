import jwt from "jsonwebtoken";

const JWT={
    /**
     * Creates a JWT token with the provided data and expiration time
     * @param {data:object} data - Data to be included in the token
     * @param {number} time - Expiration time in minutes
     * @returns {Promise<String>} - Returns a promise that resolves to the created token
     */
    async createToken({authSecret,data,time}:{authSecret:string,data:string,time:number}):Promise<string>{
        return new Promise(async(resolve,reject)=>{
            try{
                const token=await jwt.sign(data,authSecret,{expiresIn:`${time}m`}); //time in minutes
                resolve(token);
            }catch(err:any){
                reject(err);
            }
        })
    },
    /**
     * Verifies the provided JWT token
     * @param {string} token - The JWT token to verify
     * @returns {Promise<>} - Returns a promise that resolves to an object containing verification status and data
     */
    async verifyToken({authSecret,token}:{authSecret:string,token:string}):Promise<object>{
        return new Promise(async(resolve,reject)=>{
            try {
                const isVerified=await jwt.verify(token,authSecret);
                if(!isVerified) reject(new Error("Token expires or invalid"));
                const data=JSON.parse(JSON.stringify(isVerified));
                resolve(data);
            } catch (err:any) {
                reject(err);
            }
        })
    },

    // /**
    //  * Hashes the provided password using bcrypt
    //  * @param {string} password - The password to hash
    //  * @returns {Promise<string>} - Returns a promise that resolves to the hashed password
    //  */
    // public async hashPassword(password:string):Promise<string>{
    //     return new Promise(async(resolve,reject)=>{
    //         try {
    //             const hashedPassword=await bcrypt.hash(password,10);
    //             resolve(hashedPassword);
    //         } catch (err:any) {
    //             reject(err);
    //         }
    //     })
    // }
    // /**
    //  * Compares a plain password with a hashed password
    //  * @param {string} password - The plain password to compare
    //  * @param {string} hashedPassword - The hashed password to compare against
    //  * @returns {Promise<boolean>} - Returns a promise that resolves to true if the passwords match, false otherwise
    //  */
    // public async comparePassword(password:string,hashedPassword:string):Promise<boolean>{
    //     return new Promise(async(resolve,reject)=>{
    //         try {
    //             const isEqual=await bcrypt.compare(password,hashedPassword);
    //             if(isEqual) resolve(true);
    //             else resolve(false);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // }
}

// Export for ES modules
export default JWT;
