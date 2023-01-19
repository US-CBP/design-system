import { create } from '@storybook/theming';
import cbpLogo from '@cbpds/styles/dist/assets/images/CBP_SEAL.svg';

export default create({
  base: 'light',

  // Typography
  fontBase: '"Roboto", Calibri, Tahoma, san-serif',
  fontCode: 'monospace',

  // Brand
  brandTitle: 'U.S. Customs & Border Protection Design System',
  brandImage: cbpLogo,
  brandTarget: '_self'
})