
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  class SelectorEngine {
    static findAll(selector) {
      return document.querySelectorAll(selector);
    }
  }

  class Accordion {
    constructor(domNode) {
      this.accordionNode = domNode;

      this.accordionNode.addEventListener('click', this.toggle);
    }

    toggle(event) {
      const wrapper = event.target.closest('.cbp-accordion__item');
      wrapper.classList.toggle('active');
    }
  }

  const allAccordions = SelectorEngine.findAll('.cbp-accordion__title');

  allAccordions.forEach(btn => {
    new Accordion(btn);
  });

})();
