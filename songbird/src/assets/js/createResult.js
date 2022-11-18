import { languages } from './languages';

export default function createResult(lang) {
  const app = document.getElementById('app');
  const result = localStorage.getItem('saveResult');
  const div = document.createElement('div');
  const h1Win = document.createElement('h1');
  const h1Lose = document.createElement('h1');
  const pWin = document.createElement('p');
  const pLose = document.createElement('p');
  const button = document.createElement('button');

  languages.result = localStorage.getItem('saveResult');

  div.className = 'result-page';
  h1Win.className = 'result-page__title';
  h1Lose.className = 'result-page__title';
  pWin.className = 'result-page__text';
  pLose.className = 'result-page__text';
  button.className = 'result-page__btn btn';

  h1Win.setAttribute('data-lang', 'h1Win');
  h1Lose.setAttribute('data-lang', 'h1Lose');
  pWin.setAttribute('data-lang', 'pWin');
  pLose.setAttribute('data-lang', 'pLose');
  button.setAttribute('data-lang', 'buttonResult');

  button.onclick = () => {
    localStorage.removeItem('timerId');
    window.location.hash = '#quiz';
  };

  if (!result) {
    h1Lose.className = 'result-page__title';
    h1Lose.textContent = languages[lang].h1Lose;
    button.textContent = languages[lang].buttonResult;
    div.append(h1Lose, button);
    app.append(div);

    return;
  }

  h1Win.textContent = languages[lang].h1Win;
  pWin.textContent = languages[lang].pWin();
  pLose.textContent = languages[lang].pLose();
  button.textContent = languages[lang].buttonResult;

  app.append(div);

  if (result === '30') {
    div.append(h1Win, pWin);
  } else {
    div.append(h1Win, pLose, button);
  }
}
