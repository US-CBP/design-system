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

addons.setConfig({
  theme,
});