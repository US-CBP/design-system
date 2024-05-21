import { themes } from '@storybook/theming';

import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import { setWcStorybookHelpersConfig } from "wc-storybook-helpers";
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import {defineCustomElements} from '../dist/loader';

defineCustomElements();
setWcStorybookHelpersConfig({
  //hideArgRef: true,
  setComponentVariable: true,
  renderDefaultValues: false,
  hideArgRef: false,
});
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


/** @type { import('@storybook/web-components').Preview } */
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
    // DEG: Enabling custom viewports seems to be linked to the HTML tab showing generated code instead of source/story code. Disabling custom viewports for further testing.
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
        proseWrap: "always",
        bracketSameLine: false,
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
// DEG: 3/14/2024 - Adding theme=light temporarily until dark mode is implemented properly
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
  /*
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-cbp-theme',
  }),
  */
];

