'use strict';

const fs = require('fs').promises;

const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
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

    const score = {
	')': 0,
	']': 0,
	'}': 0,
	'>': 0,
    };

    syntax.forEach((line, lineIndex) => {
	const open = [];
	let found = false;

	line.forEach((char) => {
	    if (found) {
		return;
	    }

	    if (openChars[char]) {
		open.push(char);
	    }

	    if (closeChars[char]) {
		const opening = open.pop(char);

		if (opening !== closeChars[char]) {
		    console.log(lineIndex, opening, char, line.join(''));

		    score[char] += points[char];
		    found = true;
		}
	    }
	});
    });

    const total = Object.values(score).reduce((acc, points) => acc + points, 0);

    console.log(score);
    console.log(total);
}

init();
