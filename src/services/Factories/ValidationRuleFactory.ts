import { TypeValidationRuleStrategy } from "../../constants/TypeValidationRuleStrategy";
import EnumWithoutMaxLengthRule from "../ValidationRuleStrategy/EnumWithoutMaxLengthRule";
import EnumWithoutMinLengthRule from "../ValidationRuleStrategy/EnumWithoutMinLengthRule";
import IValidationRuleStrategy from "../ValidationRuleStrategy/IValidationRuleStrategy";
import StringWithMinLengthRule from "../ValidationRuleStrategy/StringWithMinLengthRule";
import StringWithMaxLengthRule from "../ValidationRuleStrategy/StringWithMaxLengthRule";
import StringWithPatternRule from "../ValidationRuleStrategy/StringWithPatternRule";
import StringWithPatternValidWithExampleRule from "../ValidationRuleStrategy/StringWithPatternValidWithExampleRule";
import ArrayWithMaxItemRule from "../ValidationRuleStrategy/ArrayWithMaxItemRule";
import StringPatternWIthoutNARule from "../ValidationRuleStrategy/StringPatternWIthoutNARule";
import StringWithPatternNotAcceptStringWithTrimPatternRule from "../ValidationRuleStrategy/StringWithPatternNotAcceptStringWithTrimPatternRule";
import ElementsInRequiredWithoutUsedRule from "../ValidationRuleStrategy/ElementsInRequiredWithoutUsedRule";
import PropertyCnpjRule from "../ValidationRuleStrategy/PropertyCnpjRule";
import PropertyCpfRule from "../ValidationRuleStrategy/PropertyCpfRule";

export default class ValidationRuleFactory{


    public  static buildDictionary() {
        let dicValidationRules : { [id : number] : IValidationRuleStrategy; } = {};

        this.AddValidationRule(dicValidationRules,new StringWithMaxLengthRule());
        this.AddValidationRule(dicValidationRules,new EnumWithoutMinLengthRule());
        this.AddValidationRule(dicValidationRules,new EnumWithoutMaxLengthRule());
        this.AddValidationRule(dicValidationRules,new StringWithPatternRule());
        this.AddValidationRule(dicValidationRules,new StringWithPatternValidWithExampleRule());
        this.AddValidationRule(dicValidationRules,new ArrayWithMaxItemRule());
        this.AddValidationRule(dicValidationRules,new StringWithMinLengthRule());
        this.AddValidationRule(dicValidationRules,new StringPatternWIthoutNARule());
        this.AddValidationRule(dicValidationRules,new StringWithPatternNotAcceptStringWithTrimPatternRule());
        this.AddValidationRule(dicValidationRules,new ElementsInRequiredWithoutUsedRule());
        this.AddValidationRule(dicValidationRules, new PropertyCnpjRule());
        this.AddValidationRule(dicValidationRules, new PropertyCpfRule());
        return dicValidationRules;
    }

    private static  AddValidationRule(dic : any, rule : IValidationRuleStrategy){
        dic[rule.getCodeEnum()] = rule;
    }

    public  static GetValidationRuleByType(type: TypeValidationRuleStrategy):IValidationRuleStrategy {
        return this.buildDictionary()[type];
    }
}