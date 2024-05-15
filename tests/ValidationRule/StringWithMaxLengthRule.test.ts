
import StringWithMaxLengthRule from "../../src/services/ValidationRuleStrategy/StringWithMaxLengthRule";
describe('String with maxlength rule', () => {

  test('should validate string with maxlength', async () => {
    let validation = new StringWithMaxLengthRule();
    let obj = {type : "string", maxLength: 10};
    let result = validation.isValid(obj);
    expect(true).toBe(result)
  })

  test('should validate string with maxlength = 0', async () => {
    let validation = new StringWithMaxLengthRule();
    let obj = {type : "string", maxLength: 0};
    let result = validation.isValid(obj);
    expect(false).toBe(result)
  })

  test('should validate object differente', async () => {
    let validation = new StringWithMaxLengthRule();
    let obj = {type : "number", maxLength: 0};
    let result = validation.isValid(obj);
    expect(true).toBe(result)
  })
})