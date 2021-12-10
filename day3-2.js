'use strict';

const fs = require('fs').promises;

async function init() {
    const codeInput = await fs.readFile('./assets/day3-input', 'utf8');
    const codes = codeInput.split('\n').filter(Boolean).map((code) => code.split(''));

    function findRating(accCodes, index, mostCommon) {
	const counts = accCodes.reduce((acc, code) => {
	    code.forEach((value, index) => {
		if (!acc[index]) {
		    acc[index] = [0, 0];
		}

		acc[index][value] += 1;
	    });

	    return acc;
	}, []);

	const common = mostCommon
	    ? counts.map((value) => value[0] > value[1] ? '0' : '1')
	    : counts.map((value) => value[0] <= value[1] ? '0' : '1');

	const filteredCodes = accCodes.filter((code) => {
	    return code[index] === common[index];
	});

	if (filteredCodes.length > 1 && common[index + 1]) {
	    return findRating(filteredCodes, index + 1, mostCommon);
	}

	return filteredCodes[0].join('');
    }

    const oxygenRating = parseInt(findRating(codes, 0, true), 2);
    const co2Rating = parseInt(findRating(codes, 0, false), 2);

    const lifeSupportRating = oxygenRating * co2Rating;

    console.log(oxygenRating, co2Rating, lifeSupportRating);
}

init();
