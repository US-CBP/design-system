import { themes } from 'storybook/theming';

import { setCustomElementsManifest } from "@storybook/web-components-vite";
import customElements from "../custom-elements.json";
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import {defineCustomElements} from '../dist/loader';

defineCustomElements();
setCustomElementsManifest(customElements);

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


/** @type { import('@storybook/web-components-vite').Preview } */
const preview = {
  parameters: {
    //actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      theme: globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light,
    },
    controls: {
      //expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
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
      }
    },
    // TechDebt: Enabling custom viewports seems to be linked to the HTML tab showing generated code instead of source/story code. Disabling custom viewports for further testing.
    viewport: {
      //viewports: CUSTOM_VIEWPORTS,
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
        quoteProps: "preserve",
        proseWrap: "preserve",
        bracketSameLine: false,
        singleAttributePerLine: false,
      },
      highlighter: {
        showLineNumbers: true, // TechDebt: double line numbers fixed in v8.x of html-addon
        wrapLines: true,
        language: 'html'
      },
      transform: (code) => {
        // DEG: keeping this as an example because it may solve other issues I've encountered
        // Remove attributes `_nghost` and `ng-reflect` injected by Angular:
        return code.replace(/(?:_nghost|ng-reflect).*?="[\S\s]*?"/g, '');
      },
    },
    /*
    decorators: [
      (Story) => (
        <ThemeProvider theme="default">
          <Story />
        </ThemeProvider>
      ),
    ],
    */
  },
};

export default preview;


// Wrap every story with `cbp-app` component, which brings in the high level CSS resets, settings, and variables.
const withWrapper = (story) => {
  //return `<cbp-app theme="light">${story()}</cbp-app>`;
  return `<cbp-app>${story()}</cbp-app>`;
};

/*
const stencilWrapper = (storyFn, context) => {
  const host = document.createElement('div');
  stencilClient.renderVdom(
    {
      $ancestorComponent$: undefined,
      $flags$: 0,
      $modeName$: undefined,
      $cmpMeta$: {
        $flags$: 0,
        $tagName$: 'div',  
      },
      $hostElement$: host,
    },
    storyFn(context)
  );
  return host.children[0];
}
*/

//https://storybook.js.org/addons/storybook-addon-themes
export const decorators = [
  withWrapper,
  //stencilWrapper,

  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    //defaultTheme: 'light',
    attributeName: 'data-cbp-theme',
  }),
  //*/
];

