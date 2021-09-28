import { GET_BOOKS, ERROR } from "../actions/types";

const initialState = {
	books: [],
	error: false,
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_BOOKS:
			return {
				...state,
				books: action.payload,
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
