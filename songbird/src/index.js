import './assets/styles/sass/style.scss';
import app from './assets/js/app';
import translate from './assets/js/translate';

const language = document.querySelector('.language.nav__language');
language.onchange = (e) => {
  const lang = e.target.value;
  translate(lang);
};

window.onbeforeunload = (e) => {
  localStorage.setItem('language', language.value);
};

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('language')) {
    const lang = localStorage.getItem('language');
    language.value = lang;
  }
});
