import { combineReducers } from "redux";
import formReducer from "./formReducer";
import fareRuleReducer from "./fareRuleReducer";
import tabReducer from "./tabReducer";


const rootReducer = combineReducers({
    form: formReducer,
    fareRule: fareRuleReducer,
    tab: tabReducer,
})

export default rootReducer