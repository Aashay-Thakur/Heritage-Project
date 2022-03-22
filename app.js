const path = require("path");
const serviceAccountKey = require("./serviceAccountKey.json");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");

initializeApp({
	credential: cert(serviceAccountKey),
});

const db = getFirestore();

const express = require("express");
const app = express();

// Root path
const rootPath = path.join(__dirname, "dist");

// listen on port 3000
app.listen(3000, () => {
	console.log("listening => http://localhost:3000");
});

// Routing
app.get("/", function (req, res) {
	res.sendFile("views/index.html", { root: rootPath });
});

app.get("/location", function (req, res) {
	res.sendFile("views/location.html", { root: rootPath });
});

// Static files
app.use(express.static("dist/static"));
