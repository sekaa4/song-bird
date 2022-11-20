import correct from '../sound/correct.mp3';
import incorrect from '../sound/incorrect.mp3';

export default function createSound() {
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
