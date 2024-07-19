import { create } from '@storybook/theming/create';

export default create({
  base: globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', //'light',
  brandTitle: 'CBP Design System | Web Components',
  brandImage: '../assets/images/cbp-seal.svg',
  brandTarget: '_self',
});