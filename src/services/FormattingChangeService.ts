import { from } from "linq-to-typescript"
import ValidationReportItemDTO from "../dtos/ValidationReportItemDTO";
import QueryPropertyReportDTO from "../dtos/QueryPropertyReportDTO";

export default class FormattingValidationService {
    public static formatting(validationReportItemDtoList: ValidationReportItemDTO[]): ValidationReportItemDTO[] {
        
        validationReportItemDtoList.forEach(item => {
            item.field = this.replaceWord(item.field)
        });

        return validationReportItemDtoList;
    }    
    
    public static formattingQueryPropertyReportDTO(QueryPropertyReportDTO: QueryPropertyReportDTO[]): QueryPropertyReportDTO[] {
        
        QueryPropertyReportDTO.forEach(item => {
            item.field = this.replaceWord(item.field)
        });

        return QueryPropertyReportDTO;
    }


    private formatValueAsString(value: any): String {
        if (typeof value == "object" || !value) {
            return ""
        }
        return value.toString();
    }

    private static replaceWord(text: string): string {
        let lstReplace = this.wordsForRemove();
        lstReplace.forEach(x => {
            text = text.split(x.from).join(x.to);
        })
        return text
    }

    private static wordsForRemove(): any[] {
        let lst: any[] = [
            { from: "content/application/json; charset=utf-8", to: "" },
            { from: "application/json/", to: "" },
            { from: "paths//", to: "" },
            { from: "/content", to: "" },
            { from: "/schema", to: "" },
            { from: "properties/", to: "" },
            { from: "application/jwt/", to: "" },
        ]

        return lst;
    }
}