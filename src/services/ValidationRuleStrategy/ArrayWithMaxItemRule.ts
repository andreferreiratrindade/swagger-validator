import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class ArrayWithMaxItemRule implements IValidationRuleStrategy {



    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("type")
            && obj.type == "array"
            ){
                isValid = properties.includes("maxitems") && obj.maxItems > 0
            }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.arrayWithMaxItemRule;
    }

    getNameRule():string{
        return "Propriedade 'maxItem' no campo do tipo array não foi encontrado ou é igual à zero";
    }

}