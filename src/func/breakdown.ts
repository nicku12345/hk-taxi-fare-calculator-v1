import { EquationProps } from "../components/Equation";
import { FareRule } from "../components/Fare";
import { FormProps } from "../components/Form";

export const breakdown = (formState: FormProps, fareRuleProps: FareRule): EquationProps => {
    const { kilometers, minutes, extraFare } = formState
    const { first2kmFare, next200mOr1minFare, next200mOr1minDiscountFare, discountFareThreshold } = fareRuleProps

    if (kilometers === 0) {
        return {
            first2kmCount: 0,
            first2kmFare: first2kmFare,
            next200mOr1minCount: 0,
            next200mOr1minFare: next200mOr1minFare,
            next200mOr1minDiscountCount: 0,
            next200mOr1minDiscountFare: next200mOr1minDiscountFare,
            extraFare: extraFare
        }
    }

    if (kilometers <= 2.0) {
        return {
            first2kmCount: 1,
            first2kmFare: first2kmFare,
            next200mOr1minCount: 0,
            next200mOr1minFare: next200mOr1minFare,
            next200mOr1minDiscountCount: 0,
            next200mOr1minDiscountFare: next200mOr1minDiscountFare,
            extraFare: extraFare
        }
    }

    const kmIncrCount = Math.floor((kilometers - 2) * 5)
    const minutesIncrCount = Math.floor(minutes)
    const fareIncrCount = kmIncrCount
        + minutesIncrCount
        + (kmIncrCount*5 < kilometers || minutesIncrCount < minutes ? 1 : 0)

    const maxFareIncrCountWithoutDiscount = Math.floor((discountFareThreshold - first2kmFare) / next200mOr1minFare)

    if (fareIncrCount <= maxFareIncrCountWithoutDiscount) {
        return {
            first2kmCount: 1,
            first2kmFare: first2kmFare,
            next200mOr1minCount: fareIncrCount,
            next200mOr1minFare: next200mOr1minFare,
            next200mOr1minDiscountCount: 0,
            next200mOr1minDiscountFare: next200mOr1minDiscountFare,
            extraFare: extraFare
        }
    }

    return {
        first2kmCount: 1,
        first2kmFare: first2kmFare,
        next200mOr1minCount: maxFareIncrCountWithoutDiscount,
        next200mOr1minFare: next200mOr1minFare,
        next200mOr1minDiscountCount: fareIncrCount - maxFareIncrCountWithoutDiscount,
        next200mOr1minDiscountFare: next200mOr1minDiscountFare,
        extraFare: extraFare
    }
}
