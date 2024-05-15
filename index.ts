// npx ts-node index.ts

import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import ErrorMiddleware from './src/error/ErrorMiddleware';
import SwaggerValidatorRoute from './src/routes/SwaggerValidatorRoute'
import SwaggerFindRoute from './src/routes/SwaggerFindRoute'
import SwaggerValidatorService from './src/services/SwaggerValidatorService';
import SwaggerFindService from './src/services/SwaggerFindService';

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req : any, res : any, next : any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let swaggerValidatorRoute = new SwaggerValidatorRoute(new SwaggerValidatorService());
let swaggerFindRoute = new SwaggerFindRoute(new SwaggerFindService());

// public 
app.use('/validation', swaggerValidatorRoute.montaRotas());
app.use('/finder', swaggerFindRoute.montaRotas());

app.use(ErrorMiddleware.handler)

const port = process.env.PORT || 6003;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.info('App started on port -> ' + port));
}

export default app;