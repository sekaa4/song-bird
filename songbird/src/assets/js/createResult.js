export default function createResult() {
  const app = document.getElementById('app');
  const result = localStorage.getItem('saveResult');
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  const p = document.createElement('p');
  const button = document.createElement('button');

  div.className = 'result-page';
  h1.className = 'result-page__title';
  p.className = 'result-page__text';
  button.className = 'result-page__button';

  h1.textContent = 'Поздравляем!';
  p.textContent = `Вы прошли викторину и набрали ${ result } из 30 возможных баллов`;
  button.textContent = 'Попробовать ещё раз';

  app.append(div);

  if (result === '30') {
    div.append(h1, p);
  } else {
    button.onclick = () => {
      window.location.hash = '#quiz';
    };
    div.append(h1, p, button);
  }
}