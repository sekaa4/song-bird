import './assets/styles/sass/style.scss';
import './assets/js/app';
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

const links = document.querySelectorAll('.nav__link');
links.forEach(link => {
  if (link.closest('.language')) {
    return;
  }
  link.onclick = (e) => {
    const nav = document.querySelector('.nav');
    const active = nav.querySelector('.active');
    active.classList.toggle('active');
    e.currentTarget.classList.toggle('active');
  };
});
