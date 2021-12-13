'use strict';

const fs = require('fs').promises;

async function init() {
    const octosFile = await fs.readFile('./assets/day11-sample', 'utf8');
    const octos = octosFile.split('\n').filter(Boolean).map((row) => row.split('').map(Number));

    let totalFlashes = 0;
    let steps = 1;
    const progress = octos.slice();

    function render() {
	console.log(progress.map((row) => row.map((octo) => String(octo === 0 ? `\x1b[31m${octo}\x1b[0m` : octo).padEnd(octo === 0 ? 12 : 3, ' ')).join('')).join('\n'), '\n');
    }

    function run(maxSteps, untilSync) {
	render();

	function flash() {
	    let stepFlashes = 0;

	    progress.forEach((row, rowIndex) => row.forEach((octo, octoIndex) => {
		if (octo === 10) {
		    stepFlashes += 1;
		    totalFlashes += 1;

		    for (let y = rowIndex - 1; y < rowIndex + 2; y += 1) {
			for (let x = octoIndex - 1; x < octoIndex + 2; x += 1) {
			    // only bump existing points, and don't bump neighbours beyond 10 as that will mark them as flashed too early
			    if (typeof progress[y]?.[x] !== 'undefined' && (progress[y][x] < 10 || (y === rowIndex && x === octoIndex))) {
				progress[y][x] = progress[y][x] + 1;
			    }
			}
		    }
		}
	    }));

	    if (stepFlashes > 0) {
		flash();
	    }
	}

	progress.forEach((row, rowIndex) => row.forEach((octo, octoIndex) => {
	    progress[rowIndex][octoIndex] += 1;
	}));

	flash();

	progress.forEach((row, rowIndex) => row.forEach((octo, octoIndex) => {
	    if (octo >= 10) {
		progress[rowIndex][octoIndex] = 0;
	    }
	}));

	if (untilSync && new Set(progress.flat()).size === 1) {
	    return;
	}

	if (steps < maxSteps) {
	    steps += 1;
	    run(maxSteps, untilSync);
	}
    }

    // run(100, false); // part 1
    run(1000, true);
    render();

    console.log('steps', steps);
    console.log('flashes', totalFlashes);
}

init();
