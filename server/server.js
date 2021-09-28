const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const book = require("./routes/api/book");
const auth = require("./routes/api/auth");

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.options("*", cors()); // include before other routes

app.use(book);
app.use(auth);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`app listening on port http://localhost:${PORT}`);
});
