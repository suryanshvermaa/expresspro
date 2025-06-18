import { Request, Response, NextFunction, RequestHandler } from 'express';
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
const asyncHandler = (fn: (req:Request, res:Response, next:NextFunction)=>Promise<any>): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
module.exports=asyncHandler;
