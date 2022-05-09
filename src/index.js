// import styles
import './styles/main.scss';

// import js
import { keys } from './js/keys';
import { keyboard } from './js/keyboard';

document.body.innerHTML = keyboard;
const rows = document.querySelectorAll('.row');
const textarea = document.querySelector('.text');
const excludeKeysRegex = /Tab|Capslock|Shift|Ctrl|Lang|Alt|Enter|Del|Backspace|Space/;
let capsLock = false;
let langKeys = keys.enKeys;

// eslint-disable-next-line no-console
console.log(keys.ruKeys);

const generateKeyboard = () => {
  rows.forEach((item, index) => {
    for (let i = 0; i < item.children.length; i += 1) {
      const elem = item.children[i];
      if (capsLock) {
        elem.innerHTML = langKeys[index][i].toUpperCase();
        if (excludeKeysRegex.test(langKeys[index][i])) {
          elem.innerHTML = langKeys[index][i];
        }
        if (elem.innerHTML === 'Space') {
          elem.innerHTML = ' ';
        }
      } else {
        elem.innerHTML = langKeys[index][i].toLowerCase();
        if (excludeKeysRegex.test(langKeys[index][i])) {
          elem.innerHTML = langKeys[index][i];
        }
        if (elem.innerHTML === 'Space') {
          elem.innerHTML = ' ';
        }
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', generateKeyboard);

const setButtonSymbol = (button) => {
  // eslint-disable-next-line no-console
  // console.log(button.textContent);
  switch (button.textContent.toLowerCase()) {
    case 'tab':
      textarea.innerHTML += '   ';
      break;
    case 'shift':
      textarea.innerHTML += ''; // TODO
      break;
    case 'capslock':
      textarea.innerHTML += ''; // TODO
      capsLock = !capsLock;
      generateKeyboard();
      break;
    case 'ctrl':
      textarea.innerHTML += '';
      break;
    case 'alt':
      textarea.innerHTML += '';
      break;
    case 'enter':
      textarea.innerHTML += '\n';
      break;
    case 'del':
      textarea.innerHTML += ''; // TODO
      break;
    case 'backspace':
      textarea.innerHTML = textarea.innerHTML.slice(
        0,
        textarea.innerHTML.length - 1,
      );
      break;
    // case '←':
    //   textarea.selectionEnd -= 1;
    //   // eslint-disable-next-line no-console
    //   console.log(textarea.selectionStart);
    //   break;
    case 'lang':
      langKeys = langKeys === keys.enKeys ? keys.ruKeys : keys.enKeys;
      generateKeyboard();
      break;
    default:
      if (capsLock) {
        textarea.innerHTML += button.textContent.toUpperCase();
      } else { textarea.innerHTML += button.textContent; }
      break;
  }
};

document.onkeydown = (event) => {
  if (event.code === 'AltLeft') {
    document.onkeyup = (e) => {
      if (e.code === 'ShiftLeft') {
        // eslint-disable-next-line no-console
        console.log('DONE');
        langKeys = langKeys === keys.enKeys ? keys.ruKeys : keys.enKeys;
        generateKeyboard();
      } else {
        document.onkeyup = null;
      }
    };
  }
};

document.addEventListener('keydown', (event) => {
  event.preventDefault(); // remove default action from space, tab and etc
  const buttons = document.querySelectorAll('[data-code]');
  const { code } = event;
  buttons.forEach((button) => {
    if (button.dataset.code === code) {
      setButtonSymbol(button);
      button.classList.add('active');
    }
  });
  // set cursor at the end of the text
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
});

document.addEventListener('keyup', (event) => {
  const buttons = document.querySelectorAll('[data-code]');
  const { code } = event;
  buttons.forEach((button) => {
    if (button.dataset.code === code) {
      button.classList.remove('active');
    }
  });
});

document.addEventListener('mousedown', (event) => {
  event.preventDefault(); // remove default action from space, tab and etc
  const buttons = document.querySelectorAll('[data-code]');
  const { code } = event.target.dataset;
  buttons.forEach((button) => {
    if (button.dataset.code === code) {
      setButtonSymbol(button);
      button.classList.add('active');
    }
  });
  // set cursor at the end of the text
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
});

document.addEventListener('mouseup', (event) => {
  event.preventDefault(); // remove default action from space, tab and etc
  const buttons = document.querySelectorAll('[data-code]');
  buttons.forEach((button) => {
    button.classList.remove('active');
  });
  // set cursor at the end of the text
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
});
