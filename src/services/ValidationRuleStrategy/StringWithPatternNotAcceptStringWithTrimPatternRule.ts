import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class StringWithPatternNotAcceptStringWithTrimPatternRule implements IValidationRuleStrategy {

    pattern: string = `[\\w\\w\\s]*`;

    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("pattern")
            ){

                isValid = obj.pattern.toLocaleLowerCase() != this.pattern;
        
            }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.stringWithPatternNotAcceptStringWithTrimPatternRule;
    }

    getNameRule():string{
        return `Campo contem propriedade 'pattern' igual ${this.pattern}` ;
    }

}