import express, { Router } from 'express'
import SwaggerValidatorService from '../services/SwaggerValidatorService';

export default class SwaggerValidatorRoute {

    private readonly _swaggerValidatorService !: SwaggerValidatorService

    constructor(swaggerValidatorService: SwaggerValidatorService) {
        this._swaggerValidatorService = swaggerValidatorService;
    }

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post('', (request: any, response: any, next: any) => {
            this._swaggerValidatorService.PostValidation(request, response).then(x=>{
                return x;
            }).catch(x => {
                next(x)
            });
        });

        return router;
    }
}
