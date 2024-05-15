import SwaggerParser from "@apidevtools/swagger-parser"

export default class SwaggerDereferencerService {

    public static async dereference(spec: string): Promise<any> {
        let objJson = {}
        try {
            objJson = await SwaggerParser.dereference(spec)
        } catch (error) {
            console.error(error)
        }
        return objJson
    }
}