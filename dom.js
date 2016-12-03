var jsdom = require("jsdom").jsdom;
const document = jsdom("<html><body></body></html>");
const window = document.defaultView;
const navigator = window.navigator;
Object.assign(global, {
  document,
  window,
  navigator
});
