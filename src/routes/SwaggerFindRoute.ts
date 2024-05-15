import express, { Router } from 'express'
import SwaggerFindService from '../services/SwaggerFindService';

export default class SwaggerFindRoute {

    private readonly _swaggerFindService !: SwaggerFindService

    constructor(swaggerValidatorService: SwaggerFindService) {
        this._swaggerFindService = swaggerValidatorService;
    }

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post('', (request: any, response: any, next: any) => {
            this._swaggerFindService.getFindProperty(request, response).then(x=>{
                return x;
            }).catch(x => {
                next(x)
            });
        });

        return router;
    }
}
