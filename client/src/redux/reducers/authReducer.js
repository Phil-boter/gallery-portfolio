import {
	GET_ADMIN,
	ADD_ADMIN,
	DELETE_ADMIN,
	POST_LOGIN,
	ERROR,
	GET_ALL_ADMINS,
} from "../actions/types";

const initialState = {
	admin: {},
	allAdmins: [],
	isLoggedIn: false,
	error: false,
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case POST_LOGIN:
			return {
				...state,
				admin: action.admin,
				isLoggedIn: action.isLoggedIn,
				error: action.error,
			};

		case GET_ADMIN:
			return {
				...state,
				admin: action.admin,
				error: action.error,
			};

		case ADD_ADMIN:
			return {
				...state,
				admin: action.admin,
				error: action.error,
			};
		case GET_ALL_ADMINS:
			return {
				...state,
				allAdmins: action.admins,
				error: action.error,
			};
		case DELETE_ADMIN:
			return {
				...state,
				allAdmins: [...state.allAdmins],
				error: false,
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
