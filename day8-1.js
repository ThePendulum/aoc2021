'use strict';

const fs = require('fs').promises;

const segments = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
};

async function init() {
    const codeInput = await fs.readFile('./assets/day8-input', 'utf8');
    const codes = codeInput.split('\n').filter(Boolean).map((row) => {
	const [signals, output] = row.split(' | ')

	return {
	    signals: signals.split(' '),
	    output: output.split(' '),
	};
    });

    const digits = codes.flatMap((code) => code.output.map((signal) => segments[signal.length])).filter(Boolean);

    console.log(digits.length);
}

init();
