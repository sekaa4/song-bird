export default function updateDurationSong(audioPlayer, elem, duration) {
  const divImg = elem.querySelector('.play-pause');
  const audio = elem.querySelector('audio');
  const inputLine = elem.querySelector('.progress-line');
  const currentTime = elem.querySelector('.current-time');
  const durationTime = elem.querySelector('.duration-time');

  inputLine.max = audio.duration;
  inputLine.value = audio.currentTime;
  currentTime.innerHTML = formatTime(Math.floor(audio.currentTime));
  if (durationTime.innerHTML === "NaN:NaN") {
    durationTime.innerHTML = "0:00";
  } else {
    durationTime.innerHTML = formatTime(Math.floor(duration));
  }

  if (currentTime.innerHTML === durationTime.innerHTML) {
    audio.load();
    audioPlayer.playPause('', divImg);
  }

  setTimeout(updateDurationSong, 500, audioPlayer, elem, duration);
}

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
