import { TabId, TabProps } from "../../components/Tab";

const initialState: TabProps = {
    id: TabId.Home
}

type Action = { type: "SET_TAB"; payload: { id: TabId } }

const tabReducer = (state = initialState, action: Action): TabProps => {
    switch (action.type) {
        case "SET_TAB":
            return { id: action.payload.id }

        default:
            return state
    }
}

export default tabReducer