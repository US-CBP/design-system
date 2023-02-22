import SelectorEngine from './utilities/selectorEngine';
import Accordion from './components/accordion/accordion';
import Banner from './components/banner/banner';
import Drawer from './components/drawer/drawer';
import Dropdown from './components/dropdown/dropdown';
import Expand from './components/expand/expand';
import Toggle from './components/toggle/toggle';
import FileUploader from './components/fileupload/fileupload';
import HashedField from './components/form/hashed-field/hashedField';
import NumberCounter from './components/form/number-counter/numberCounter';
import { UniversalHeader } from './components/header/header';

import './sass/main.scss';

const addOrInstantiate = (Klass, node) => {
  return new Klass(node);
};

// Make sure the DOM content has loaded before querying it
// (this may still fail in frameworks that load their components asynchronously)
document.addEventListener('DOMContentLoaded', (event) => {

  /**
   * Accordion Component
   */
  SelectorEngine.findAll(".cbp-accordion__title").forEach((accordion) => {
    addOrInstantiate(Accordion, accordion);
  });

  /**
   * Banner Component
   */
  SelectorEngine.findAll(".cbp-banner").forEach((banner) => {
    addOrInstantiate(Banner, banner);
  });

  SelectorEngine.findAll(".cbp-banner__info").forEach((banner) => {
    addOrInstantiate(Banner, banner);
  });

  SelectorEngine.findAll(".cbp-banner__security").forEach((banner) => {
    addOrInstantiate(Banner, banner);
  });

  /**
   * Drawer Components
   */
  SelectorEngine.findAll('[data-drawer-align]').forEach((drawer) => {
    addOrInstantiate(Drawer, drawer);
  });

  /**
   * Dropdown Components
   */
  SelectorEngine.findAll('[data-toggle="dropdown"]').forEach((dropdown) => {
    addOrInstantiate(Dropdown, dropdown);
  });

  /**
   * Expand Component
   */
  SelectorEngine.findAll(".cbp-expand").forEach((expand) => {
    addOrInstantiate(Expand, expand);
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

  /**
   * Hashfield Component
   */
  SelectorEngine.findAll('.cbp-form__password').forEach((hashedfield) => {
    addOrInstantiate(HashedField, hashedfield);
  });

  /**
   * Number Counter Component (Input)
   */
  SelectorEngine.findAll('.cbp-form__number--counter').forEach((counter) => {
    addOrInstantiate(NumberCounter, counter);
  });
});

/**
 * Universal Header Component
 */

// window.addEventListener('scroll', () => {
//   if (mediaQuery && !mediaQuery.matches) {
//     throttle(handleHeaderScroll, 250) 
//   }
// });

const universalHeader = SelectorEngine.findOne('.cbp-header__universal');
addOrInstantiate(UniversalHeader, universalHeader);