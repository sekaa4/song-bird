export default function score() {
  const score = document.querySelector('.quiz-title__score');
  const scoreCorrectAnswer = 5;
  const failAnswers = document.querySelectorAll('.radio-btn.error');

  const scoreNumber = +score.innerHTML;
  const failsNumber = scoreCorrectAnswer - failAnswers.length;
  score.innerHTML = ('0' + (scoreNumber + failsNumber)).slice(-2);
}
