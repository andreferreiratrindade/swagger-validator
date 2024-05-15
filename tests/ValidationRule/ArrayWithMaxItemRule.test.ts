
import { TypeValidationRuleStrategy } from "../../src/constants/TypeValidationRuleStrategy";
import SwaggerValidatorService from "../../src/services/SwaggerValidatorService";
import ArrayWithMaxItemRule from "../../src/services/ValidationRuleStrategy/ArrayWithMaxItemRule";

describe('Array with maxItem rule', () => {

  test('should validate array with maxItem ', async () => {
    let validation = new ArrayWithMaxItemRule();
    let obj = {type : "array", maxItems: 3};
    let result = validation.isValid(obj);
    expect(result).toBe(true)
  })

  test('should validate array without maxItems', async () => {
    let validation = new ArrayWithMaxItemRule();
    let obj = {type : "array", pattern: "^[a-zA-Z0-9]$"};
    let result = validation.isValid(obj);
    expect(result).toBe(false)
  })

  test('should validate array with real file' , async () => {
    let swaggerValidatorService = new SwaggerValidatorService();
    let url = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/1.0.0.yml";
    let validators = [TypeValidationRuleStrategy.arrayWithMaxItemRule];

    let data = await swaggerValidatorService.ExecValidation(url,validators);

    expect(data.length).toBe(2);

  })

})