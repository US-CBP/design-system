import SelectorEngine from './components/selectorEngine';
import Accordion from './components/accordion';

import './sass/main.scss';

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