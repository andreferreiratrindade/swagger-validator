import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import IValidationRuleStrategy from "./IValidationRuleStrategy";
import Rule from "./Rule";

export default class PropertyCpfRule implements  IValidationRuleStrategy {

    public message : string = "";
    public CPF_PATTERN : string = `^\d{11}$`;
    public CPF_MAX_LENGTH : number = 11;



    isValid(obj: any, field:string): boolean {

        let isValid = true;
        let lstMessage : string[] = []
        let properties = Object.getOwnPropertyNames(obj).map(x=> x.toLocaleLowerCase());

        if(field.includes("cpf")
            ){
                if(obj.pattern != this.CPF_PATTERN){
                    lstMessage.push(`Propriedade do tipo CPF com pattern: ${obj.pattern}'. Pattern padrão é igual à: ${this.CPF_PATTERN}`)
                }
                if(properties.includes("maxlength") && obj.maxLength != this.CPF_MAX_LENGTH){
                    lstMessage.push(`Propriedade com maxlength: ${obj.maxLength}. Padrão para esse campo é maxLength: ${this.CPF_MAX_LENGTH}`)
                }

                isValid =  lstMessage.length > 0;
                this.message =  lstMessage.join("; ");
        }

        return isValid;
    }
    

    getDescription(): string {
        return "";
    }

    public getCodeEnum():TypeValidationRuleStrategy{
        return TypeValidationRuleStrategy.propertyCpfRule;
    }

    getNameRule():string{
        return this.message;
    }

}