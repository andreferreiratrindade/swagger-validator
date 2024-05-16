import ValidationReportItemDTO from "../dtos/ValidationReportItemDTO";
import ValidationRuleFactory from "./Factories/ValidationRuleFactory";
import FormattingValidationService from "./FormattingChangeService";
import SwaggerDereferencerService from "./SwaggerDereferencerService";
import SwaggerPreparationDataService from "./SwaggerPreparationDataService";
import IValidationRuleStrategy from "./ValidationRuleStrategy/IValidationRuleStrategy";
import { check, validationResult } from "express-validator";
import HttpStatusCode from "../constants/HttpStatusCode";
import RetornoRequest from "../utils/retornoRequest"
export default class SwaggerValidatorService {
  public async postValidation(req: any) {
    await check("url")
      .notEmpty()
      .withMessage("Campo url é de preenchimento obrigatório")
      .run(req);

    await check("validators")
      .notEmpty()
      .withMessage("Campo validators é de preenchimento obrigatório")
      .run(req);
  }

  async PostValidation(req: any, res: any) {
    try {
      await this.postValidation(req);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(
          result.array(),
          null,
          res,
          HttpStatusCode.BAD_REQUEST
        );
      }
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }

   let resultSwaggerValidation =  await this.ExecValidation(req.body.url, req.body.validators);

   return RetornoRequest.Response(resultSwaggerValidation, null, res, HttpStatusCode.OK);
  }

  checkValidationRuleByField(
    obj: any,
    path: string[],
    validators: IValidationRuleStrategy[]
  ): ValidationReportItemDTO[] {
    let objResultList: ValidationReportItemDTO[] = [];

    var fields = Object.getOwnPropertyNames(obj);
    fields.forEach((field) => {
      let value = obj[field];

      if (
        (Array.isArray(value) && typeof value[0] == "object") ||
        typeof value == "object"
      ) {
        let fieldSub = Object.getOwnPropertyNames(value);
        if (
          fieldSub.filter(
            (x) => typeof value[x] == "object" && !Array.isArray(value[x])
          ).length != 0
        ) {
          this.checkValidation(validators,
            path,
            field, 
            value,
            objResultList);
          path.push(field);

          objResultList.push(
            ...this.checkValidationRuleByField(value, path, validators)
          );
          path.pop();
        } else {
          this.checkValidation(validators,
            path,
            field, 
            value,
            objResultList);
        }
      }
    });
    return objResultList;
  }

  public checkValidation(
    validators: IValidationRuleStrategy[],
    path: string[],
    field: string, 
    value: object,
    objResultList : ValidationReportItemDTO[]
    ){

    validators.forEach((x) => {
      if (!x.isValid(value, field)) {
        let objResult: ValidationReportItemDTO = {
          field: path.join("/") + "/" + field,
          rule: x.getNameRule(),
          descriptionError: x.getDescription(),
          endPoint: "",
        };

        objResultList.push(objResult);
      }
    });
  }


  public CheckSwaggerValidation(body: any): boolean {
    let isValid = true;
    if (!body.url) {
      isValid = false;
    }
    if (body.validators) {
      let validators: number[] = body.validators;
      let dicValidators = this.GetValidationRuleStrategy(validators);
      if (dicValidators.length != validators.length) {
        return false;
      }
    } else {
      isValid = false;
    }
    return false;
  }

  public async ExecValidation(
    urlApi: string,
    rules: number[]
  ): Promise<ValidationReportItemDTO[]> {
    // TODO
    let objSwaggerYml = await SwaggerDereferencerService.dereference(urlApi);
    let objJson = SwaggerPreparationDataService.removeComponente(objSwaggerYml);

    objJson = SwaggerPreparationDataService.convertNameToIdArrayParameters(objJson);

    let iValidatorsRules = this.GetValidationRuleStrategy(rules);
    let validationReportItemDTO = this.checkValidationRuleByField(
      objJson,
      [],
      iValidatorsRules
    );
    validationReportItemDTO = FormattingValidationService.formatting(
      validationReportItemDTO
    );
    return validationReportItemDTO;
  }

  public AddCsvFormat(){
    
  }

  public GetValidationRuleStrategy(rules: number[]): IValidationRuleStrategy[] {
    let dictionaries = ValidationRuleFactory.buildDictionary();
    let iValidations = rules.map((x) => dictionaries[x]);

    return iValidations;
  }

 
}
