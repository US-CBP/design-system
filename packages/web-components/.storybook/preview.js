/** @type { import('@storybook/html').Preview } */
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import {defineCustomElements} from '../dist/loader';

defineCustomElements();

export const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        //method: 'alphabetical',
        order: ['Introduction','Components', 'Patterns'],
        //includeNames: true,
      },
    },
  },
};

export const CUSTOM_VIEWPORTS = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '360px',
      height: '100%',
    },
    type: 'desktop',
  },
  medium: {
    name: 'Medium Breakpoint',
    styles: {
      width: '600px',
      height: '100%',
    },
    type: 'desktop',
  },
  large: {
    name: 'Large Breakpoint',
    styles: {
      width: '1024px',
      height: '100%',
    },
    type: 'desktop',
  },
  xl: {
    name: 'Extra-Large Breakpoint',
    styles: {
      width: '1440px',
      height: '100%',
    },
    type: 'desktop',
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: false,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    grid: {
      disable: true,
    },
  },
  previewTabs: {
    canvas: { hidden: true },
    'storybook/docs/panel': { hidden: true }
  },
  viewport: {
    viewports: CUSTOM_VIEWPORTS,
  },
  html: {
    root: "cbp-app", // default: #storybook-root
    removeComments: true,
    removeEmptyComments: true,
    prettier: {
      parser: 'html',
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: 'css',
      proseWrap: "always",
      bracketSameLine: true,
      singleAttributePerLine: true,
    },
    highlighter: {
      showLineNumbers: true,
      wrapLines: true,
      language: 'html'
    },
    transform: (code) => {
      // DEG: keeping this as an example because it may solve other issues I've encountered
      // Remove attributes `_nghost` and `ng-reflect` injected by Angular:
      return code.replace(/(?:_nghost|ng-reflect).*?="[\S\s]*?"/g, '');
    },
  },
};


// Wrap every story with `cbp-app` component, which brings in the high level CSS resets, settings, and variables.
const withWrapper = (story) => {
  return `<cbp-app>${story()}</cbp-app>`;
};

export const decorators = [
  withWrapper,
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-cbp-theme',
  }),
];
