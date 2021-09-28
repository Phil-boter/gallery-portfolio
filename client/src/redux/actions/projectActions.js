import { GET_PROJECTS, DELETE_PROJECT, ERROR } from "./types";

import {
	getFirestore,
	collection,
	query,
	getDocs,
	deleteDoc,
	doc,
	where,
} from "firebase/firestore";
const db = getFirestore();

export async function getProjects() {
	console.log("action getProjects");
	try {
		let projects = [];
		const q = query(collection(db, "projects"));
		const querySnapshot = await getDocs(q);
		await querySnapshot.forEach((doc, index) => {
			const data = doc.data();
			projects.push(data);
		});
		return { type: GET_PROJECTS, projects: projects, error: false };
	} catch (error) {
		return {
			type: ERROR,
			error: true,
		};
	}
}

export async function deleteProject(id) {
	console.log("action delete project", id);
	try {
		await deleteDoc(doc(db, "projects", id));
		return {
			type: DELETE_PROJECT,
			error: false,
		};
	} catch (error) {
		console.log("error", error);
		return {
			type: ERROR,
			error: true,
		};
	}
}

// export async function getSingleProject(projectId) {
// 	// console.log("action getProjects", projectId);
// 	try {

//         const docRef = doc(db, "cities", "SF");
// 		const docSnap = await getDoc(docRef);

// 		if (docSnap.exists()) {
// 			console.log("Document data:", docSnap.data());
// 		} else {
// 			// doc.data() will be undefined in this case
// 			console.log("No such document!");
// 		}
// 	} catch (err) {
// 		console.log("no singleProject");
// 	}
// }
