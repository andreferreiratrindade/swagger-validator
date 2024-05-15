
import StringWithPatternRule from "../../src/services/ValidationRuleStrategy/StringWithPatternRule";
describe('String with maxlength rule', () => {

  test('should validate string with pattern', async () => {
    let validation = new StringWithPatternRule();
    let obj = {type : "string", pattern: "[wasdw]"};
    let result = validation.isValid(obj);
    expect(true).toBe(result)
  })

  test('should validate string without pattern', async () => {
    let validation = new StringWithPatternRule();
    let obj = {type : "string"};
    let result = validation.isValid(obj);
    expect(false).toBe(result)
  })

})