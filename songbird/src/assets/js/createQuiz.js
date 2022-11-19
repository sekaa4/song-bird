import birdsData from './birds';
import birdsDataEn from './birds-en';
import url from '../images/empty-bird.jpg';
import correct from '../sound/correct.mp3';
import incorrect from '../sound/incorrect.mp3';
import CreateAudioPlayer from './createAudioPlayer';
import description from './description';
import updateDurationSong from './updateDurationSong';
import { languages } from './languages';

const audioPlayer = new CreateAudioPlayer();
const audioPlayer2 = new CreateAudioPlayer();

export default function createQuiz(birds, language) {
  const btnNext = document.getElementById('btn-next');
  const quiz = document.querySelector('.quiz-random-bird');
  quiz.innerHTML = '';
  const startBirds = [...birds[0]];
  const shuffleStart = shuffle(startBirds);
  const obj = shuffleStart[0];

  const container = document.querySelector('.answer-options__container.container-description');
  const p = document.createElement('p');
  const span = document.createElement('span');
  const span2 = document.createElement('span');

  span.setAttribute('data-lang', 'spanListen');
  span2.setAttribute('data-lang', 'spanChoose');

  p.classList.add('answer-options__discription');

  span.textContent = languages[language].spanListen;
  span2.textContent = languages[language].spanChoose;

  p.append(span, span2);

  container.innerHTML = '';
  container.append(p);

  const img = new Image();
  img.className = 'quiz-random-bird__img img';
  img.src = url;
  img.alt = 'empty-bird';

  const div = document.createElement('div');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  div.className = 'quiz-random-bird__info';
  ul.className = 'quiz-random-bird__content';
  li.className = 'quiz-random-bird__description';
  const li2 = li.cloneNode(true);

  const h3 = document.createElement('h3');
  h3.className = 'quiz-random-bird-name';

  h3.textContent = '********';
  h3.setAttribute('data-name', obj.name);

  const divAudio = audioPlayer.createAudio('quiz-random-bird');
  divAudio.className = 'quiz-random-bird__audio-player audio-player';

  const audio = divAudio.querySelector('audio');
  const urlAudio = obj.audio;

  audio.src = urlAudio;

  audio.onloadedmetadata = () => {
    updateDurationSong(audioPlayer, divAudio, audio.duration);
  };

  if (!document.getElementById('correct')) {
    createSound();
  }

  answer(startBirds);

  divAudio.append(audio);
  li.append(h3);
  li2.append(divAudio);
  ul.append(li, li2);
  div.append(ul);
  quiz.append(img, div);

  btnNext.addEventListener('click', changePanel);
}

function answer(start) {
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
    li.addEventListener('click', checkAnswer);
    ul.append(li);
  }
}

function checkAnswer(e) {
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
    liArray.forEach(el => el.removeEventListener('click', checkAnswer));
    liArray.forEach(el => el.addEventListener('click', withoutCheckAnswer));

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

function shuffle(array) {
  const random = array.map(Math.random);
  array.sort((a, b) => random[a.id] - random[b.id]);
  return array;
}

function createSound() {
  const main = document.getElementById('app');

  const audioCorrect = document.createElement('audio');
  audioCorrect.setAttribute('id', 'correct');
  audioCorrect.src = correct;
  audioCorrect.volume = 0.5;

  const audioInCorrect = document.createElement('audio');
  audioInCorrect.setAttribute('id', 'inCorrect');
  audioInCorrect.src = incorrect;

  main.append(audioCorrect);
  main.append(audioInCorrect);
}

function changePanel(e) {
  const item = document.querySelector('.quiz-item.active');
  const btnNext = document.getElementById('btn-next');

  if (!item.nextElementSibling) {
    clearTimeout(localStorage.getItem('timerId'));
    localStorage.removeItem('timerId');
    window.location.hash = '#result';
    return;
  }

  const divImgs = document.querySelectorAll('.play-pause.play-song');
  divImgs.forEach((el) => {
    if (el.classList.contains('quiz-random-bird__play-pause')) {
      audioPlayer.playPause('', el);
    } else audioPlayer2.playPause('', el);
  });

  const { id } = item.nextElementSibling;

  item.classList.remove('active');
  item.nextElementSibling.classList.add('active');

  const language = document.querySelector('.language.nav__language');
  const lang = language.value;

  const data = lang === 'ru' ? birdsData.slice(id) : birdsDataEn.slice(id);

  const container = document.querySelector('.answer-options__container.container-description');
  const p = document.createElement('p');
  const span = document.createElement('span');
  const span2 = document.createElement('span');

  span.setAttribute('data-lang', 'spanListen');
  span2.setAttribute('data-lang', 'spanChoose');

  p.classList.add('answer-options__discription');

  span.textContent = languages[lang].spanListen;
  span2.textContent = languages[lang].spanChoose;

  p.append(span, span2);

  container.innerHTML = '';
  container.append(p);

  btnNext.disabled = true;

  const itemAlreadyActive = document.querySelector('.quiz-item.active');

  if (!itemAlreadyActive.nextElementSibling) {
    const divButton = document.querySelector('.answer-options__button');
    const div = document.createElement('div');
    const button = document.createElement('button');

    button.className = 'answer-options__cancel btn';
    button.textContent = languages[lang].cancelButton;

    button.setAttribute('data-lang', 'cancelButton');
    button.onclick = () => {
      if (localStorage.getItem('timerId')) {
        clearTimeout(localStorage.getItem('timerId'));
        localStorage.removeItem('timerId');
      } else {
        localStorage.setItem('timerId', 'true');
      }

      button.classList.add('active');
    };

    div.className = 'answer-options__finish-text';
    div.setAttribute('data-lang', 'finishText');
    div.textContent = languages[lang].finishText;

    divButton.append(button);
    divButton.append(div);

    btnNext.setAttribute('data-lang', 'finish');

    btnNext.textContent = languages[lang].finish;
  }

  createQuiz(data, lang);
}

function score() {
  const score = document.querySelector('.quiz-title__score');
  const scoreCorrectAnswer = 5;
  const failAnswers = document.querySelectorAll('.radio-btn.error');

  const scoreNumber = +score.innerHTML;
  const failsNumber = scoreCorrectAnswer - failAnswers.length;
  score.innerHTML = ('0' + (scoreNumber + failsNumber)).slice(-2);
}

function withoutCheckAnswer(e) {
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
