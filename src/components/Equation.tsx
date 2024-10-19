import React from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from "react-katex";


export interface EquationProps {
    first2kmCount: number
    first2kmFare: number
    next200mOr1minCount: number
    next200mOr1minFare: number
    next200mOr1minDiscountCount: number
    next200mOr1minDiscountFare: number
    extraFare: number
}

type EquationElement =
    | { type: "SINGLE_NUMBER", value: number }
    | { type: "MULIPLICATION", left: number, right: number }
    | { type: "ANSWER", value: number }

const getEquationElements = (props: EquationProps): EquationElement[] => {
    const elements: EquationElement[] = []
    let total = 0

    if (props.first2kmCount > 0) {
        const e: EquationElement = {
            type: "SINGLE_NUMBER",
            value: props.first2kmFare,
        }
        elements.push(e)
        total += e.value
    }

    if (props.next200mOr1minCount > 0) {
        const e: EquationElement = {
            type: "MULIPLICATION",
            left: props.next200mOr1minCount,
            right: props.next200mOr1minFare,
        }
        elements.push(e)
        total += e.left * e.right
    }

    if (props.next200mOr1minDiscountCount > 0) {
        const e: EquationElement = {
            type: "MULIPLICATION",
            left: props.next200mOr1minDiscountCount,
            right: props.next200mOr1minDiscountFare,
        }
        elements.push(e)
        total += e.left * e.right
    }

    if (props.extraFare > 0) {
        const e: EquationElement = {
            type: "SINGLE_NUMBER",
            value: props.extraFare,
        }
        elements.push(e)
        total += e.value
    }

    // round the total fare
    total = Math.round(100 * total) / 100
    elements.push({
        type: "ANSWER",
        value: total
    })

    return elements
}

const getLatexMath = (elements: EquationElement[]): string => {
    return elements.reduce((latex, element, index) => {
        if (index > 0 && element.type != "ANSWER") {
            latex += "+"
        }

        switch (element.type) {
            case "SINGLE_NUMBER":
                latex += ` ${element.value} `
                break
            case "MULIPLICATION":
                latex += ` (${element.left} \\times ${element.right})`
                break
            case "ANSWER":
                latex += ` = ${element.value}`
                break
        }

        return latex
    }, "")
}

export const Equation: React.FC<EquationProps> = (props: EquationProps) => {
    const elements = getEquationElements(props)
    const latex = getLatexMath(elements)

    return (
        <div>
            <BlockMath math={latex} />
        </div>
    )
}