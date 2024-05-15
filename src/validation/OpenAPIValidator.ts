import SwaggerParser from '@apidevtools/swagger-parser'

export default class OpenAPIValidator {

    public async isValidOpenAPIFormat(api: string) {

        try {
            await SwaggerParser.validate(api, { validate: { schema: false } });
            return true
        }
        catch (err) {
            return false;
        }
    }

    public isOpenAPIv3(openAPISpec: any): boolean {
        return openAPISpec.openapi === "3.0.0";
    }
}