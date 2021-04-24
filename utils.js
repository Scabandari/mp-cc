const fs = require("fs");

const editCorpus = (word) => {
	let data = fs.readFileSync("hemingway.txt", "utf-8");
	data = data.replace(/[^a-zA-Z 0-9]+/g, " ");
	const reg = new RegExp("(^|\\s)" + word + "(?=\\s|$)", "g");
	if (reg.test(data)) {
		const newData = data.replace(reg, "");
		fs.writeFileSync("hemingway.txt", newData, "utf-8");
		return true;
	} else {
		return false;
	}
};

const costFunction = (firstWord, secondWord) => {
	let score = 0;
	if (firstWord.length === secondWord.length) {
		score += 50;
	} else {
		const diff = Math.abs(firstWord.length - secondWord.length);
		score -= diff * 5;
	}
	let firstLetters = [...new Set(firstWord.split(""))].sort();
	let secondLetters = [...new Set(secondWord.split(""))].sort();
	let larger = Math.max(firstLetters.length, secondLetters.length);
	for (let i = 0; i < larger; i++) {
		try {
			if (firstLetters[i] === secondLetters[i]) {
				score += 20;
			} else {
				score -= 10;
			}
		} catch (err) {
			score -= 10;
		}
	}
	firstLetters = firstWord.split("");
	secondLetters = secondWord.split("");
	larger = Math.max(firstLetters.length, secondLetters.length);
	for (let i = 0; i < larger; i++) {
		try {
			if (firstLetters[i] === secondLetters[i]) {
				score += 30;
			} else {
				score -= 10;
			}
		} catch (err) {
			score -= 10;
		}
	}

	return score;
};

module.exports = { editCorpus, costFunction };
