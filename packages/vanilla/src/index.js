import SelectorEngine from './utilities/selectorEngine';
import Accordion from './components/accordion/accordion';
import ApplicationHeader from './components/application-header/application-header';
import Banner from './components/banner/banner';
import Chip from './components/chip/chip';
import Drawer from './components/drawer/drawer';
import Dropdown from './components/dropdown/dropdown';
import Expand from './components/expand/expand';
import Toggle from './components/toggle/toggle';
import FileInput from './components/file-input/fileInput';
import ObfuscatedField from './components/text-input/obfuscatedField';
import NumberCounter from './components/text-input/numberCounter';
import SegmentedButtonGroup from './components/segmented-button-group/segmented-button-group';
import Tabset from './components/tabs/tabs';
import IndeterminateCheckbox from './components/checkbox/indeterminate';
//import UniversalHeader from './components/header/header';
import DarkMode from './utilities/darkMode';

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
   * Chips
   */
  SelectorEngine.findAll('.cbp-chip').forEach((chip) => {
    addOrInstantiate(Chip, chip);
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
  SelectorEngine.findAll('.cbp-file-input').forEach((fileInput) => {
    addOrInstantiate(FileInput, fileInput);
  });

  /**
   * Application Header Component
   */
  SelectorEngine.findAll('.cbp-application-header').forEach((appHeader) => {
    addOrInstantiate(ApplicationHeader, appHeader);
  });

  /**
   * Universal Header Component
   */
  SelectorEngine.findAll('.cbp-universal-header').forEach((univHeader) => {
    //addOrInstantiate(UniversalHeader, univHeader);
  });

  /**
   * Hashfield Component
   */
  SelectorEngine.findAll("input[type='password']").forEach((obfuscatedField) => {
    addOrInstantiate(ObfuscatedField, obfuscatedField);
  });

  /**
   * Number Counter Component (Input)
   */
  SelectorEngine.findAll('.cbp-input__numeric-counter').forEach((counter) => {
    addOrInstantiate(NumberCounter, counter);
  });

  /**
   * Segmented Buttons (Toggle Buttons)
   */
  SelectorEngine.findAll('.cbp-btn--segment').forEach((segmentedButtonGroup) => {
    addOrInstantiate(SegmentedButtonGroup, segmentedButtonGroup);
  });

  /**
   * Tabset
   */
  SelectorEngine.findAll('.cbp-tabset').forEach((tabset) => {
    addOrInstantiate(Tabset, tabset);
  });

  
  SelectorEngine.findAll("[data-checkbox='indeterminate']").forEach(checkbox => {
    addOrInstantiate(IndeterminateCheckbox, checkbox);
  })
  
  SelectorEngine.findAll('[data-theme-toggle]').forEach((themeToggle) => {
    addOrInstantiate(DarkMode, themeToggle);
  });
  
});
