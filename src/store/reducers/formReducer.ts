import { FormProps } from "../../components/Form";

const initialState: FormProps = {
    kilometers: 0,
    minutes: 0,
    extraFare: 0,
}

type Action = { type: "SET"; payload: { field: keyof FormProps; value: number } }

const formReducer = (state = initialState, action: Action): FormProps => {
    switch (action.type) {
        case "SET":
            const value = isNaN(action.payload.value) ? 0 : action.payload.value
            return {
                ...state,
                [action.payload.field]: value,
            }

        default:
            return state
    }
}

export default formReducer