
import EnumWithoutMaxLengthRule from "../../src/services/ValidationRuleStrategy/EnumWithoutMaxLengthRule";
describe('String with maxlength rule', () => {

  test('should validate enum without maxLength', async () => {
    let validation = new EnumWithoutMaxLengthRule();
    let obj = {type : "string", enum: ["teste1", "teste2"]};
    let result = validation.isValid(obj);
    expect(true).toBe(result)
  })

  test('should validate enum with maxlength = 0', async () => {
    let validation = new EnumWithoutMaxLengthRule();
    let obj = {type : "string", maxLength: 10, enum: ["teste1", "teste2"]};
    let result = validation.isValid(obj);
    expect(false).toBe(result)
  })

  test('should validate object different', async () => {
    let validation = new EnumWithoutMaxLengthRule();
    let obj = {type : "string", maxLength: 10};
    let result = validation.isValid(obj);
    expect(true).toBe(result)
  })
})