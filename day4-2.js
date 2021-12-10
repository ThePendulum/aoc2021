'use strict';

const fs = require('fs').promises;

async function init() {
    const bingoInput = await fs.readFile('./assets/day4-input', 'utf8');
    const [numberInput, ...boardInput] = bingoInput.split('\n\n').filter(Boolean);

    const numbers = numberInput.split(',').map(Number);
    const allBoards = boardInput.map((board) => board.split('\n').filter(Boolean).map((row) => row.trim().split(/\s+/).map(Number)));

    function round(boards, index) {
	const number = numbers[index];
	const markedBoards = boards.map((board) => board.map((row) => row.map((rowNumber) => rowNumber === number ? null : rowNumber)));
	const losingBoards = markedBoards.filter((board) => !board.some((row) => row.every((rowNumber) => rowNumber === null)) // winning row
	    && !board[0].some((rowNumber, index) => board.every((row) => row[index] === null))); // winning column

	if (losingBoards.length > 0) {
	    return round(losingBoards, (index + 1) % numbers.length);
	}

	const sum = markedBoards[0].flat().reduce((acc, boardNumber) => acc + boardNumber, 0);

	return sum * number;
    }

    const winningSum = round(allBoards, 0);

    console.log(winningSum);
}

init();
