import {
	ADD_PROJECT,
	GET_PROJECT,
	GET_PROJECTS,
	ERROR,
	DELETE_PROJECT,
} from "../actions/types";

const initialState = {
	projects: [],
	error: false,
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_PROJECTS:
			return {
				...state,
				projects: action.projects,
				error: action.error,
			};
		case DELETE_PROJECT:
			return {
				...state,
				error: action.error,
			};
		case ERROR:
			return {
				...state,
				error: action.error,
			};
		default:
			return state;
	}
}
