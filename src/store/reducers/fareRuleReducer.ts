import { FareRuleProps } from "../../components/Fare";
import { parseHtml } from "../../func/parser";


const initialState: FareRuleProps = {
    status: "loading",
    message: "Loading..."
}

type Action = { type: "FETCH_DATA_REQUEST" }
    | { type: "FETCH_DATA_SUCCESS"; payload: { html: string } }
    | { type: "FETCH_DATA_ERROR"; error: string }

const fareRuleReducer = (state = initialState, action: Action): FareRuleProps => {
    switch (action.type) {
        case "FETCH_DATA_REQUEST":
            return {
                status: "loading",
                message: "Loading..."
            }
        case "FETCH_DATA_ERROR":
            return {
                status: "error",
                message: action.error
            }
        case "FETCH_DATA_SUCCESS":
            return parseHtml(action.payload.html)
        default:
            return state
    }
}

export default fareRuleReducer