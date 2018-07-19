import cat from '../images/cat.gif';
import dog from '../images/dog.gif';
import styles from '../styles/spinner.scss';

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
