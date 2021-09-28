import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

import app from "../config/firebase";

const initialState = {};

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(reduxPromise))
);
export default store;
