export default {
  title: 'Components/Drawer',
  tags: ['autodocs'],
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

const Template = ({ position, withIcon, open, uid, accessibilityText, context, sx }) => {
  return `
    <cbp-button
      type="button"
      color="secondary"
      accessibility-text="Open Drawer"
      target-prop="open"
      controls=${uid}
    >
      <cbp-icon name="bars"></cbp-icon>
    </cbp-button>

    <cbp-drawer
      ${position ? `position=${position}` : ''}
      ${open ? `open=${open}` : ''}
      ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      ${uid ? `uid=${uid}` : ''}
    >
      <cbp-panel
        aria-labelledby="panelheader"
        role="complementary"
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="panelheader"
        >
          ${withIcon ? `<cbp-icon name='triangle-exclamation'></cbp-icon>` : ''}
          Sidebar Header
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
  context: 'light-always'
};


const UserPreferencesTemplate = ({ position, open, uid, accessibilityText, context, sx }) => {
  return `
    <cbp-button
      type="button"
      color="secondary"
      accessibility-text="Open Drawer"
      target-prop="open"
      controls=${uid}
    >
      <cbp-icon name="bars"></cbp-icon>
    </cbp-button>

    <cbp-drawer
      ${position ? `position=${position}` : ''}
      ${open ? `open=${open}` : ''}
      ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      ${uid ? `uid=${uid}` : ''}
    >
      <cbp-panel
        aria-labelledby="panelheader"
        role="complementary"
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="panelheader"
        >
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
  context: 'dark-always'
};
