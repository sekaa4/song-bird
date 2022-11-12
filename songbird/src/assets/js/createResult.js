export default function createResult() {
  const app = document.getElementById('app');
  const result = localStorage.getItem('saveResult');
  const div = document.createElement('div');
  const h1Win = document.createElement('h1');
  const h1Lose = document.createElement('h1');
  const pWin = document.createElement('p');
  const pLose = document.createElement('p');
  const button = document.createElement('button');

  div.className = 'result-page';
  h1Win.className = 'result-page__title';
  h1Lose.className = 'result-page__title';
  pWin.className = 'result-page__text';
  pLose.className = 'result-page__text';
  button.className = 'result-page__button';

  button.onclick = () => {
    window.location.hash = '#quiz';
  };

  if (!result) {
    h1Lose.className = 'result-page__title';
    h1Lose.textContent = 'Вы ещё не проходили Викторину, вы можете это сделать прямо сейчас';
    button.textContent = 'Начать Викторину';
    div.append(h1Lose, button);
    app.append(div);

    return;
  }

  h1Win.textContent = 'Поздравляем!';
  pWin.textContent = `Вы прошли викторину и набрали ${result} из 30 возможных баллов`;
  pLose.textContent = `Вы прошли викторину и набрали ${result} из 30 возможных баллов, но могло бы быть и лучше, можете попробовать пройти Викторину ещё раз, теперь это будет сделать проще! Удачи!`;
  button.textContent = 'Начать Викторину';

  app.append(div);

  if (result === '30') {
    div.append(h1Win, pWin);
  } else {
    div.append(h1Win, pLose, button);
  }
}
