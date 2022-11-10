import birdsData from './birds';
import url from '../images/empty-bird.jpg';
import correct from '../sound/correct.mp3';
import incorrect from '../sound/incorrect.mp3';

export default function createQuiz(birds = birdsData) {
  const btnNext = document.getElementById('btn-next');
  const quiz = document.querySelector('.quiz-random-bird');
  quiz.innerHTML = '';
  const item = document.querySelector('.quiz-item');
  const start = birds[0];
  const shuffleStart = shuffle(start);
  const obj = shuffleStart[0];

  const img = new Image();
  img.className = 'quiz-random-bird__img img';
  img.src = url;
  img.alt = 'empty-bird';

  const div = document.createElement('div');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  li.className = 'quiz-random-bird__description';
  const li2 = li.cloneNode(true);

  div.append(ul);
  ul.append(li);
  ul.append(li2);
  createSound();

  const h3 = document.createElement('h3');
  h3.className = 'quiz-random-bird-name';
  const nameChars = obj.name.split('');

  h3.textContent = nameChars.map(() => '*').join('');
  h3.setAttribute('data-name', obj.name);
  li.append(h3);

  const divAudio = document.createElement('div');
  divAudio.className = 'quiz-random-bird__audio-player audio-player';
  li2.append(divAudio);

  const audio = document.createElement('audio');
  const urlAudio = obj.audio;
  audio.className = 'audio-player__random';
  audio.src = urlAudio;
  audio.controls = true;

  divAudio.append(audio);

  quiz.append(img);
  quiz.append(div);

  answer(start);
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
    li.addEventListener('click', checkAnswer);
    li.prepend(span);

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
  const audio = document.querySelector('.audio-player__random');
  const { id } = item;
  const data = birdsData.slice(id);

  const birdsArr = data[0];
  const img = document.querySelector('.quiz-random-bird__img');
  const container = document.querySelectorAll('.answer-options__container')[1];

  if (e.target.textContent === quizName.dataset.name) {
    const item = document.querySelector('.quiz-item.active');

    audio.load();
    correct.load();
    correct.play();
    const bird = birdsArr.find(el => el.name === quizName.dataset.name);

    description(bird, container);
    img.src = bird.image;
    quizName.textContent = quizName.dataset.name;

    e.target.firstElementChild.classList.add('correct');
    btnNext.disabled = false;
    correct.play();
    liArray.forEach(el => el.removeEventListener('click', checkAnswer));
    liArray.forEach(el => el.addEventListener('click', withoutCheckAnswer));
    score();

    if (!item.nextElementSibling) {
      btnNext.textContent = 'Закончить Викторину';
      localStorageDataSave(score.innerHTML);
    }
  } else {
    const bird = birdsArr.find(el => el.name === e.target.textContent);
    description(bird, container);
    inCorrect.load();
    inCorrect.play();
    e.target.firstElementChild.classList.add('error');
  }
}

function shuffle(array) {
  const random = array.map(Math.random);
  array.sort((a, b) => random[a.id] - random[b.id]);
  return array;
}

function description(bird, container) {
  container.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'details-bird-card';

  const divInfo = document.createElement('div');
  const img = document.createElement('img');
  const divCont = document.createElement('div');
  divInfo.className = 'details-bird-card__container';
  img.className = 'details-bird-card__img img';
  divCont.className = 'details-bird-card__info';

  img.src = bird.image;
  img.alt = bird.name;
  divInfo.append(img);
  divInfo.append(divCont);

  const divNameCont = document.createElement('div');
  const spanName = document.createElement('span');
  const spanNameSpecies = document.createElement('span');
  const divAudio = document.createElement('div');
  const audio = document.createElement('audio');

  divNameCont.className = 'details-bird-card__name';
  spanName.className = 'details-bird-card__name-normal';
  spanNameSpecies.className = 'details-bird-card__name-species';
  divAudio.className = 'details-bird-card__audio-player';

  spanName.textContent = bird.name;
  spanNameSpecies.textContent = bird.species;

  audio.src = bird.audio;
  audio.controls = true;

  divAudio.append(audio);
  divCont.append(divNameCont);
  divNameCont.append(spanName);
  divNameCont.append(spanNameSpecies);
  divCont.append(divAudio);

  const divText = document.createElement('div');
  const spanText = document.createElement('span');

  divText.className = 'details-bird-card__container-text';
  spanText.className = 'details-bird-card__text-content';
  spanText.textContent = bird.description;
  divText.append(spanText);

  container.append(div);
  div.append(divInfo);
  div.append(divText);
}

function createSound() {
  const main = document.getElementById('app');

  const audioCorrect = document.createElement('audio');
  audioCorrect.setAttribute('id', 'correct');
  audioCorrect.src = correct;

  const audioInCorrect = document.createElement('audio');
  audioInCorrect.setAttribute('id', 'inCorrect');
  audioInCorrect.src = incorrect;

  main.append(audioCorrect);
  main.append(audioInCorrect);
}

function changePanel(e) {
  const item = document.querySelector('.quiz-item.active');
  const main = document.getElementById('app');
  const btnNext = document.getElementById('btn-next');

  if (!item.nextElementSibling) {
    window.location.hash = '#result';
    return;
  }

  const { id } = item.nextElementSibling;

  item.classList.remove('active');
  item.nextElementSibling.classList.add('active');
  const data = birdsData.slice(id);

  const container = document.querySelectorAll('.answer-options__container')[1];
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', `<p class="answer-options__discription">
    <span span > Послушайте плеер.</span>
      <span>Выберите птицу из списка</span>
    </p >`);

  btnNext.disabled = true;
  createQuiz(data);
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
  const data = birdsData.slice(id);
  const birdsArr = data[0];
  const container = document.querySelectorAll('.answer-options__container')[1];
  const bird = birdsArr.find(el => el.name === e.target.textContent);

  description(bird, container);
}