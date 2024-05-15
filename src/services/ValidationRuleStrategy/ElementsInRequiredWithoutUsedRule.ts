import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class ElementsInRequiredWithoutUsedRule implements IValidationRuleStrategy {

    message : string = "";

    isValid(obj: any): boolean {

        let isValid = true;
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());
        if(properties.includes("required") && properties.includes("properties")
            ){
                let properties = Object.getOwnPropertyNames(obj.properties).map(x=> x.toLocaleLowerCase());
 
                let objWithoutProperties =  obj.required.filter((r: any)=> !properties.includes(r.toLocaleLowerCase()))
                this.message = `Campo ${objWithoutProperties} contido em required não existe`
               
                isValid =  objWithoutProperties.length == 0 ;
        }

        return isValid;
    }

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.elementsInRequiredWithoutUsedRule;
    }

    getNameRule():string{
        return this.message;
    }

}