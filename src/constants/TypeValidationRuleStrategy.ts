export enum TypeValidationRuleStrategy{
   stringWithMaxLengthRule = 1,
   enumWithoutMaxLengthRule = 2,
   stringWithPatternValidWithExampleRule = 3,
   stringWithPatternRule = 4,
   arrayWithMaxItemRule = 5,
   stringWithMinLengthRule = 6,
   stringPatternWIthoutNARule = 7,
   stringWithPatternNotAcceptStringWithTrimPatternRule = 8,
   elementsInRequiredWithoutUsedRule= 9,
   propertyCnpjRule =10,
   propertyCpfRule = 11,
   enumWithoutMinLengthRule = 12
}