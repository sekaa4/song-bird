export default class createAudioPlayer {
  constructor() {
    this.isPlay = false;
    this.stateVol = null;
  }

  createAudio(classNamePrefix) {
    const divMain = document.createElement('div');
    const audio = document.createElement('audio');
    const divImg = document.createElement('div');
    const divImgVol = document.createElement('div');
    const inputLine = document.createElement('input');
    const inputVolume = document.createElement('input');
    const divCurrentTime = document.createElement('div');
    const divDurationTime = document.createElement('div');

    audio.className = `audio ${classNamePrefix}__audio`;
    audio.volume = 0.3;

    divImg.className = `play-pause ${classNamePrefix}__play-pause`;
    divImg.onclick = (e) => this.playPause(e);

    divImgVol.className = `volume ${classNamePrefix}__volume`;
    divImgVol.onclick = (e) => this.changeVolumeImg(e);

    inputLine.type = 'range';
    inputLine.min = '0';
    inputLine.value = '0';
    inputLine.className = `progress-line ${classNamePrefix}__progress-line`;
    inputLine.onchange = this.changeProgressBar;

    inputVolume.type = 'range';
    inputVolume.min = '0';
    inputVolume.max = '1';
    inputVolume.step = '0.1';
    inputVolume.value = '0.3';
    inputVolume.className = `volume-line ${classNamePrefix}__volume-line`;
    inputVolume.onchange = this.changeVolume;

    divCurrentTime.className = `current-time ${classNamePrefix}__current-time`;
    divDurationTime.className = `duration-time ${classNamePrefix}__duration-time`;

    divMain.append(audio, divImg, inputLine, divImgVol, inputVolume);
    divMain.append(divCurrentTime, divDurationTime);
    return divMain;
  }

  playPause(e, elem) {
    elem = e ? e.target : elem;
    const audio = elem.parentElement.querySelector('.audio');

    if (this.isPlay) {
      elem.classList.toggle('play-song');
      audio.pause();
      this.isPlay = false;
    } else {
      elem.classList.toggle('play-song');

      audio.play();
      this.isPlay = true;
    }
  }

  changeVolumeImg(e, elem) {
    elem = e ? e.target : elem;
    elem.classList.toggle('volume-slash');

    const audio = e.target.parentElement.querySelector('audio');
    const inputVolume = e.target.parentElement.querySelector('.volume-line');

    if (audio.muted) {
      inputVolume.value = this.stateVol;
      audio.muted = !audio.muted;
      audio.volume = inputVolume.value;
    } else {
      this.stateVol = inputVolume.value;
      inputVolume.value = 0;
      audio.muted = !audio.muted;
      audio.volume = inputVolume.value;
    }
  }

  changeProgressBar(e) {
    const audio = e.target.parentElement.querySelector('audio');
    const inputLine = e.target.parentElement.querySelector('.progress-line');

    audio.currentTime = inputLine.value;
  }

  changeVolume(e) {
    const audio = e.target.parentElement.querySelector('audio');
    const inputVolume = e.target.parentElement.querySelector('.volume-line');

    audio.volume = inputVolume.value;
  }
}
