export default function Route(name, htmlName, defaultRoute) {
  try {
    if (!name || !htmlName) {
      throw new Error('name and htmlName must be set');
    }
    this.constructor(name, htmlName, defaultRoute);
  } catch (e) {
    console.error(e);
  }
}

Route.prototype = {
  name: null,
  htmlName: null,
  default: null,
  constructor: function (name, htmlName, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.default = defaultRoute;
  },
  isActiveRoute: function (hashedPath) {
    return hashedPath.replace('#', '') === this.name;
  }
};