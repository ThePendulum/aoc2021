'use strict';

const fs = require('fs').promises;

async function init() {
    const instructionFile = await fs.readFile('./assets/day2-input', 'utf8');
    const instructions = instructionFile.split('\n').filter(Boolean);

    const pos = [0, 0]; // distance, depth

    instructions.forEach((instruction) => {
	const [direction, valueString] = instruction.split(' ');
	const value = Number(valueString);

	if (direction === 'forward') {
	    pos[0] += value;
	}

	if (direction === 'down') {
	    pos[1] += value;
	}

	if (direction === 'up') {
	    pos[1] -= value;
	}
    });

    console.log(pos, pos[0] * pos[1]);
}

init();
