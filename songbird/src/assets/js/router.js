import createQuiz from './createQuiz';
import createResult from './createResult';
import translate from './translate';
import birdsData from './birds';
import birdsDataEn from './birds-en';
export default function Router(routes) {
  try {
    if (!routes) {
      throw new Error('routes must be provided');
    }

    this.constructor(routes);
    this.init();
  } catch (e) {
    console.error(e);
  }
}

Router.prototype = {
  routes: null,
  rootElem: null,
  constructor: function (routes) {
    this.routes = routes;
    this.rootElem = document.getElementById('app');
  },
  init: function () {
    let r = this.routes;
    (function (scope, r) {
      window.addEventListener('hashchange', function (e) {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.default) {
          scope.goToRoute(route.htmlName);
        }
      }
    }
  },
  goToRoute: function (htmlName) {
    (function (scope) {
      let url = 'views/' + htmlName;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const language = document.querySelector('.language.nav__language');
          const lang = language.value;
          scope.rootElem.innerHTML = this.responseText;
          translate(lang);
          if (window.location.hash === '#quiz') {
            lang === 'ru' ? createQuiz(birdsData, lang) : createQuiz(birdsDataEn, lang);
          }
          if (window.location.hash === '#about') {
          }
          if (window.location.hash === '#result') {
            createResult(lang);
          }
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    })(this);
  }
};
