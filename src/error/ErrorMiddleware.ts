import { NextFunction, Request, Response } from "express"
import ValidationError from "./ValidationError"
import HttpStatusCode from "../constants/HttpStatusCode"

export default class ErrorMiddleware {

    public static handler(err: any, req: Request, res: Response, next: NextFunction) {

        let status = HttpStatusCode.INTERNAL_SERVER_ERROR

        if(err instanceof ValidationError){
            status = HttpStatusCode.BAD_REQUEST
        }

        const message = err.message || "An error has occurred"

        return res.status(status).send({ status: status, message: message })
    }
}