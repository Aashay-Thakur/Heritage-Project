const path = require("path");

const express = require("express");
const app = express();

// Root path
const rootPath = path.join(__dirname, "dist");

// Register View Engine
app.set("view engine", "ejs");
app.set("views", { root: rootPath });

// listen on port 3000
app.listen(3000, () => {
	console.log("listening => http://localhost:3000");
});

// Routing
app.get("/", function (req, res) {
	res.sendFile("views/index.html", { root: rootPath });
});
