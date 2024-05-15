import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class StringPatternWIthoutNARule implements IValidationRuleStrategy {

    public message : string = "";

    /**
     *
     */
    constructor() {
        
    }

    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("pattern") 
            ){
                isValid = !obj.pattern.toLocaleLowerCase().includes("na");
                if(!isValid){
                    this.message = obj.pattern;
                }
        }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.stringPatternWIthoutNARule;
    }

    getNameRule():string{
        return `Propriedade 'pattern: ${this.message}' aceitando 'NA'`;
    }

}