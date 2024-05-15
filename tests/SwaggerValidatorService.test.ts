import { TypeValidationRuleStrategy } from "../src/constants/TypeValidationRuleStrategy";
import SwaggerValidatorService from "../src/services/SwaggerValidatorService";
import SwaggerDereferencerService from "../src/services/SwaggerDereferencerService";
import SwaggerPreparationDataService from "../src/services/SwaggerPreparationDataService";

describe('testing dereferenced file generation', () => {

  test('Validate get iValidationRules with 2 items', async () => {
    let swaggerValidatorService = new SwaggerValidatorService();
    let validators = [TypeValidationRuleStrategy.enumWithoutMaxLengthRule,TypeValidationRuleStrategy.stringWithMaxLengthRule];
    let iValidatorsRules = swaggerValidatorService.GetValidationRuleStrategy(validators);
    expect(2).toBe(iValidatorsRules.length)
  })

  test('Validate ENUM with maxLength and two items', async () => {
    let swaggerValidatorService = new SwaggerValidatorService();
    let validators = [TypeValidationRuleStrategy.enumWithoutMaxLengthRule];
    let obj = {type : "string", maxLength: 10, enum: ["teste1", "teste2"]};
    
    let iValidatorsRules = swaggerValidatorService.GetValidationRuleStrategy(validators);
    expect(1).toBe(iValidatorsRules.length);
    let validatorRule =  iValidatorsRules[0];
    let valid = validatorRule.isValid(obj);
    expect(false).toBe(valid);
  })

  test('Validate ENUM without maxLength and with check validation rule single' , async () => {
    let swaggerValidatorService = new SwaggerValidatorService();
    var objData = {
      release : {type : "string", enum: ["teste1", "teste2"], maxLength:100}
    };

    let validators = [TypeValidationRuleStrategy.enumWithoutMaxLengthRule];
    
    let iValidatorsRules = swaggerValidatorService.GetValidationRuleStrategy(validators);

    let data = swaggerValidatorService.checkValidationRuleByField(objData,[], iValidatorsRules);
    expect(1).toBe(data.length );

  })

  test('Validate ENUM without maxLength and String without maxlength ' , async () => {
    let swaggerValidatorService = new SwaggerValidatorService();
    var objData = {
      aggregator : {type : "string"},
      release : { type : "string", enum: ["teste1", "teste2"], maxLength:100}
    };

    let validators = [TypeValidationRuleStrategy.enumWithoutMaxLengthRule, TypeValidationRuleStrategy.stringWithMaxLengthRule];
    
    let iValidatorsRules = swaggerValidatorService.GetValidationRuleStrategy(validators);

    let data = swaggerValidatorService.checkValidationRuleByField(objData,[], iValidatorsRules);
    expect(2).toBe(data.length );
    expect('/aggregator').toBe(data[0].field );
    expect('/release').toBe(data[1].field );

  })

  test('Validate ENUM without maxLength and String without maxlength in real file' , async () => {
    let swaggerValidatorService = new SwaggerValidatorService();
  
    let objResult = await SwaggerDereferencerService.dereference("https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/pension/1.0.0-rc1.0.yml")
    let obj = SwaggerPreparationDataService.removeComponente(objResult);
    
    swaggerValidatorService.convertNameToIdArrayParameters(obj);

    let validators = [TypeValidationRuleStrategy.enumWithoutMaxLengthRule, TypeValidationRuleStrategy.stringWithMaxLengthRule];
    
    let iValidatorsRules = swaggerValidatorService.GetValidationRuleStrategy(validators);

    let data = swaggerValidatorService.checkValidationRuleByField(obj,[], iValidatorsRules);
    expect(2).toBe(data.length );


  })




})