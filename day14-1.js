'use strict';

const fs = require('fs').promises;

async function init() {
    const manualFile = await fs.readFile('./assets/day14-input', 'utf8');
    const manual = manualFile.split('\n').filter(Boolean); // .map(Number);

    const sourceTemplate = manual.at(0).split('');
    const rules = Object.fromEntries(manual.slice(1).map((rule) => rule.split(/\s*->\s*/)));

    function step(template, maxSteps, steps) {
	console.time(`step ${steps}`);

	const newTemplate = template.reduce((acc, element, index) => {
	    const pair = [element, template[index + 1]].join('');

	    if (pair.length < 2) {
		return acc.concat(element);
	    }

	    return acc.concat([element, rules[pair]]);
	}, [])

	console.timeEnd(`step ${steps}`);

	if (steps < maxSteps) {
	    return step(newTemplate, maxSteps, steps + 1);
	}

	return newTemplate;
    }

    console.time('duration');

    const output = step(sourceTemplate, 40, 1);
    const elements = output.reduce((acc, element) => ({ ...acc, [element]: (acc[element] || 0) + 1 }), {});

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

    console.log(rules);
    console.log(sourceTemplate.join(''));
    console.log(elements, sortedElements);
    console.log('length', output.length);
    console.log('sum', sortedElements.most[1] - sortedElements.least[1]);

    console.timeEnd('duration');
}

init();
