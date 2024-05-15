import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class StringWithPatternRule implements IValidationRuleStrategy {



    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("type")
            && !properties.includes("enum") 
            ){
            if(obj.type == "string"){
                isValid = properties.includes("pattern") && obj.pattern.length > 0;
            }
        }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.stringWithPatternRule;
    }

    getNameRule():string{
        return "Campo não contem propriedade 'pattern'";
    }

}