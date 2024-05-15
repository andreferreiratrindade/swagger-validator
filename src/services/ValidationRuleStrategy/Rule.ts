import { TypeValidationRuleStrategy } from "src/constants/TypeValidationRuleStrategy";

export default abstract class Rule {
    static typeValidationRule(): TypeValidationRuleStrategy {
        throw new Error("Not implemented");
    }
}