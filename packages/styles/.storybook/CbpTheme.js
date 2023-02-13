// .storybook/YourTheme.js

import { create } from '@storybook/theming';
import cbpLogo from '../assets/images/CBP_SEAL.svg';

export default create({
  base: 'light',
  brandTitle: 'CBP Design System | HTML',
  brandImage: cbpLogo,
  brandTarget: '_self',
});