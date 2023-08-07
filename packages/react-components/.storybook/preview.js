import { withThemeByDataAttribute } from '@storybook/addon-styling';

import '@cbpds/vanilla/dist/style.css';

const CUSTOM_VIEWPORTS = {
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

/** @type { import('@storybook/react').Preview } */
export const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
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
    viewport: {
      viewports: CUSTOM_VIEWPORTS
    }
  },
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-cbp-theme',
  }),
];
