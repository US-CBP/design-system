import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
//import { addons } from '@storybook/addons';
import CBPTheme from './theme';

addons.setConfig({
  theme: CBPTheme,
  //theme: themes.dark,
  toolbar: {
    //zoom: { hidden: true }
  }
});