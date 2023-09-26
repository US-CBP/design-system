import Accordion from './components/accordion/accordion';
import ApplicationHeader from './components/application-header/application-header';
import Banner from './components/banner/banner';
import Chip from './components/chip/chip';
import Drawer from './components/drawer/drawer';
import Dropdown from './components/dropdown/dropdown';
import Expand from './components/expand/expand';
import Toggle from './components/toggle/toggle';
import FileInput from './components/file-input/fileInput';
import Menu from './components/menu/menu';
import ObfuscatedField from './components/text-input/obfuscatedField';
import NumberCounter from './components/text-input/numberCounter';
import SegmentedButtonGroup from './components/segmented-button-group/segmented-button-group';
import Tabset from './components/tabs/tabs';
import IndeterminateCheckbox from './components/checkbox/indeterminate';
import Modal from './components/modal/modal';
//import UniversalHeader from './components/header/header';

import DarkMode from './utilities/darkMode';


import './sass/main.scss';


/*
  Component initialization (bootstrapping) may be called on a specific selector for content that is loaded asynchronously.
*/
export function cbpdsInit(scope = document) {
  /**
   * Accordion Component
   */
  scope.querySelectorAll(".cbp-accordion__item").forEach((accordion) => {
    new Accordion(accordion);
  });

  /**
   * Banner Component
   */
  scope.querySelectorAll(".cbp-banner").forEach((banner) => {
    new Banner(banner);
  });

  scope.querySelectorAll(".cbp-banner__info").forEach((banner) => {
    new Banner(banner);
  });

  scope.querySelectorAll(".cbp-banner__security").forEach((banner) => {
    new Banner(banner);
  });

  /**
   * Chips
   */
  scope.querySelectorAll('.cbp-chip').forEach((chip) => {
    new Chip(chip);
  });

  /**
   * Drawer Components
   */
  scope.querySelectorAll('[data-drawer-align]').forEach((drawer) => {
    new Drawer(drawer);
  });

  /**
   * Dropdown Components
   */
  scope.querySelectorAll('[data-toggle="dropdown"]').forEach((dropdown) => {
    new Dropdown(dropdown);
  });

  /**
   * Expand Component
   */
  scope.querySelectorAll(".cbp-expand").forEach((expand) => {
    new Expand(expand);
  });


  /**
   * Toggle Component
   */
  scope.querySelectorAll('[data-component="cbp-toggle"]').forEach((toggle) => {
      new Toggle(toggle);
  });

  /**
   * File Input Component
   */
  scope.querySelectorAll('.cbp-file-input').forEach((fileInput) => {
    new FileInput(fileInput);
  });

  /**
   * Application Header Component
   */
  scope.querySelectorAll('.cbp-application-header').forEach((appHeader) => {
    new ApplicationHeader(appHeader);
  });

  /**
   * Universal Header Component
   * TechDebt: this needs to be completed and hooked up
   */
  scope.querySelectorAll('.cbp-universal-header').forEach((univHeader) => {
    //new UniversalHeader(univHeader);
  });

  /**
   * Hashfield Component
   */
  scope.querySelectorAll("input[type='password']").forEach((obfuscatedField) => {
    new ObfuscatedField(obfuscatedField);
  });

  /**
   * Menu
   */
  scope.querySelectorAll('.cbp-menu').forEach((menu) => {
    new Menu(menu);
  });

  /**
   * Number Counter Component (Input)
   */
  scope.querySelectorAll('.cbp-input__numeric-counter').forEach((counter) => {
    new NumberCounter(counter);
  });

  /**
   * Segmented Buttons (Toggle Buttons)
   */
  scope.querySelectorAll('.cbp-btn--segment').forEach((segmentedButtonGroup) => {
    new SegmentedButtonGroup(segmentedButtonGroup);
  });

  /**
   * Tabset
   */
  scope.querySelectorAll('.cbp-tabset').forEach((tabset) => {
    new Tabset(tabset);
  });

  /**
   * Indeterminate Checkbox
   */
  scope.querySelectorAll("[data-checkbox='indeterminate']").forEach(checkbox => {
    new IndeterminateCheckbox(checkbox);
  })

  /**
   * Modal dialog
   */
  scope.querySelectorAll(".cbp-modal").forEach(modal => {
    new Modal(modal);
  })
  
  // TechDebt: Can we rename this class to themeToggle? Seems inconsistent.
  scope.querySelectorAll('[data-theme-toggle]').forEach((themeToggle) => {
    new DarkMode(themeToggle);
  });

}

// Make sure the DOM content has loaded before querying it
// (this may still fail in frameworks that load their components asynchronously)
document.addEventListener('DOMContentLoaded', (event) => {
  cbpdsInit();
});
