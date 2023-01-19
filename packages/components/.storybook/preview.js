import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@cbpds/styles/dist/styles.min.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#f5f6f7' },
      { name: 'dark', value: '#2d2e2f' },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
