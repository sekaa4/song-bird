import birdsData from './birds';
import birdsDataEn from './birds-en';
import score from './score.js';
import description from './description';
import shuffle from './shuffle';

export default function answer(start, audioPlayer, audioPlayer2) {
  start = shuffle(start);
  const div1 = document.querySelector('.answer-options__container');
  div1.innerHTML = '';
  const ul = document.createElement('ul');
  ul.className = 'answer-options__list';
  div1.append(ul);

  for (let i = 0; i < start.length; i++) {
    const li = document.createElement('li');
    const span = document.createElement('span');

    li.className = 'answer-options__item';
    span.className = 'radio-btn';
    li.textContent = start[i].name;

    li.prepend(span);
    li.onclick = checkAnswer.bind(null, audioPlayer, audioPlayer2);
    ul.append(li);
  }
}

function checkAnswer(audioPlayer, audioPlayer2, e) {
  const quizName = document.querySelector('.quiz-random-bird-name');
  const correct = document.getElementById('correct');
  const inCorrect = document.getElementById('inCorrect');
  const btnNext = document.getElementById('btn-next');
  const liArray = document.querySelectorAll('.answer-options__item');
  const item = document.querySelector('.quiz-item.active');
  const { id } = item;

  const language = document.querySelector('.language.nav__language');
  const lang = language.value;

  const data = lang === 'ru' ? birdsData.slice(id) : birdsDataEn.slice(id);

  const birdsArr = data[0];
  const img = document.querySelector('.quiz-random-bird__img');
  const container = document.querySelector('.answer-options__container.container-description');

  if (e.currentTarget.textContent === quizName.dataset.name) {
    const item = document.querySelector('.quiz-item.active');

    const divImgs = document.querySelectorAll('.play-pause.play-song');
    divImgs.forEach((el) => {
      if (el.classList.contains('quiz-random-bird__play-pause')) {
        audioPlayer.playPause('', el);
      } else audioPlayer2.playPause('', el);
    });

    correct.load();
    correct.play();
    const bird = birdsArr.find(el => el.name === quizName.dataset.name);

    description(bird, container, audioPlayer2);
    img.src = bird.image;
    quizName.textContent = quizName.dataset.name;

    e.currentTarget.firstElementChild.classList.add('correct');
    btnNext.disabled = false;
    liArray.forEach(el => {
      el.onclick = (e) => withoutCheckAnswer(e, audioPlayer2);
    });

    score();

    if (!item.nextElementSibling) {
      const score = document.querySelector('.quiz-title__score');
      const buttonCancel = document.querySelector('.answer-options__cancel');
      let timerId = null;
      correct.load();
      correct.play();

      if (localStorage.getItem('timerId')) {
        localStorage.removeItem('timerId');
      } else {
        timerId = setTimeout(() => window.location.hash = '#result', 5000);
        localStorage.setItem('timerId', timerId);
      }

      localStorage.setItem('saveResult', score.innerHTML);
      if (buttonCancel) buttonCancel.disabled = false;
    }
  } else {
    const bird = birdsArr.find(el => el.name === e.currentTarget.textContent);
    const divImgs = document.querySelectorAll('.play-pause.play-song');
    divImgs.forEach((el) => {
      if (!el.classList.contains('quiz-random-bird__play-pause')) {
        audioPlayer2.playPause('', el);
      }
    });

    description(bird, container, audioPlayer2);
    inCorrect.load();
    inCorrect.play();
    e.currentTarget.firstElementChild.classList.add('error');
  }
}

function withoutCheckAnswer(e, audioPlayer2) {
  const item = document.querySelector('.quiz-item.active');

  const { id } = item;

  const language = document.querySelector('.language.nav__language');
  const lang = language.value;

  const data = lang === 'ru' ? birdsData.slice(id) : birdsDataEn.slice(id);

  const birdsArr = data[0];
  const container = document.querySelector('.answer-options__container.container-description');
  const bird = birdsArr.find(el => el.name === e.currentTarget.textContent);

  const divImgs = document.querySelectorAll('.play-pause.play-song');
  divImgs.forEach((el) => {
    if (!el.classList.contains('quiz-random-bird__play-pause')) {
      audioPlayer2.playPause('', el);
    }
  });

  description(bird, container, audioPlayer2);
}
