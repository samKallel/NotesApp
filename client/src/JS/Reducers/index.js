import { combineReducers } from "redux";

import userReducer from "./user";
import notesReducer from "./notes";

const rootReducer = combineReducers({ userReducer, notesReducer });

export default rootReducer;
