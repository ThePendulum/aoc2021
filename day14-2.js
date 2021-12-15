'use strict';

const fs = require('fs').promises;

async function init() {
    const manualFile = await fs.readFile('./assets/day14-input', 'utf8');
    const manual = manualFile.split('\n').filter(Boolean); // .map(Number);

    const sourceTemplate = manual.at(0).split('');
    const sourcePairs = sourceTemplate.reduce((acc, element, index) => (sourceTemplate[index + 1] ? { ...acc, [`${element}${sourceTemplate[index + 1]}`]: 1 } : acc), {});
    const rules = Object.fromEntries(manual.slice(1).map((rule) => rule.split(/\s*->\s*/)));

    const pairs = sourcePairs;

    function step(maxSteps, steps) {
	Object.entries(pairs).forEach(([pair, count], index) => {
	    if (pairs[pair] > 0) {
		pairs[pair] -= count;
	    }

	    const pairLeft = pair.length > 1 && `${pair.charAt(0)}${rules[pair]}`;
	    const pairRight = pair.length > 1 && `${rules[pair]}${pair.charAt(1)}`;

	    if (pairLeft) {
		pairs[pairLeft] = (pairs[pairLeft] || 0) + count;
	    }

	    if (pairRight) {
		pairs[pairRight] = (pairs[pairRight] || 0) + count;
	    }
	})

	if (steps < maxSteps) {
	    step(maxSteps, steps + 1);
	}
    }

    console.time('duration');

    step(40, 1);

    const countEntries = Object.entries(pairs);

    const length = countEntries.reduce((acc, [pair, count]) => acc + count, 0);
    const elements = countEntries.reduce((acc, [pair, count], index, array) => ({ ...acc, [pair.charAt(1)]: (acc[pair.charAt(1)] || 0) + count }), {});

    const mostCommon = Object.entries(elements).reduce((acc, [element, count]) => (!acc || count > acc[1] ? [element, count] : acc), null);
    const leastCommon = Object.entries(elements).reduce((acc, [element, count]) => (!acc || count < acc[1] ? [element, count] : acc), null);

    console.log(pairs);
    console.log(elements);
    console.log('length', length);
    console.log('sum', mostCommon[1] - leastCommon[1]);
    console.timeEnd('duration');
}

init();
