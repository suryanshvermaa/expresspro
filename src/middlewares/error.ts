import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../utils/error";

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
):void => {
	const statusCode = err instanceof ExpressError ? err.statusCode : 500;
	res.status(statusCode).json({
		success: false,
		message:err.message||"Internal Server Error",
		data: {},
	})
};

export default errorHandler;
