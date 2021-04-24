const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
var stringSimilarity = require("string-similarity");

const { editCorpus, costFunction } = require("./utils");

const app = express();

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
	const data = fs.readFileSync("hemingway.txt", "utf8");
	const dataList = data.split(" ");
	res.send(dataList);
});

app.post("/create", (req, res) => {
	const { word } = req.body;
	fs.appendFile("hemingway.txt", ` ${word}`, (err) => {
		if (err) {
			console.log(`Error in post request: ${err}`);
			res.status(500).send(err);
		} else {
			return res.send("Success");
		}
	});
});

app.delete("/delete", (req, res) => {
	const { word } = req.body;
	console.log(`word: ${word}`);
	console.log(`req.body: ${JSON.stringify(req.body, null, 2)}`);
	const wordDeleted = editCorpus(word);
	if (wordDeleted) {
		res.send({ msg: "Success!" });
	} else {
		res.send({ error: "Word not found in corpus." });
	}
});

app.post("/search", (req, res) => {
	const { word, homebrew } = req.body;
	let data = fs.readFileSync("hemingway.txt", "utf8");
	//const regexRemove = new RegExp(``)
	data = data.replace(/\r\n/g, " ");
	let dataList = data.split(" ");
	dataList = dataList
		.map((item) => item.replace(".", ""))
		.map((item) => item.replace(",", ""))
		.map((item) => item.replace('"', ""));

	let unique = [...new Set(dataList)];
	//const returnVal = {};
	const returnList = [];
	for (let i = 0; i < 3; i++) {
		let bestMatch;
		if (homebrew) {
			bestMatch = unique.reduce((a, b) => {
				return costFunction(a, word) > costFunction(b, word) ? a : b;
			});
		} else {
			bestMatch = unique.reduce((a, b) => {
				return stringSimilarity.compareTwoStrings(a, word) >
					stringSimilarity.compareTwoStrings(b, word)
					? a
					: b;
			});
		}
		returnList.push(bestMatch);
		unique = unique.filter((word) => word !== bestMatch);
	}
	res.send(returnList);
	//res.json(['one', 'two', 'three']);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
