import Route from './route';
import Router from './router';

export default (function app() {
  function init() {
    let router = new Router([
      new Route('about', 'about.html', true),
      new Route('quiz', 'quiz.html'),
      new Route('result', 'result.html'),
      new Route('gallery', 'gallery.html'),
    ]);
  }
  init();
})();