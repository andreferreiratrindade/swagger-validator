
import StringWithPatternValidWithExampleRule from "../../src/services/ValidationRuleStrategy/StringWithPatternValidWithExampleRule";

describe('String with pattern and validation with example rule', () => {

  test('should validate string with pattern and example ', async () => {
    let validation = new StringWithPatternValidWithExampleRule();
    let obj = {type : "string", pattern: "^[a-zA-Z0-9][a-zA-Z0-9-]{0,99}$", example: "25cac914-d8ae-6789-b215-650a6215820d"};
    let result = validation.isValid(obj);
    expect(result).toBe(true)
  })

  test('should validate string without pattern and example different of pattern', async () => {
    let validation = new StringWithPatternValidWithExampleRule();
    let obj = {type : "string", pattern: "^[a-zA-Z0-9]$", example: "25cac914-d8ae-6789-b215-650a6215820d"};
    let result = validation.isValid(obj);
    expect(result).toBe(false)
  })

})