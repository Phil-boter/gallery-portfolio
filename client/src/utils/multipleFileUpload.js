import { getAuth } from "firebase/auth";
import {
	addDoc,
	getFirestore,
	serverTimestamp,
	collection,
	updateDoc,
	doc,
} from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
const storage = getStorage();
// const auth = getAuth();
const db = getFirestore();
let projectImages = [];
let storageRef = ref(storage);

export default function multipleFileUpload(
	e,
	files,
	description,
	title,
	mainImage
) {
	e.preventDefault(); // prevent page refreshing

	const promises = [];
	// pushes the mainImage file to the other files
	// after upload the mainImage Url will be separated again
	files.push(mainImage);

	files.forEach((file) => {
		console.log("file", file.name);
		storageRef = ref(storage, "images/" + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);
		promises.push(uploadTask);

		uploadTask.on(
			`state_changed`,
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						// console.log("Upload is paused");
						break;
					case "running":
						// console.log("Upload is running");

						break;
					default:
						console.log("My wisdom is not endless");
				}
			},
			(error) => {
				// Handle unsuccessful uploads
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						break;
					case "storage/canceled":
						// User canceled the upload
						break;
					case "storage/unknown":
						// Unknown error occurred, inspect error.serverResponse
						break;
					default:
						return;
				}
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...

				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					projectImages.push(downloadURL);
				});
			}
		);
	});

	Promise.allSettled(promises)
		.then((promises) => {
			console.log("project", promises.length);
			setTimeout(() => {
				console.log("run success");
				// search for the mainImageUrl and cuts it off
				// from the projectImages array
				let mainImageUrl = "";
				projectImages.forEach((url, index) => {
					const isMain = url.includes(`${mainImage.name}`);
					if (isMain === true) {
						mainImageUrl = url;
						projectImages.splice(index, 1);
					}
				});
				// filters duplicated urls
				let url = projectImages.slice().filter((c, index) => {
					return projectImages.indexOf(c) === index;
				});
				// const id = "id" + Math.random().toString(16).slice(2);

				addDoc(collection(db, "projects"), {
					title: title,
					mainImage: mainImageUrl,
					description: description,
					downloadURL: url,
					date: serverTimestamp(),
				})
					.then((docRef) => {
						// upadting document with Id that eqausl document id from firebase
						var updateRef = doc(db, "projects", docRef.id);
						updateDoc(updateRef, { id: docRef.id });
					})
					.then(() => {
						console.log("document updated");
					})
					.catch((error) => {
						console.log(error);
					});
				projectImages = [];
				mainImageUrl = "";
				description = "";
				title = "";
				url = "";

				alert("upload was successfull");
			}, promises.length * 200);
		})
		.catch((error) => {
			console.log(error);
		});
}
