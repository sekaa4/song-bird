import { languages } from './languages';
import birdsData from './birds';
import birdsDataEn from './birds-en';

export default function translate(lang) {
  const elems = document.querySelectorAll('[data-lang]');
  elems.forEach((elem) => {
    if (elem.dataset.lang === 'score') {
      elem.firstChild.data = languages[lang][elem.dataset.lang];
      return;
    }
    if (elem.dataset.lang === 'pWin' || elem.dataset.lang === 'pLose') {
      elem.textContent = languages[lang][elem.dataset.lang]();
      return;
    }
    elem.textContent = languages[lang][elem.dataset.lang];
  });

  if (window.location.hash === '#quiz' && document.querySelector('.quiz-random-bird-name')) {
    const itemActive = document.querySelector('.quiz-item.active');
    const spanName = document.querySelector('.details-bird-card__name-normal');
    const spanNameSpecies = document.querySelector('.details-bird-card__name-species');
    const spanText = document.querySelector('.details-bird-card__text-content');
    const listAnswers = document.querySelectorAll('.answer-options__item');
    const { id } = itemActive;
    const dataEn = birdsDataEn.slice(id)[0];
    const dataRu = birdsData.slice(id)[0];

    const h3 = document.querySelector('.quiz-random-bird-name');
    const name = h3.getAttribute('data-name');

    if (lang === 'ru') {
      const id = dataEn.find(bird => bird.name === name).id;
      const bird = dataRu.find(bird => bird.id === id);
      h3.setAttribute('data-name', bird.name);
      h3.textContent = h3.textContent === '********' ? h3.textContent : bird.name;

      for (let birdElem of listAnswers) {
        const id = dataEn.find(bird => bird.name === birdElem.textContent).id;
        const bird = dataRu.find(bird => bird.id === id);
        birdElem.lastChild.data = bird.name;
      }

      if (!document.querySelector('.answer-options__discription')) {
        console.log('tut');
        spanName.textContent = bird.name;
        spanNameSpecies.textContent = bird.species;
        spanText.textContent = bird.description;
      }
    } else {
      const id = dataRu.find(bird => bird.name === name).id;
      const bird = dataEn.find(bird => bird.id === id);
      h3.setAttribute('data-name', bird.name);
      h3.textContent = h3.textContent === '********' ? h3.textContent : bird.name;

      for (let birdElem of listAnswers) {
        const id = dataRu.find(bird => bird.name === birdElem.textContent).id;
        const bird = dataEn.find(bird => bird.id === id);
        birdElem.lastChild.data = bird.name;
      }

      if (!document.querySelector('.answer-options__discription')) {
        spanName.textContent = bird.name;
        spanNameSpecies.textContent = bird.species;
        spanText.textContent = bird.description;
      }
    }
  }
}
