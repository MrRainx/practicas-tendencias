import { combineReducers } from "redux";
import Firebase from "./Firebase/reducer";
import DOM from "./DOM/reducer";

export default combineReducers({
    Firebase,
    DOM
})

