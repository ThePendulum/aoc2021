'use strict';

const fs = require('fs').promises;

async function init() {
    const depthInput = await fs.readFile('./assets/dayNUMBER-input', 'utf8');
    const depths = depthInput.split('\n').filter(Boolean); // .map(Number);

    console.log(result);
}

init();
