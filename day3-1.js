'use strict';

const fs = require('fs').promises;

async function init() {
    const codeInput = await fs.readFile('./assets/day3-input', 'utf8');
    const codes = codeInput.split('\n').filter(Boolean);

    const counts = codes.reduce((acc, code) => {
	code.split('').forEach((value, index) => {
	    if (!acc[index]) {
		acc[index] = [0, 0];
	    }

	    acc[index][value] += 1;
	});

	return acc;
    }, []);

    const gammaRate = parseInt(counts.map((value) => value[0] > value[1] ? 0 : 1).join(''), 2);
    const epsilonRate = parseInt(counts.map((value) => value[0] < value[1] ? 0 : 1).join(''), 2);

    console.log(gammaRate, epsilonRate, gammaRate * epsilonRate);
}

init();
