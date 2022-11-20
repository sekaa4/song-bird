import createQuiz from './createQuiz';
import createResult from './createResult';
import createGallery from './createGallery';
import translate from './translate';
import birdsData from './birds';
import birdsDataEn from './birds-en';

export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.rootElem = document.getElementById('app');
    this.init();
  }

  init() {
    const routes = this.routes;
    (function (scope, routes) {
      window.addEventListener('hashchange', function (e) {
        scope.hasChanged(scope, routes);
      });
    })(this, routes);
    this.hasChanged(this, routes);
  }

  hasChanged(scope, routes) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = routes.length; i < length; i++) {
        const route = routes[i];
        if (route.isActiveRoute(window.location.hash.slice(1))) {
          scope.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let i = 0, length = routes.length; i < length; i++) {
        const route = routes[i];
        if (route.default) {
          scope.goToRoute(route.htmlName);
        }
      }
    }
  }

  goToRoute(htmlName) {
    (function (scope) {
      let url = 'views/' + htmlName;
      let xhttp = new XMLHttpRequest();
      xhttp.open('GET', url, true);
      xhttp.send();

      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const language = document.querySelector('.language.nav__language');
          const lang = language.value;
          scope.rootElem.innerHTML = this.responseText;
          translate(lang);
          if (window.location.hash === '#quiz') {
            const nav = document.querySelector('.nav');
            const active = nav.querySelector('.active');
            if (!active) {
              nav.querySelectorAll('.nav__link')[1].classList.toggle('active');
            } else {
              active.classList.toggle('active');
              nav.querySelectorAll('.nav__link')[1].classList.toggle('active');
            }
            lang === 'ru' ? createQuiz(birdsData, lang) : createQuiz(birdsDataEn, lang);
          }
          if (window.location.hash === '#about' || window.location.hash === '') {
            const nav = document.querySelector('.nav');
            const active = nav.querySelector('.active');
            if (!active) {
              nav.querySelectorAll('.nav__link')[0].classList.toggle('active');
            } else {
              active.classList.toggle('active');
              nav.querySelectorAll('.nav__link')[0].classList.toggle('active');
            }
          }
          if (window.location.hash === '#result') {
            const nav = document.querySelector('.nav');
            const active = nav.querySelector('.active');
            if (!active) {
              nav.querySelectorAll('.nav__link')[2].classList.toggle('active');
            } else {
              active.classList.toggle('active');
              nav.querySelectorAll('.nav__link')[2].classList.toggle('active');
            }
            createResult(lang);
          }
          if (window.location.hash === '#gallery') {
            const nav = document.querySelector('.nav');
            const active = nav.querySelector('.active');
            if (!active) {
              nav.querySelectorAll('.nav__link')[3].classList.toggle('active');
            } else {
              active.classList.toggle('active');
              nav.querySelectorAll('.nav__link')[3].classList.toggle('active');
            }
            createGallery(lang);
          }
        }
      };
    })(this);
  }
};
