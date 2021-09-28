import axios from "axios";

import { GET_BOOKS, ERROR } from "./types";

export async function getBooks(dispatch) {
	try {
		const { data } = await axios.get("api/books");

		if (data) {
			return {
				type: GET_BOOKS,
				payload: data,
				error: false,
			};
		} else {
			console.log("error in get beers");
			return {
				type: ERROR,
				error: true,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			type: ERROR,
			error: true,
		};
	}
}
