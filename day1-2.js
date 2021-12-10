'use strict';

const fs = require('fs').promises;

async function init() {
    const depthInput = await fs.readFile('./assets/day1-input', 'utf8');
    const depths = depthInput.split('\n').filter(Boolean).map(Number);

    const depthSums = depths.map((value, index) => value + depths[index + 1] + depths[index + 2]).filter((sum) => !Number.isNaN(sum));

    const { increases } = depthSums.reduce((acc, depth) => {
	console.log(acc.previous, depth, depth > acc.previous, acc.increases);

	if (acc.previous && depth > acc.previous) {
	    acc.increases += 1;
	}

	acc.previous = depth;

	return acc;
    }, { increases: 0 });

    console.log(increases);
}

init();
