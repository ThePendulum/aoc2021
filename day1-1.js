'use strict';

const fs = require('fs').promises;

async function init() {
    const depthInput = await fs.readFile('./assets/day1-input', 'utf8');
    const depths = depthInput.split('\n').filter(Boolean).map(Number);

    const { increases } = depths.reduce((acc, depth) => {
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
