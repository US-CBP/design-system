export default class SelectorEngine {
  static findAll(selector) {
    return document.querySelectorAll(selector);
  }

  static findOne(selector) {
    return document.querySelector(selector);
  }
}