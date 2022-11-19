import birdsData from './birds';
import birdsDataEn from './birds-en';
import CreateAudioPlayer from './createAudioPlayer';
import description from './description';

const audioPlayer = new CreateAudioPlayer();

export default function createGallery(lang) {
  const container = document.createElement('div');
  const app = document.getElementById('app');
  const data = lang === 'ru' ? birdsData : birdsDataEn;

  container.classList.add('gallery-container');

  data.flat().forEach(bird => {

    const cardBird = description(bird, '', audioPlayer);

    cardBird.classList.add('gallery-bird-card');
    container.append(cardBird);
  });

  const divImgs = container.querySelectorAll('.play-pause');
  app.append(container);
}
