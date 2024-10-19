import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { breakdown } from "../func/breakdown";
import { Equation } from "./Equation";


export interface FareRule {
    first2kmFare: number
    next200mOr1minFare: number
    next200mOr1minDiscountFare: number
    discountFareThreshold: number
}

export type FareRuleProps = {
    status: "loading" | "error"
    message: string
} | {
    status: "success"
    asOfDate: string
    urban: FareRule
    newTerritories: FareRule
    lantau: FareRule
}

export const Fare: React.FC = () => {
    // Fare is a consumer of formState
    const formState = useSelector((state: RootState) => state.form)
    const fareRuleState = useSelector((state: RootState) => state.fareRule)
    
    if (formState.kilometers === 0) {
        return (
            <div className="max-w-2xl mx-auto p-6 justify-center">
                <p>
                    Adjust the {
                        formState.minutes !== 0 || formState.extraFare !== 0 ? (
                            <b>Paid Kilometer</b>
                        ) : <>inputs</>
                    } to see the fare breakdown.
                </p>
                <p>
                    If you have a receipt of your taxi trip, you can enter them in the above.
                </p>
            </div>
        )
    }

    if (fareRuleState.status === "success") {
        const urbanEquationProps = breakdown(formState, fareRuleState.urban)
        const ntEquationProps = breakdown(formState, fareRuleState.newTerritories)
        const lantauEquationProps = breakdown(formState, fareRuleState.lantau)
        return (
            <div className="max-w-2xl mx-auto p-6 justify-center">
                <div className="mb-[5px]">
                    Below are the taxi fare breakdowns for Urban, New Territories and Lantau Taxi respectively.
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-md w-full mx-auto mb-[5px]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Urban Taxi</h2>
                    <Equation {...urbanEquationProps}/>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-md w-full mx-auto mb-[5px]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">New Territories Taxi</h2>
                    <Equation {...ntEquationProps}/>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-md w-full mx-auto mb-[5px]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Lantau Taxi</h2>
                    <Equation {...lantauEquationProps}/>
                </div>
            </div>
        )
    }

    return null
}