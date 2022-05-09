import { keys } from './keys';

export const checkLanguage = () => {
  if (localStorage.getItem('lang') === 'en') {
    return keys.enKeys;
  }
  return keys.ruKeys;
};

export const setLanguage = (lkey) => {
  let lang;
  if (lkey === keys.enKeys) {
    lang = 'en';
    localStorage.setItem('lang', lang);
  } else {
    lang = 'ru';
    localStorage.setItem('lang', lang);
  }
};
