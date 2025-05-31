import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/error";
import response from "../utils/response";

/**
 * @description Error handling middleware
 * @param err
 * @param req
 * @param res
 * @param _next
 */
const errorHandler = (
	err: Error | ExpressError,
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const statusCode = err instanceof ExpressError ? err.statusCode : 500;
    return response(res,statusCode,err.message||"Internal Server Error",{});
};

export default errorHandler;
