'use strict';

const fs = require('fs').promises;

async function init() {
    const instructionFile = await fs.readFile('./assets/day2-input', 'utf8');
    const instructions = instructionFile.split('\n').filter(Boolean);

    const pos = [0, 0]; // distance, depth
    let aim = 0;

    instructions.forEach((instruction) => {
	const [direction, valueString] = instruction.split(' ');
	const value = Number(valueString);

	if (direction === 'forward') {
	    pos[0] += value;
	    pos[1] += value * aim;
	}

	if (direction === 'down') {
	    aim += value;
	}

	if (direction === 'up') {
	    aim -= value;
	}
    });

    console.log(pos, pos[0] * pos[1]);
}

init();
