import {Request, Response, NextFunction } from "express"

function myAsyncHandler(asyncFunction : any) {
	return (req : Request, res : Response, next : NextFunction) => {
		try {
			asyncFunction(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}
module.exports = { myAsyncHandler }