'use strict';

const fs = require('fs').promises;

async function init() {
    const linkFile = await fs.readFile('./assets/day12-input', 'utf8');
    const links = linkFile.split('\n').filter(Boolean).map((link) => link.split('-'));

    const nodes = links.reduce((acc, link) => {
	return {
	    ...acc,
	    [link[0]]: (acc[link[0]] || []).concat(link[1]),
	    [link[1]]: (acc[link[1]] || []).concat(link[0]),
	};
    }, {});

    const paths = [];

    function findPath(target, path, allowDouble) {
	const connections = nodes[path.at(-1)];
	const lowerCasePath = allowDouble && path.filter((cave) => cave.toLowerCase() === cave);

	connections.forEach((connection) => {
	    if (connection === target) {
		paths.push([...path, target]);
		return;
	    }

	    if (connection === 'start') {
		return;
	    }

	    if (connection.toLowerCase() === connection && path.includes(connection)
		&& (!allowDouble || new Set(lowerCasePath).size < lowerCasePath.length)) {
		return;
	    }

	    findPath(target, [...path, connection], allowDouble);
	});
    }

    // findPath('end', ['start'], false); // part 1
    findPath('end', ['start'], true);

    console.log(paths, paths.length);
}

init();
