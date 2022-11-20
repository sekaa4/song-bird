import birdsData from './birds';
import birdsDataEn from './birds-en';
import { languages } from './languages';
import url from '../images/empty-bird.jpg';
import shuffle from './shuffle';
import createSound from './createSound';
import CreateAudioPlayer from './createAudioPlayer';
import updateDurationSong from './updateDurationSong';
import answer from './answer';

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
  btnNext.addEventListener('click', changePanel);

  divAudio.append(audio);
  li.append(h3);
  li2.append(divAudio);
  ul.append(li, li2);
  div.append(ul);
  quiz.append(img, div);

  answer(startBirds, audioPlayer, audioPlayer2);

  if (!document.getElementById('correct')) {
    createSound();
  }
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
