import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error";

/**
 * @description Error handling middleware
 * @param {AppError|Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 */
const errorHandler = (
	err: Error | AppError,
	req: Request,
	res: Response,
	_next: NextFunction
):void => {
	const statusCode = err instanceof AppError ? err.statusCode : 500;
	res.status(statusCode).json({
		success: false,
		message:err.message||"Internal Server Error",
		data: {},
	})
};

export default errorHandler; //for module js
module.exports=errorHandler; //for commonjs