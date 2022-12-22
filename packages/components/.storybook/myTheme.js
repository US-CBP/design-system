import { create } from '@storybook/theming';
import cbpLogo from 'styles/dist/assets/images/cbp_seal_cmyk.png';

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