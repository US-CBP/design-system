import { addons } from '@storybook/addons';
import { create } from '@storybook/theming'

import cbpLogo from '@cbpds/vanilla/dist/assets/images/CBP_SEAL.svg'

const theme =  create({
  base: 'light',
  // Brand assets
  brandTitle: 'CBP Design System | React',
  brandImage: cbpLogo,
  brandTarget: '_self',
});

addons.setConfig({
  theme,
  toolbar: {
    zoom: { hidden: true },
  },
});