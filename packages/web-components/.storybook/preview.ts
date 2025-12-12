import type { Preview, WebComponentsRenderer } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import type { DecoratorFunction } from 'storybook/internal/csf';
import { isChromatic } from './chromatic';
import {defineCustomElements} from '../dist/loader';

// Used for docs
import { themes } from 'storybook/theming';
//import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';


defineCustomElements();
setCustomElementsManifest(customElements);


// Extend the DocsContainerProps to include the userGlobals
/*
interface ExtendedDocsContainerProps extends DocsContainerProps {
  context: DocsContainerProps['context'] & {
    store: { userGlobals: { globals: Record<string, string> } };
  };
}
*/


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


const withThemeProvider: DecoratorFunction<WebComponentsRenderer, { [x: string]: unknown }> = (storyFn, context) => {
  const {
    globals: { theme, mode },
  } = context;
  const body = document.querySelector('body.sb-show-main');
  if (!(body instanceof HTMLElement)) return storyFn();

  const app = document.querySelector('cbp-app') as HTMLCbpAppElement;
  if (!(app instanceof HTMLElement)) return storyFn();

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

const preview: Preview = {
  decorators: [withWrapper, withThemeProvider, withAnimationControl], //, contentDirectionProvider
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
    a11y: {
      options: {
        /*
         * Opt in to running WCAG 2.x AAA rules
         * Note that you must explicitly re-specify the defaults (all but the last array entry)
         * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter-examples for more details.
         * Available tags: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
         */
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
      },
      /*
       * Configure test behavior
       * See: https://storybook.js.org/docs/next/writing-tests/accessibility-testing#test-behavior
       */
      test: 'todo',
    },
    backgrounds: {
      disabled: true, // TechDebt: not working for me
    },
    controls: { 
      //expanded: true, 
      hideNoControlsWarning: true,
    },
    html: {
      root: "cbp-app", // default: #storybook-root
      removeComments: true,
      removeEmptyComments: true,
      prettier: {
        parser: 'html',
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: 'css', // ignore?
        quoteProps: "as-needed",
        proseWrap: "always",
        bracketSameLine: false,
        singleAttributePerLine: true,
        //printWidth: 80,
      },
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
          'Components',
          'Patterns',
            [
              'Page Templates',
            ]
        ]
      },
    },
  },
  //tags: ['autodocs'],
};

export default preview;
