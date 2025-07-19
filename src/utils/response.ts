import { Response } from "express";
export interface IRes {
	success: boolean;
	message: string;
	data: object;
}

/**
 * @description: response function to send response
 * @param {Response} res - express response object
 * @param {number} status - http status code
 * @param {string} message - response message
 * @param {object} data - response data
 * @returns - express response object
 */
const response = (
	res: Response,
	status: number,
	message: string,
	data: object
) => {
	const resObj: IRes = {
		success: true,
		message,
		data: data,
	};
	return res.status(status).json(resObj);
};
export default response;
module.exports=response;