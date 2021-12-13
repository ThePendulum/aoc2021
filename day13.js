'use strict';

const fs = require('fs').promises;

async function init() {
    const instructionInput = await fs.readFile('./assets/day13-input', 'utf8');
    const instructions = instructionInput.split('\n').filter(Boolean); // .map(Number);

    const dots = instructions.filter((instruction) => !instruction.includes('fold along')).map((dot) => dot.split(',').map(Number));
    const paper = Array.from({
	length: Math.max(...dots.flatMap((dot) => dot[1])) + 1,
    }, () => Array.from({
	length: Math.max(...dots.flatMap((dot) => dot[0])) + 1,
    }, () => null));

    function render(grid) {
	console.log(grid.map((row) => row.map((dot) => dot || '.').join('')).join('\n'));
	console.log('\n');
    }

    dots.forEach((dot) => {
	paper[dot[1]][dot[0]] = '█';
    });

    const folds = instructions.filter((instruction) => instruction.includes('fold along')).map((fold) => {
	const [match, axis, index] = fold.match(/(\w)=(\d+)/);

	return { [axis]: Number(index) };
    });

    function foldY(paper, fold) {
	return paper.slice(0, fold).map((row, rowIndex) => row.map((dot, dotIndex) => dot || paper[paper.length - rowIndex - 1][dotIndex]));
    }

    function foldX(paper, fold) {
	return paper.map((row) => row.slice(0, fold).map((dot, dotIndex) => dot || row[row.length - dotIndex - 1]));
    }

    function foldPaper(paperFolds) {
	const foldedPaper = paperFolds.reduce((acc, fold) => {
	    if (fold.y) {
		return foldY(acc, fold.y);
	    }

	    if (fold.x) {
		return foldX(acc, fold.x);
	    }

	    return acc;
	}, paper);

	render(foldedPaper);
	console.log(foldedPaper.flat().filter(Boolean).length);
    }

    foldPaper(folds);
}

init();
