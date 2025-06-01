/* =================== USAGE ===================

    import express = require("express");
    var app = express();

 =============================================== */

/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />

import * as bodyParser from "body-parser";
import * as core from "express-serve-static-core";
import * as serveStatic from "serve-static";

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
declare function e(): core.Express;

declare namespace e {
    /**
     * This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
     * @since 4.16.0
     */
    var json: typeof bodyParser.json;

    /**
     * This is a built-in middleware function in Express. It parses incoming requests with Buffer payloads and is based on body-parser.
     * @since 4.17.0
     */
    var raw: typeof bodyParser.raw;

    /**
     * This is a built-in middleware function in Express. It parses incoming requests with text payloads and is based on body-parser.
     * @since 4.17.0
     */
    var text: typeof bodyParser.text;

    /**
     * These are the exposed prototypes.
     */
    var application: Application;
    var request: Request;
    var response: Response;

    /**
     * This is a built-in middleware function in Express. It serves static files and is based on serve-static.
     */
    var static: serveStatic.RequestHandlerConstructor<Response>;

    /**
     * This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
     * @since 4.16.0
     */
    var urlencoded: typeof bodyParser.urlencoded;

    export function Router(options?: RouterOptions): core.Router;

    // my defined functions -> Suryansh Vermas
    /**
    * @description Custom error class for handling application errors
    * @class AppError
    * @extends Error
    * @param {string} message - The error message
    * @param {number} statusCode - The HTTP status code associated with the error
    * @example
    * throw new AppError('Not Found', 404);
    */
    export class AppError extends Error{
        constructor(message: string, statusCode: number);
    }
    /**
    * auth class for handling JWT authentication
    * @class Auth
    * @param {string} authSecret - The secret key used to sign the JWT tokens
    * @param {string} tokenname - The name of the token in the request {headers/body/params/query/authorization-header}
    * @description This class provides methods to create and verify JWT tokens, and a middleware function to authenticate requests.
    */
    export class auth{
        constructor(authSecret:string,tokenname:string);
         /**
        * 
        * @returns {Function} - Returns a middleware function that checks for a valid JWT token in the request headers or body
        * @throws {AppError} - Throws an error if the token is not provided or is invalid
        * @description - This middleware function checks for a valid JWT token in the request headers or body. If the token is valid, it adds the user data to the request object and calls the next middleware. If the token is invalid or not provided, it throws an AppError with a 401 status code.
        */
        public authMiddleware():(req: Request, res: Response, next: NextFunction) => void;
        /**
        * Creates a JWT token with the provided data and expiration time
        * @param {data:object} data - Data to be included in the token
        * @param {number} time - Expiration time in minutes
        * @returns {Promise<String>} - Returns a promise that resolves to the created token
        */
        public async createToken(data:object,time:number):Promise<string>;
        /**
        * Verifies the provided JWT token
        * @param {string} token - The JWT token to verify
        * @returns {Promise<object>} - Returns a promise that resolves to an object containing verification status and data
        */
        public async verifyToken(token:string):Promise<object>;
    }
    /**
    * @description Error handling middleware
    * @param {AppError|Error} err
    * @param {Request} req
    * @param {Response} res
    * @param {NextFunction} _next
    */
    export function error(err: Error | ExpressError, req: Request, res: Response, _next: NextFunction): void;
    
    /**
     * @description cors middleware for handling Cross-Origin Resource Sharing (CORS) requests
     */
    export var cors: typeof import("cors");
    /**
     * 
     * @description Function to send a response with a specific status, message, and data
     * @param {Response} res 
     * @param {number} status 
     * @param {string} message 
     * @param {object} data
     */
    export function resp(res: Response, status: number, message: string, data: object): void;
    /**
     * @description bcyptjs module for hashing passwords
     */
    export var bcrypt: typeof import('bcryptjs');
    /**
    * 
    * @param {(req:Request, res:Response, next:NextFunction)=>Promise<any>} fn - The async function to handle.
    * @description A middleware to handle async functions in Express.js.
    * It catches any errors thrown by the async function and passes them to the next middleware.
    * This is useful for avoiding try-catch blocks in every route handler.
    * @returns {RequestHandler} - A middleware function that handles the async function.
    * @example
    * app.get('/example', asyncHandler(async (req, res) => {
    *   const data = await someAsyncFunction();
    *   res.json(data);
    * }));
    */
    export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>):RequestHandler;

    /**
     * @description jsonwebtoken module for handling JSON Web Tokens (JWT)
     * @see https://www.npmjs.com/package/jsonwebtoken
     */
    export var jwt:typeof import("jsonwebtoken");


    interface RouterOptions {
        /**
         * Enable case sensitivity.
         */
        caseSensitive?: boolean | undefined;

        /**
         * Preserve the req.params values from the parent router.
         * If the parent and the child have conflicting param names, the child’s value take precedence.
         *
         * @default false
         * @since 4.5.0
         */
        mergeParams?: boolean | undefined;

        /**
         * Enable strict routing.
         */
        strict?: boolean | undefined;
    }

    interface Application extends core.Application {}
    interface CookieOptions extends core.CookieOptions {}
    interface Errback extends core.Errback {}
    interface ErrorRequestHandler<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>,
    > extends core.ErrorRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}


    interface Express extends core.Express {}

    
    interface Handler extends core.Handler {}
    interface IRoute extends core.IRoute {}
    interface IRouter extends core.IRouter {}
    interface IRouterHandler<T> extends core.IRouterHandler<T> {}
    interface IRouterMatcher<T> extends core.IRouterMatcher<T> {}
    interface MediaType extends core.MediaType {}
    interface NextFunction extends core.NextFunction {}
    interface Locals extends core.Locals {}
    interface Request<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>,
    > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
        user?:object;
    }
    interface RequestHandler<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>,
    > extends core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}
    interface RequestParamHandler extends core.RequestParamHandler {}
    interface Response<
        ResBody = any,
        Locals extends Record<string, any> = Record<string, any>,
    > extends core.Response<ResBody, Locals> {}
    interface Router extends core.Router {}
    interface Send extends core.Send {}
}

export = e;
