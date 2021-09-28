import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
	book: bookReducer,
	admin: authReducer,
	projects: projectReducer,
});
