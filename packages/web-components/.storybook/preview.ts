import type { Preview, WebComponentsRenderer } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import type { DecoratorFunction } from 'storybook/internal/csf';
import { isChromatic } from './chromatic';
import {defineCustomElements} from '../dist/loader';

import { addons } from 'storybook/preview-api'

// Used for docs
import { themes } from 'storybook/theming';

defineCustomElements();
setCustomElementsManifest(customElements);


// Wrap every story with `cbp-app` component, which brings in the high level CSS resets, settings, and variables.
const withWrapper: DecoratorFunction<WebComponentsRenderer, { [x: string]: unknown }> = (storyFn, context) => {
    const {
    globals: { theme, mode },
  } = context;

  return `<cbp-app theme="${mode != '_reset' ? mode : 'system'}">${storyFn()}</cbp-app>`;
};


const contentDirectionProvider: DecoratorFunction<WebComponentsRenderer, { [x: string]: unknown }> = (
  storyFn,
  context,
) => {
  const {
    globals: { layout },
  } = context;
  const html = document.querySelector('html');
  if (!(html instanceof HTMLElement)) return storyFn();

  html.setAttribute('dir', layout || 'ltr');
  return storyFn();
};


// Add decorator to disable animations when running in Chromatic
const withAnimationControl: DecoratorFunction<WebComponentsRenderer> = (storyFn) => {
  // Disable animations only in Chromatic environment
  if (isChromatic()) {
    // Add styles to disable all animations and transitions
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        animation-delay: 0s !important;
        transition-delay: 0s !important;
        animation-iteration-count: 1 !important;
      }
    `;
    document.head.appendChild(style);
  }
  return storyFn();
};


// Get the Pre-rendered Stencil web component code for the HTML Panel
var DEFAULT_ROOT_SELECTOR = "#storybook-root, #root";
const renderPreHydrated: DecoratorFunction<WebComponentsRenderer> = (storyFn, context) => {
  const parameters = context.parameters?.html || {};
  const rootSelector = parameters.root || DEFAULT_ROOT_SELECTOR;
  const channel = addons.getChannel();
  const story = storyFn();

  // Capture before hydration tick
  requestAnimationFrame( () => {
    const root = document.querySelector(rootSelector);
    const rawSnapshot = root?.innerHTML;
    // store it somewhere or pass via context
    context.parameters.__preHydratedHTML = rawSnapshot;

    setTimeout( async () => {
      channel.emit('storybook/html/codeUpdate', {
        code: rawSnapshot?.replace(/<!---->/g,'')
        .replace(/(checked|indeterminate|selectable|selected|current|disabled|readonly|required|error|group|success|determinate|hidden|hide|visually-hide|open|pressed|expanded|multiple|inert|controls|download|novalidate|formnovalidate|autofocus|stretch|nobreak|hide-minmax|hide-input|striped|flat|column-hover|hide-status|filter|async|create|enhanced|debug)=""/gi,'$1') // Represent booleans properly with just the attribute without ="" per innerHTML
        .replace(/(sx|items)="/gi,'$1=\'').replace(/(}|])"/gi,'$1\'')
        .replace(/&quot;/gi,'"') // fix sx props in HTML by wrapping the value in single quotes and unescaping the JSON double quotes
        .split('\n')
          //.filter( (line: string) => line.trim() != '' ? line.replace(/^ {0,4}/,'') : null) 
          .map( (line: string) => line.replace(/^ {0,4}/,''))
        .join('\n')
      });
    }, 1000);
  });
  return story;
}


const preview: Preview = {
  decorators: [renderPreHydrated, withWrapper, withAnimationControl], //, contentDirectionProvider renderPreHydrated
  globalTypes: {
    /*
    layout: {
      name: 'Content direction',
      description: 'Reading direction',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'document',
        items: [
          { value: 'ltr', title: 'Direction: LTR →' },
          { value: 'rtl', title: 'Direction: RTL ←' },
        ],
        dynamicTitle: true,
      },
    },
    */
    mode: {
      name: 'Mode',
      description: 'Light/Dark mode for cbp-app',
      defaultValue: globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : globalThis.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'system',
      //defaultValue: globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'system', title: '🖥️ System' },
          { value: 'light', title: '☀️ Light' },
          { value: 'dark', title: '🌘 Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: 'system', //globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : globalThis.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'system',
  },
  parameters: {
    docs: {
      theme: globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light,
      story: {
        inline: true,
        height: '250px',
      },
    },
    actions: { 
      disable: true,
      //argTypesRegex: '^on.*' 
    },
    interactions: { 
      disable: true,
    },
    controls: { 
      //expanded: true, 
      hideNoControlsWarning: true,
    },
    html: {
      root: "cbp-app", // default: #storybook-root
      removeComments: true,
      removeEmptyComments: true,
      //prettier: {
      //  parser: 'html',
      //  tabWidth: 2,
      //  useTabs: false,
      //  htmlWhitespaceSensitivity: 'css', // ignore?
      //  quoteProps: "as-needed",
      //  proseWrap: "always",
      //  bracketSameLine: false,
      //  singleAttributePerLine: true,
       // printWidth: 80,
      //},
      highlighter: {
        showLineNumbers: true,
        wrapLines: false, // enabling this triggers a bug in ReactSyntaxHighlighter that sets each line of code to display:flex
        language: 'html'
      },
    },
    options: {
      storySort: {
        //method: 'alphabetical',
        order: [
          'Introduction',
          'Design Tokens',
          'About Dark Mode',
          'Layout and Structure',
          'Navigation',
          'Content',
          'Notifications',
          'Controls',
          'Forms',
          'Utilities',
          'Components',
          'Patterns',
          'Page Templates',
          'Archetypes',
          'Test'
        ]
      },
    },
    a11y: {
      options: {
        /*
         * Opt in to running WCAG 2.x AAA rules
         * Note that you must explicitly re-specify the defaults (all but the last array entry)
         * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter-examples for more details.
         * Available tags: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
         */
        //runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
      },
      /*
       * Configure test behavior
       * See: https://storybook.js.org/docs/next/writing-tests/accessibility-testing#test-behavior
       */
      test: 'todo',
    },
  },
  //tags: ['autodocs'],
};

export default preview;
