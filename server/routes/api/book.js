const express = require("express");
const { copyFileSync } = require("fs");
const router = express.Router();

const db = require("../../config/index");

// qroute GET api/book
// @desc GET All books
// @access Public

router.get("/api/books", async (req, res) => {
	try {
		const snapData = await db.firestore().collection("books").get();
		let books = snapData.docs.map((doc) => {
			const data = doc.data();
			const bookId = doc.id;
			return { bookId, ...data };
		});
		res.json({ books, success: true });
	} catch (error) {
		console.log(error);
		res.json({ success: false });
	}
});

// qroute GET api/book/:id
// @desc GET single books
// @access Public

router.get("/api/book/:id", async (req, res) => {
	const id = req.params.id;

	let snapSingleBook = db.firestore().collection("books").doc(id);
	snapSingleBook
		.get()
		.then((doc) => {
			if (doc.exists) {
				let singleBook = doc.data();
				res.json({ singleBook, success: true });
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
				res.json({ success: false });
			}
		})
		.catch((error) => {
			console.log(error);
			res.json({ success: false });
		});
});
// @route POST api/book
// @desc CREATE a book
// @access Public

router.post("/api/book", (req, res) => {
	const { name, image } = req.body;
	const bookData = new Object({
		name: name,
		image: image,
	});
	console.log(bookData);

	db.firestore()
		.collection("books")
		.add(bookData)
		.then(() => {
			console.log("NEW BOOK IN DATABASE");
			res.json({ success: true });
		})
		.catch((error) => {
			console.log(error);
			res.json({ success: false });
		});
});

// @route DELETE api/book/:id
// @desc DELETE an book
// @access Public
router.delete("/api/book/:id", (req, res) => {
	console.log("book id", req.params);
	const id = req.params.id;

	db.firestore()
		.collection("books")
		.doc(id)
		.delete()
		.then(() => {
			res.json({ success: true });
		})
		.catch((error) => {
			console.log(error);
			res.json({ success: false });
		});
});
module.exports = router;
