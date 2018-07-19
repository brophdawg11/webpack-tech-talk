import { loadSpinner, clearSpinners } from './js/spinner.js';

const leftBtn = document.querySelector('#load-left')
const clearBtn = document.querySelector('#clear')
const rightBtn = document.querySelector('#load-right')

function loadLeftSpinner() {
    loadSpinner('left', 'cat');
}

function loadRightSpinner() {
    loadSpinner('right', 'dog');
}

leftBtn.addEventListener('click', loadLeftSpinner);
clearBtn.addEventListener('click', clearSpinners);
rightBtn.addEventListener('click', loadRightSpinner);

console.log('App initialized!');
