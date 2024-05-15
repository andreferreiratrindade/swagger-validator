
import SwaggerDereferencerService from "../src/services/SwaggerDereferencerService";
describe('testing dereferenced file generation', () => {

  test('should dereference the spec', async () => {
    let objResult = await SwaggerDereferencerService.dereference("https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml")
    let objString = JSON.stringify(objResult);
    expect(objString.search(/(\$ref)/g)).toBe(-1)
  })
})