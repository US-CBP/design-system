import { addons, type State } from 'storybook/manager-api';
import CBPTheme from './theme';

addons.setConfig({
  theme: CBPTheme,
  showToolbar: true,
  toolbar: {
    //zoom: { hidden: true },
    backgrounds: { hidden: true } // doesn't seem to work for background buttons; does for zoom though
  },
  layoutCustomisations: {
    // Always hide the toolbar on docs pages, and always show on stories (ideally respect user preferences elsewhere, but it's auto-hiding for me).
    showToolbar(state: State, defaultValue: boolean) {
      if (state.viewMode === 'docs') {
        return false;
      }
      return true;
      //return defaultValue;
    },
  },
});