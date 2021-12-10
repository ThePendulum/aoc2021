'use strict';

const sample = [3,4,3,1,2];
const input = [5,1,1,5,4,2,1,2,1,2,2,1,1,1,4,2,2,4,1,1,1,1,1,4,1,1,1,1,1,5,3,1,4,1,1,1,1,1,4,1,5,1,1,1,4,1,2,2,3,1,5,1,1,5,1,1,5,4,1,1,1,4,3,1,1,1,3,1,5,5,1,1,1,1,5,3,2,1,2,3,1,5,1,1,4,1,1,2,1,5,1,1,1,1,5,4,5,1,3,1,3,3,5,5,1,3,1,5,3,1,1,4,2,3,3,1,2,4,1,1,1,1,1,1,1,2,1,1,4,1,3,2,5,2,1,1,1,4,2,1,1,1,4,2,4,1,1,1,1,4,1,3,5,5,1,2,1,3,1,1,4,1,1,1,1,2,1,1,4,2,3,1,1,1,1,1,1,1,4,5,1,1,3,1,1,2,1,1,1,5,1,1,1,1,1,3,2,1,2,4,5,1,5,4,1,1,3,1,1,5,5,1,3,1,1,1,1,4,4,2,1,2,1,1,5,1,1,4,5,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,4,2,1,1,1,2,5,1,4,1,1,1,4,1,1,5,4,4,3,1,1,4,5,1,1,3,5,3,1,2,5,3,4,1,3,5,4,1,3,1,5,1,4,1,1,4,2,1,1,1,3,2,1,1,4];

const generations = 256;

async function init() {
    function run(fish, days) {
	let timers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	fish.forEach((timer) => timers[timer] += 1);

	for (let day = 1; day <= days; day += 1) {
	    const births = timers[0];

	    timers = timers.map((count, timer) => timers[timer + 1] ?? births);
	    timers[6] = timers[6] + births;
	}

	console.log(timers.reduce((acc, count) => acc + count, 0));
    }

    console.time('sample duration');
    run(sample, generations);
    console.timeEnd('sample duration');

    console.time('main duration');
    run(input, generations);
    console.timeEnd('main duration');
}

init();
