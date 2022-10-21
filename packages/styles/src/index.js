import SelectorEngine from './components/selectorEngine';
import Accordion from './components/accordion';

import './sass/main.scss';

const allAccordions = SelectorEngine.findAll('.cbp-accordion__title');

allAccordions.forEach(btn => {
  new Accordion(btn);
})