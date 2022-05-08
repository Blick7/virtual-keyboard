// import styles
import './styles/main.scss';

// import js
import { keys } from './js/keys';
import { keyboard } from './js/keyboard';

document.body.innerHTML = keyboard;
const rows = document.querySelectorAll('.row');
const textarea = document.querySelector('.text');

const generateKeyboard = () => {
  // eslint-disable-next-line no-console
  console.log(keys.enKeys);
  rows.forEach((item, index) => {
    for (let i = 0; i < item.children.length; i += 1) {
      const elem = item.children[i];
      elem.innerHTML = keys.enKeys[index][i];
      if (elem.innerHTML === 'Space') {
        elem.innerHTML = ' ';
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', generateKeyboard);
textarea.innerHTML += 'D';

document.addEventListener('keydown', (event) => {
  event.preventDefault(); // remove default action from space, tab and etc
  const buttons = document.querySelectorAll('[data-code]');
  const { code } = event;
  buttons.forEach((button) => {
    if (button.dataset.code === code) {
      // eslint-disable-next-line no-console
      console.log(button);
      textarea.innerHTML += button.textContent;
      button.classList.add('active');
    }
  });
});

document.addEventListener('keyup', (event) => {
  const buttons = document.querySelectorAll('[data-code]');
  const { code } = event;
  buttons.forEach((button) => {
    if (button.dataset.code === code) {
      // eslint-disable-next-line no-console
      console.log(button);
      button.classList.remove('active');
    }
  });
});
