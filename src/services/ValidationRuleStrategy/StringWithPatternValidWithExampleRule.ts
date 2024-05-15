import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class StringWithPatternValidWithExampleRule implements IValidationRuleStrategy {



    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("type")
            && !properties.includes("enum") 
            && properties.includes("pattern") 
            && obj.type == "string"
            && obj.pattern.length > 0
            && properties.includes("example")
            && obj.example.length > 0
            ){
                let regexp = new RegExp(obj.pattern);
                isValid = regexp.test(obj.example);
        }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.stringWithPatternValidWithExampleRule;
    }

    getNameRule():string{
        return "Propriedade 'pattern' falhou ao ser validado com propriedade 'exemplo'";
    }

}