export default {
  title: 'Components/Drawer',
  tags: ['beta'],
  argTypes: {
    position: {
      description: 'The positioning of the drawer relative to the viewport.',
      control: 'radio',
      options: ['left', 'right'],
    },
    open: {
      description: 'Specifies whether the drawer is open or closed.',
      control: 'boolean',
    },    
    persistAt: {
      control: 'text',
    },
    uid: {
      description: 'A unique `id` applied to the drawer and referenced by the control.',
      control: 'text',
    },
    accessibilityText: {
      description: 'Accessibility text is required to label the drawer (dialog) and is applied as an `aria-label`.',
      control: 'text',
    },
    withIcon: {
      control: 'boolean',
    },
    context : {
      control: 'select',
      options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

const Template = ({ position, withIcon, open, persistAt, uid, accessibilityText, context, sx }) => {
  return `
    <cbp-hide 
      ${persistAt ? `hide-at=${persistAt}` : ''}
    >
      <cbp-button
        type="button"
        color="secondary"
        variant="square"
        accessibility-text="Open Drawer"
        target-prop="open"
        controls=${uid}
      >
        <cbp-icon name="bars"></cbp-icon>
      </cbp-button>
    </cbp-hide>

    <cbp-drawer
      ${position ? `position="${position}"` : ''}
      ${open ? 'open' : ''}
      ${persistAt ? `persist-at="${persistAt}"` : ''}
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      ${uid ? `uid="${uid}"` : ''}
    >
      <cbp-panel
        aria-labelledby="panelheader"
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="panelheader"
        >
          ${withIcon ? `<cbp-icon name='triangle-exclamation'></cbp-icon>` : ''}
          Drawer Header
        </cbp-typography>
        <p>Sidebar Content</p>
      </cbp-panel>
    </cbp-drawer>
  `;
};

export const Drawer = Template.bind({});
Drawer.args = {
  position: 'left',
  uid: 'drawer',
};


const UserPreferencesTemplate = ({ position, open, persistAt, uid, accessibilityText, withIcon, context}) => {
  return `
    <cbp-button
      type="button"
      color="secondary"
      variant="square"
      accessibility-text="Open Drawer"
      target-prop="open"
      controls=${uid}
    >
      <cbp-icon name="bars"></cbp-icon>
    </cbp-button>

    <cbp-drawer
      ${position ? `position="${position}"` : ''}
      ${open ? 'open' : ''}
      ${persistAt ? `persist-at="${persistAt}"` : ''}
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      sx='{
        "--cbp-drawer-close-button-color":"var(--cbp-color-white)"
      }'
      ${uid ? `uid=${uid}` : ''}
    >
      <cbp-panel
        aria-labelledby="userprefs-panel-header"
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        sx='{
          "--cbp-panel-header-color-dark": "var(--cbp-color-text-lighter)",
          "--cbp-panel-header-color-bg-dark": "var(--cbp-color-branding-dhs-blue)"
        }'
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="userprefs-panel-header"
        >
        
          ${withIcon ? `<cbp-icon name='user'></cbp-icon>` : ''}
          User Preferences
        </cbp-typography>
        <p>Drawer Content</p>
      </cbp-panel>
    </cbp-drawer>
  `;
};

export const UserPreferences = UserPreferencesTemplate.bind({});
UserPreferences.args = {
  position: 'right',
  uid: 'drawer',
  context: 'dark-always',
};