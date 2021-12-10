'use strict';

const fs = require('fs').promises;

const known = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
};

function regex(digits) {
    return new RegExp(`[${digits}]`, 'g');
}

function includes(stringA, stringB) {
    const result = stringA.match(regex(stringB))?.length === stringB.length;

    return result;
}

async function init() {
    const codeInput = await fs.readFile('./assets/day8-input', 'utf8');
    const codes = codeInput.split('\n').filter(Boolean).map((row) => {
	const [signals, output] = row.split(' | ')

	return {
	    signals: signals.split(' '),
	    output: output.split(' '),
	};
    });

    const decoded = codes.map((code) => {
	const digits = code.signals.concat(code.output).reduce((acc, signal) => {
	    if (known[signal.length]) {
		const sortedSignal = signal.split('').sort().join('');

		acc[sortedSignal] = known[signal.length];
		acc[known[signal.length]] = sortedSignal;
	    }

	    return acc;
	}, {});

	const decodedOutput = code.output.map((signal) => {
	    const sortedSignal = signal.split('').sort().join('');
	    const from8 = digits[8]?.replace(regex(sortedSignal), '');

	    if (digits[sortedSignal]) {
		return digits[sortedSignal];
	    }

	    if (sortedSignal.length === 6) {
		// 0, 6 or 9
		if (includes(sortedSignal, digits[4])) {
		    return 9;
		}

		if (includes(sortedSignal, digits[1])) {
		    return 0;
		}

		return 6;
	    }

	    if (sortedSignal.length === 5) {
		// 2, 3 or 5
		if (includes(sortedSignal, digits[1])) {
		    return 3;
		}

		if (includes(digits[4], from8)) {
		    return 2;
		}

		return 5;
	    }
	});

	return Number(decodedOutput.join(''));
    });

    const count = decoded.flat().reduce((acc, digit) => acc + digit, 0);

    console.log(decoded, count);
}

init();
