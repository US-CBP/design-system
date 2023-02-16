import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const CUSTOM_VIEWPORTS = {
  small: {
    name: "Small Grid",
    styles: {
      width: "599px",
      height: "100%"
    },
    type: 'desktop'
  },
  medium: {
    name: "Medium Grid",
    styles: {
      width: "1023px",
      height: "100%"
    },
    type: 'desktop'
  },
  large: {
    name: "Large Grid",
    styles: {
      width: "1439px",
      height: "100%"
    },
    type: 'desktop'
  },
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      {
        name: 'light',
        value: '#f5f6f7'
      },
      {
        name: 'dark',
        value: '#2d2e2f'
      }
    ]
  },
  viewport: {
    viewports: {...CUSTOM_VIEWPORTS, ...MINIMAL_VIEWPORTS}
  },
  html: {
    prettier: {
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: "strict",
      removeEmptyComments: true,
      removeComments: /^\s*remove me\s*$/,
    },
    highlighter: {
      showLineNumbers: true,
      wrapLines: true,
    },
    transform: (code) => {
      // DEG: keeping this as an example because it may solve other issues I've encountered
      // Remove attributes `_nghost` and `ng-reflect` injected by Angular:
      return code.replace(/(?:_nghost|ng-reflect).*?="[\S\s]*?"/g, "");
    },
  },
};