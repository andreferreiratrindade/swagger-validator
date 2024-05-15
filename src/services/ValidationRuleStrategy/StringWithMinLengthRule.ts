import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class StringWithMinLengthRule implements IValidationRuleStrategy {



    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("type") && !properties.includes("enum")){
            if(obj.type == "string"){
                isValid = properties.includes("minlength");
            }
        }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.stringWithMinLengthRule;
    }

    getNameRule():string{
        return "Campo não contem propriedade 'minLength'";
    }

}