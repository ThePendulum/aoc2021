'use strict';

const fs = require('fs').promises;

async function init() {
    const heightInput = await fs.readFile('./assets/day9-input', 'utf8');
    const heights = heightInput.split('\n').filter(Boolean).map((row) => row.split('').map(Number)); // .map(Number);
    const basins = Array.from({ length: heights.length }, () => Array.from({ length: heights[0].length }, () => null));

    let basinCount = 1;

    heights.forEach((row, rowIndex) => {
	const rowBasins = Array.from(row.join('').matchAll(/[0-8]+/g));

	rowBasins.forEach((rowBasinMatch) => {
	    const start = rowBasinMatch.index;
	    const end = rowBasinMatch.index + rowBasinMatch[0].length;

	    const rowBasin = row.slice(start, end);

	    const existingBasins = basins[rowIndex - 1]?.slice(start, end).filter((basin) => basin !== null);
	    const existingBasin = existingBasins?.[0];

	    const newBasin = existingBasin || basinCount++;
	    const oldBasins = new Set(existingBasins);

	    if (oldBasins.size > 1) {
		// find separate basins that merge on this row, and update their basin ID
		for (let replaceRowIndex = 0; replaceRowIndex < rowIndex; replaceRowIndex += 1) {
		    basins[replaceRowIndex].forEach((replaceBasin, replaceBasinIndex) => {
			if (oldBasins.has(replaceBasin)) {
			    basins[replaceRowIndex][replaceBasinIndex] = newBasin;
			}
		    });
		}
	    }

	    rowBasin.forEach((height, index) => {
		basins[rowIndex][index + start] = newBasin;
	    });
	});
    });

    const basinSizes = basins.reduce((acc, row) => {
	row.forEach((basin) => {
	    if (basin) {
		acc[basin] = (acc[basin] || 0) + 1;
	    }
	});

	return acc;
    }, {});

    const sortedBasinSizes = Object.values(basinSizes).sort((sizeA, sizeB) => sizeB - sizeA);
    const largestBasinsTotal = sortedBasinSizes.slice(0, 3).reduce((acc, size) => acc * size, 1);

    const basinGraph = basins.map((row) => row.map((basin) => basin === null ? '...' : String(basin).padStart(3, '|')).join('')).join('\n');

    console.log(basinGraph);
    console.log(sortedBasinSizes);
    console.log(largestBasinsTotal);
}

init();
