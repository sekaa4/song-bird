import birds from './birds';
import url from '../images/empty-bird.jpg';
import correct from '../sound/correct.mp3';
import incorrect from '../sound/incorrect.mp3';

export default function createQuiz() {
  const quiz = document.querySelector('.quiz-random-bird');
  const item = document.querySelector('.quiz-item');
  const main = document.getElementById('app');

  const audioCorrect = document.createElement('audio');
  audioCorrect.setAttribute('id', 'correct');
  audioCorrect.src = correct;

  const audioInCorrect = document.createElement('audio');
  audioInCorrect.setAttribute('id', 'inCorrect');
  audioInCorrect.src = incorrect;

  main.append(audioCorrect);
  main.append(audioInCorrect);

  item.classList.toggle('active');
  const start = birds[0];
  const shuffleStart = shuffle(start);
  const obj = shuffleStart[0];

  const img = new Image();
  img.className = 'quiz-random-bird__img';
  img.src = url;

  const div = document.createElement('div');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  li.className = 'quiz-random-bird__description';
  const li2 = li.cloneNode(true);

  div.append(ul);
  ul.append(li);
  ul.append(li2);

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
  audio.src = urlAudio;
  audio.controls = true;

  divAudio.append(audio);

  quiz.append(img);
  quiz.append(div);

  answer(start);
}

function answer(start) {
  start = shuffle(start);
  const div1 = document.querySelector('.answer-options__container');
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
  const birdsArr = birds[0];
  const img = document.querySelector('.quiz-random-bird__img');

  if (e.target.textContent === quizName.dataset.name) {
    const bird = birdsArr.find(el => el.name === quizName.dataset.name);

    img.src = bird.image;
    quizName.textContent = quizName.dataset.name;

    e.target.firstElementChild.classList.add('correct');
    btnNext.disabled = false;
    correct.play();
    liArray.forEach(el => el.removeEventListener('click', checkAnswer));

  } else {
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