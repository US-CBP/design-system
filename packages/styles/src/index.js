import SelectorEngine from './components/selectorEngine';
import Accordion from './components/accordion';
import Dropdown from './components/dropdown';

import './sass/main.scss';

const addOrInstantiate = (Klass, node) => {
  return new Klass(node);
};

const allAccordions = SelectorEngine.findAll('.cbp-accordion__title');

allAccordions.forEach(btn => {
  new Accordion(btn);
})


/**
 * Expand Component
 */
SelectorEngine.findAll(".cbp-expand__title").forEach((title) => {
  title.addEventListener("click", (item) => {
    const expandParent = item.target.closest(".cbp-expand");
    expandParent.classList.toggle("active");
  });
});

/**
 * Dropdown Components
 */
 SelectorEngine.findAll('[data-toggle="dropdown"]').forEach((dropdown) => {
  addOrInstantiate(Dropdown, dropdown);
});