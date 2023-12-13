// .storybook/manager.js

import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

import cbpLogo from '../assets/images/CBP_SEAL.svg';

const theme =  create({
  base: 'light',
  // Brand assets
  brandTitle: 'CBP Design System | HTML',
  brandImage: cbpLogo,
  brandTarget: '_self',
});


// Investigate: You (or an addon) are using the 'config' preset field. This has been replaced by 'previewAnnotations' and will be removed in 8.0
addons.setConfig({
  theme,
  toolbar: {
    zoom: { hidden: true }
  }
});