import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class StringWithMaxLengthRule implements IValidationRuleStrategy {



    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("type") && !properties.includes("enum")){
            if(obj.type == "string"){
                isValid = properties.includes("maxlength") && obj.maxLength > 0;
            }
        }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.stringWithMaxLengthRule;
    }

    getNameRule():string{
        return "Campo não contem propriedade 'maxLength'";
    }

}