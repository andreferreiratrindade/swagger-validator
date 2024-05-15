import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";

export default interface  IValidationRuleStrategy {

    isValid(obj: any, field:string) : boolean;
    getDescription(): string;
    getCodeEnum():TypeValidationRuleStrategy;
    getNameRule():string;
    
}