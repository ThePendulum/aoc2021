'use strict';

const fs = require('fs').promises;

async function init() {
    const heightInput = await fs.readFile('./assets/day9-input', 'utf8');
    const heights = heightInput.split('\n').filter(Boolean).map((row) => row.split('').map(Number)); // .map(Number);

    const lows = heights.reduce((acc, row, rowIndex) => {
	row.forEach((height, index) => {
	    if ((row[index - 1] === undefined || row[index - 1] > height)
		&& (row[index + 1] === undefined || row[index + 1] > height)
		&& (heights[rowIndex - 1] === undefined || heights[rowIndex - 1][index] > height)
		&& (heights[rowIndex + 1] === undefined || heights[rowIndex + 1][index] > height)) {
		acc.push(height);
	    }
	});

	return acc;
    }, []);

    const risks = lows.map((height) => 1 + height);
    const sum = risks.reduce((acc, risk) => acc + risk, 0);

    console.log(lows);
    console.log(risks);
    console.log(sum);
}

init();
