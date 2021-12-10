'use strict';

const fs = require('fs').promises;

async function init() {
    const coordinatesFile = await fs.readFile('./assets/day5-sample', 'utf8');
    const coordinates = coordinatesFile.split('\n').filter(Boolean).map((line) => line.split(/\s*->\s*/).map((value) => value.split(',').map(Number)));

    const xSize = Math.max(...coordinates.flatMap((coordinate) => [coordinate[0][0], coordinate[1][0]]));
    const ySize = Math.max(...coordinates.flatMap((coordinate) => [coordinate[0][1], coordinate[1][1]]));

    const map = Array.from({ length: xSize + 1 }, () => Array.from({ length: ySize + 1 }, () => 0));

    // coordinates.filter((coordinate) => coordinate[0][0] === coordinate[1][0] || coordinate[0][1] === coordinate[1][1]).forEach((coordinate) => { // part 1
    coordinates.forEach((coordinate) => {
	const xStart = coordinate[0][0];
	const xEnd = coordinate[1][0];

	const yStart = coordinate[0][1];
	const yEnd = coordinate[1][1];

	const xDistance = Math.abs(xEnd - xStart);
	const yDistance = Math.abs(yEnd - yStart);

	if (xDistance >= yDistance) {
	    for (let x = 0; x <= xDistance; x += 1) {
		const progress = x / xDistance;
		const y = Math.round(yStart + ((yEnd - yStart) * progress));

		map[y][xEnd > xStart ? xStart + x : xStart - x] += 1;
	    }
	}

	if (xDistance < yDistance) {
	    for (let y = 0; y <= yDistance; y += 1) {
		const progress = y / yDistance;
		const x = Math.round(xStart + ((xEnd - xStart) * progress));

		map[yEnd > yStart ? yStart + y : yStart - y][x] += 1;
	    }
	}
    });

    const graphicalMap = map.map((row) => row.map((value) => value === 0 ? '.' : value).join(' ')).join('\n');
    const overlaps = map.flat().filter((point) => point >= 2).length;

    console.log(graphicalMap, overlaps);
}

init();
