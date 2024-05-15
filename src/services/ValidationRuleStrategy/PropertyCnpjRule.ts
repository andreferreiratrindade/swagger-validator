import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";

export default class PropertyCnpjRule implements IValidationRuleStrategy {

    public message : string = "";
    public CNPJ_PATTERN : string = `^\d{14}$`;
    public CNPJ_MAX_LENGTH : number = 14;

    /**
     *
     */
    constructor() {
        
    }

    isValid(obj: any, field:string): boolean {

        let isValid = true;
        let lstMessage : string[] = []
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());

        if(field.includes("cnpj")
            ){
                if(obj.pattern != this.CNPJ_PATTERN){
                    lstMessage.push(`Propriedade do tipo CNPJ com pattern: ${obj.pattern}'. Pattern padrão é igual à: ${this.CNPJ_PATTERN}`)
                }
                if(properties.includes("maxlength") && obj.maxLength != this.CNPJ_MAX_LENGTH){
                    lstMessage.push(`Propriedade com maxlength: ${obj.maxLength}. Padrão para esse campo é maxLength: ${this.CNPJ_MAX_LENGTH}`)
                }

                isValid =  lstMessage.length > 0;
                this.message =  lstMessage.join("; ");
        }

        return isValid;
    }
    

    getDescription(): string {
        return "";
    }

    getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.propertyCnpjRule;
    }

    getNameRule():string{
        return this.message;
    }

}