import { check, validationResult } from "express-validator";
import HttpStatusCode from "../constants/HttpStatusCode";
import RetornoRequest from "../utils/retornoRequest"
import QueryPropertyDTO from "../dtos/QueryPropertyDTO";
import QueryPropertyReportDTO from "../dtos/QueryPropertyReportDTO";
import SwaggerDereferencerService from "./SwaggerDereferencerService";
import FormattingValidationService from "./FormattingChangeService";
import SwaggerPreparationDataService from "./SwaggerPreparationDataService";
import QueryPropertyApiDTO from "../dtos/QueryPropertyApiDTO"
export default class SwaggerFindService {

    public async getFindPropertyValidation(req: any) {
        await check("url")
            .notEmpty()
            .withMessage("Campo url é de preenchimento obrigatório")
            .run(req);
    }

    async getFindProperty(req: any, res: any) {
        try {
            await this.getFindPropertyValidation(req);

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

        let tasks: Promise<QueryPropertyReportDTO[]>[] = [];
        req.body.url.forEach((url: string) => {
            tasks.push(this.Exec(url, req.body.query));
        });

        let resultSwaggerValidation = await Promise.all(tasks)

        let lstReturn : QueryPropertyReportDTO[]= [];
        resultSwaggerValidation.forEach(x=> lstReturn.push(...x));

        return RetornoRequest.Response(lstReturn, null, res, HttpStatusCode.OK);
    }



    checkValidationRuleByField(
        obj: any,
        path: string[],
        queryFindObj: QueryPropertyDTO[]
    ): QueryPropertyReportDTO[] {
        let objResultList: QueryPropertyReportDTO[] = [];

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
                    this.checkQueryProperty(queryFindObj,
                        path,
                        field,
                        value,
                        objResultList);
                    path.push(field);

                    objResultList.push(
                        ...this.checkValidationRuleByField(value, path, queryFindObj)
                    );
                    path.pop();
                } else {
                    this.checkQueryProperty(queryFindObj,
                        path,
                        field,
                        value,
                        objResultList);
                }
            }
        });
        return objResultList;
    }

    public checkQueryProperty(queryPropertyDTO: QueryPropertyDTO[],
        path: string[],
        field: string,
        value: any,
        objResultList: QueryPropertyReportDTO[]
    ) {

        queryPropertyDTO.forEach((x) => {

            let properties = Object.getOwnPropertyNames(value);

            if (properties.includes(x.property)) {


                if (x.value.length === 0 ||
                    (!x.isExactlyValue && 
                        value[x.property].toString().toLocaleLowerCase().includes(x.value)) ||
                    (x.isExactlyValue  && value[x.property].toString().toLocaleLowerCase() == x.value)
                ) {
                    let objResult: QueryPropertyReportDTO = {
                        field: path.join("/") + "/" + field,
                        property: x.property,
                        value: value[x.property].toString(),
                        api: ""
                    };

                    objResultList.push(objResult);

                }
            }
        });

        return objResultList;
    }

    public convertQueryPropertyApiToCsv(lst : QueryPropertyApiDTO[]) : string{
        
        let str : string= "api;field;property;value \r\n ";
        lst.forEach(x=> {
            x.items.forEach(item=> {
                str += `${x.api.title};${item.field};${item.property};${item.value} \r\n `
            })

        });

        return str;
    }

    public async Exec(
        urlApi: string,
        query: QueryPropertyDTO[]
    ): Promise<QueryPropertyReportDTO[]> {

        query.forEach(x => {

            x.value = x.value.toLocaleLowerCase()
        })

        let objSwaggerYml = await SwaggerDereferencerService.dereference(urlApi);
        let objJson = SwaggerPreparationDataService.removeComponente(objSwaggerYml);

        objJson = SwaggerPreparationDataService.convertNameToIdArrayParameters(objJson);

        let validationReportItemDTO = this.checkValidationRuleByField(
            objJson,
            [],
            query
        );
        validationReportItemDTO = FormattingValidationService.formattingQueryPropertyReportDTO(
            validationReportItemDTO
        );

        validationReportItemDTO.forEach(x=> x.api = objSwaggerYml.info.title);

    

        return validationReportItemDTO;

    }

}