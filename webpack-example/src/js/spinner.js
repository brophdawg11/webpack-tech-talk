const cat = '/src/images/cat.gif';
const dog = '/src/images/dog.gif';

export function loadSpinner(position, type) {
    const img = document.createElement('img');
    img.classList.add('spin');
    img.setAttribute('src', type === 'cat' ? cat : dog);
    document.querySelector(`.${position}`).appendChild(img);
}

export function clearSpinners() {
    document.querySelector(`.left`).innerHTML = '';
    document.querySelector(`.right`).innerHTML = '';
}
