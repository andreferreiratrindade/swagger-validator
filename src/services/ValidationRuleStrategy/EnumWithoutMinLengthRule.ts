import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class EnumWithoutMinLengthRule implements IValidationRuleStrategy {



    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("enum")){
            isValid = !properties.includes("minlength");
        }

        return isValid;
    }

    getDescription(): string {
        return "Enum contem propriedade 'minLength'";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.enumWithoutMinLengthRule;
    }

    getNameRule():string{
        return "";
    }

}