import updateDurationSong from './updateDurationSong';

export default function description(bird, container, audioPlayer) {
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

  const divAudio = audioPlayer.createAudio('details-bird-card');
  const audio = divAudio.querySelector('audio');

  divNameCont.className = 'details-bird-card__name';
  spanName.className = 'details-bird-card__name-normal';
  spanNameSpecies.className = 'details-bird-card__name-species';
  divAudio.className = 'details-bird-card__audio-player audio-player';

  spanName.textContent = bird.name;
  spanNameSpecies.textContent = bird.species;

  audio.src = bird.audio;

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

  div.append(divInfo);
  div.append(divText);

  if (container) {
    container.innerHTML = '';
    container.append(div);
  }

  audio.onloadedmetadata = () => {
    updateDurationSong(audioPlayer, divAudio, audio.duration);
  };

  return div;
}
