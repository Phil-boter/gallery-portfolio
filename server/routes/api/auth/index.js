const express = require("express");
const { copyFileSync } = require("fs");
const router = express.Router();
const uuid = require("uuid");

const admin = require("../../../config/index");

//___________________ registration___________________

router.post("/api/createUser", async (req, res) => {
	console.log("req.body", req.body);
	const { email, password, lastName, firstName } = req.body;
	try {
		const user = await admin.auth().createUser({
			email,
			password,
			firstName,
			lastName,
		});

		admin
			.firestore()
			.collection("users")
			.doc(user.uid)
			.set({
				userId: user.uid,
				email: email,
				lastName: lastName,
				firstName: firstName,
				date: admin.firestore.Timestamp.fromDate(new Date()),
			});
		return res.send(user);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
});

router.post("/api/deleteAdmin", async (req, res) => {
	console.log("req.body", req.body);
	const { id } = req.body;
	console.log("uid", id);
	try {
		await admin
			.auth()
			.deleteUser(id)
			.then(() => {
				admin.firestore().collection("users").doc(id).delete();
				console.log("delete success________");
				return res.status(200).send();
			});
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
});

router.get("/api/getAllAdmins", async (req, res) => {
	console.log("get all admins");
	try {
		admin
			.auth()
			.getUsers([])
			.then((getUsersResult) => {
				console.log("Successfully fetched user data:");
				console.log(getUsersResult);
				getUsersResult.users.map((user) => {
					console.log(user);
				});

				console.log(
					"Unable to find users corresponding to these identifiers:"
				);
				getUsersResult.notFound.forEach((userIdentifier) => {
					console.log(userIdentifier);
				});
			});
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
});

module.exports = router;
