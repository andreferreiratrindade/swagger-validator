import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class EnumWithoutMaxLengthRule implements IValidationRuleStrategy {



    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("enum")){
            isValid = !properties.includes("maxlength");
        }

        return isValid;
    }

    getDescription(): string {
        return "Enum contem propriedade 'maxLength'";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.enumWithoutMaxLengthRule;
    }

    getNameRule():string{
        return "";
    }

}