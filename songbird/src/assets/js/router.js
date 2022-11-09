import createQuiz from './createQuiz';
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
      let url = htmlName;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElem.innerHTML = this.responseText;
          if (window.location.hash.slice(1) === 'quiz') createQuiz();
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    })(this);
  }
};