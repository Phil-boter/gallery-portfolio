import axios from "axios";

import {
	GET_ADMIN,
	ADD_ADMIN,
	DELETE_ADMIN,
	POST_LOGIN,
	GET_ALL_ADMINS,
	ERROR,
} from "./types";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
	doc,
	getDoc,
	getFirestore,
	getDocs,
	collection,
} from "firebase/firestore";
import { async } from "@firebase/util";
const db = getFirestore();

export async function login(email, password) {
	console.log(email, password);
	try {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password);
		const docRef = doc(db, "users", auth.currentUser.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			let admin = docSnap.data();
			console.log(admin);
			localStorage.setItem("admin", JSON.stringify(admin));
			return {
				type: POST_LOGIN,
				admin: admin,
				isLoggedIn: true,
				error: false,
			};
		} else {
			// doc.data() will be undefined in this case
			return {
				type: ERROR,
				error: true,
			};
		}
	} catch (err) {
		return {
			type: ERROR,
			error: true,
		};
	}
}

export async function getAdmindata() {
	const local = JSON.parse(localStorage.getItem("admin"));

	try {
		const auth = getAuth();
		const docRef = doc(db, "users", auth.currentUser.uid || local.userId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			let admin = docSnap.data();
			localStorage.setItem("admin", JSON.stringify(admin));
			return {
				type: GET_ADMIN,
				admin: admin,
				error: false,
			};
		} else {
			// doc.data() will be undefined in this case
			return {
				type: ERROR,
				error: true,
			};
		}
	} catch (err) {
		return {
			type: ERROR,
			error: true,
		};
	}
}
export async function addAdmin(first, last, email, password) {
	try {
		const res = await axios.post("/api/createUser", {
			firstName: first,
			lastName: last,
			email: email,
			password: password,
		});

		if (res.status === 200) {
			console.log("___________new admin___________");
			return {
				type: ADD_ADMIN,
				error: false,
			};
		} else {
			return {
				type: ERROR,
				error: true,
			};
		}
	} catch (error) {
		return {
			type: ERROR,
			error: true,
		};
	}
}
export async function getAllAdmins() {
	try {
		const admins = [];
		const querySnapshot = await getDocs(collection(db, "users"));
		await querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			admins.push(doc.data());
		});
		return {
			type: GET_ALL_ADMINS,
			admins: admins,
			error: false,
		};
	} catch (error) {
		console.log(error);
		return {
			type: ERROR,
			error: true,
		};
	}
}

export async function deleteAdmin(id) {
	try {
		console.log("delete");
		const res = await axios.post("/api/deleteAdmin", { id });
		console.log("res", res);
		if (res.status === 200) {
			return {
				type: DELETE_ADMIN,
				error: false,
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
