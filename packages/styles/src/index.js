import SelectorEngine from './utilities/selectorEngine';
import Accordion from './components/accordion';
import Dropdown from './components/dropdown';
import Expand from './components/expand';
import Toggle from './components/toggle';
import FileUploader from './components/fileupload';

import './sass/main.scss';

const addOrInstantiate = (Klass, node) => {
  return new Klass(node);
};

/**
 * Accordion Component
 */
 SelectorEngine.findAll(".cbp-accordion__title").forEach((accordion) => {
  addOrInstantiate(Accordion, accordion);
});

/**
 * Expand Component
 */
SelectorEngine.findAll(".cbp-expand").forEach((expand) => {
  addOrInstantiate(Expand, expand);
});

/**
 * Dropdown Components
 */
 SelectorEngine.findAll('[data-toggle="dropdown"]').forEach((dropdown) => {
  addOrInstantiate(Dropdown, dropdown);
});

/**
 * Toggle Component
 */
 window.addEventListener("load", () => {
  SelectorEngine.findAll('[data-component="cbp-toggle"]').forEach((toggle) => {
    new Toggle(toggle);
  });
});

/**
 * File Upload Component
 */
 SelectorEngine.findAll('.cbp-form__file').forEach((fileupload) => {
  addOrInstantiate(FileUploader, fileupload);
});