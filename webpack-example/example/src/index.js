import styles from './styles/main.css';

const leftBtn = document.querySelector('#load-left')
const clearBtn = document.querySelector('#clear')
const rightBtn = document.querySelector('#load-right')

function loadLeftSpinner() {
    import('./js/spinner.js').then(m => m.loadSpinner('left', 'cat'));
}

function loadRightSpinner() {
    import('./js/spinner.js').then(m => m.loadSpinner('right', 'dog'));
}

function clearSpinners() {
    import('./js/spinner.js').then(m => m.clearSpinners());
}

leftBtn.addEventListener('click', loadLeftSpinner);
clearBtn.addEventListener('click', clearSpinners);
rightBtn.addEventListener('click', loadRightSpinner);

console.log('App initialized!');

if (module.hot) {
    module.hot.dispose(() => {
        leftBtn.removeEventListener('click', loadLeftSpinner);
        clearBtn.removeEventListener('click', clearSpinners);
        rightBtn.removeEventListener('click', loadRightSpinner);
    });
    module.hot.accept();
}
