'use strict';

const fs = require('fs').promises;

async function init() {
    const manualFile = await fs.readFile('./assets/day14-input', 'utf8');
    const manual = manualFile.split('\n').filter(Boolean); // .map(Number);

    const sourceTemplate = manual.at(0).split('');
    const sourcePairs = sourceTemplate.reduce((acc, element, index) => (sourceTemplate[index + 1] ? { ...acc, [`${element}${sourceTemplate[index + 1]}`]: 1 } : acc), {});
    const rules = Object.fromEntries(manual.slice(1).map((rule) => rule.split(/\s*->\s*/)));

    const pairs = {};

    function step(prevPairs, maxSteps, steps) {
	const stepPairs = {};

	Object.entries(prevPairs).forEach(([pair, count], index) => {
	    if (pairs[pair] > 0) {
		pairs[pair] -= count;
	    }

	    const pairLeft = pair.length > 1 && `${pair.slice(0, 1)}${rules[pair]}`;
	    const pairRight = pair.length > 1 && `${rules[pair]}${pair.slice(1)}`;

	    if (pairLeft) {
		pairs[pairLeft] = (pairs[pairLeft] || 0) + count;
		stepPairs[pairLeft] = (stepPairs[pairLeft] || 0) + count;
	    }

	    if (pairRight) {
		pairs[pairRight] = (pairs[pairRight] || 0) + count;
		stepPairs[pairRight] = (stepPairs[pairRight] || 0) + count;
	    }
	})

	if (steps < maxSteps) {
	    step(stepPairs, maxSteps, steps + 1);
	}
    }

    console.time('duration');

    step(sourcePairs, 40, 1);

    const countEntries = Object.entries(pairs);

    const total = countEntries.reduce((acc, [pair, count]) => acc + count, 0);
    const elements = countEntries.reduce((acc, [pair, count], index, array) => ({
	...acc,
	[pair.charAt(1)]: (acc[pair.charAt(1)] || 0) + count,
    }), {});

    const sortedElements = Object.entries(elements).reduce((acc, [element, count]) => {
	if (!acc.most || count > acc.most[1]) {
	    acc.most = [element, count];
	}

	if (!acc.least || count < acc.least[1]) {
	    acc.least = [element, count];
	}

	return acc;
    }, {
	most: null,
	least: null,
    });

    console.log(pairs);
    console.log(elements);
    console.log('length', total);
    console.log('sum', sortedElements.most[1] - sortedElements.least[1]);
    console.timeEnd('duration');
}

init();
