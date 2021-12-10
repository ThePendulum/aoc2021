'use strict';

const fs = require('fs').promises;

const points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

const openChars = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};

const closeChars = Object.fromEntries(Object.entries(openChars).map(([open, close]) => [close, open]));

async function init() {
    const syntaxInput = await fs.readFile('./assets/day10-input', 'utf8');
    const syntax = syntaxInput.split('\n').filter(Boolean).map((line) => line.split('')); // .map(Number);

    const scores = syntax.map((line, lineIndex) => {
	const open = [];
	let corrupt = false;

	line.forEach((char) => {
	    if (corrupt) {
		return;
	    }

	    if (openChars[char]) {
		open.push(char);
	    }

	    if (closeChars[char]) {
		const opening = open.pop(char);

		if (opening !== closeChars[char]) {
		    corrupt = true;
		    return;
		}
	    }
	});

	if (corrupt) {
	    return;
	}

	const closing = open.map((char) => openChars[char]).reverse();
	const score = closing.reduce((acc, char) => (acc * 5) + points[char], 0);

	return score;
    }).filter(Boolean);

    const sortedScores = scores.sort((scoreA, scoreB) => scoreB - scoreA);
    const finalScore = sortedScores[Math.floor(sortedScores.length / 2)];

    console.log(sortedScores);
    console.log(finalScore);
}

init();
