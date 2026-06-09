export default {
  title: 'Content/Tabs',
  tags: ['beta'],
  argTypes: {
    tabs: {
      name: 'Tabs (slotted)',
      description: 'Controls props and content for the child components.',
      control: 'object',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    flexBasis:{
      description: 'Sets the flex-basis of the tab container',
      control: 'text',
      if: {arg: "orientation", eq: "vertical"}
    },
    accessibilityText: {
      control: 'text',
    },
    withIcon: {
      control: 'boolean',
    },
    onlyIcon:{
      control: 'boolean'
    },
    withBadge: {
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

function createTabs(tabs, withIcon, onlyIcon, withBadge, orientation) {
  const html = tabs.map(({ name, label, icon, color, accessibilityText,  selected }) => {
    console.log('logic check: ', withIcon, onlyIcon, label);
    return `
      <cbp-tab 
        name="${name}"
        ${color !== 'default' ? `color="${color}"` : ''}
        ${accessibilityText ? `accessibility-text="${accessibilityText}}"` : ''}
        ${selected == true ? 'selected' : ''}
      >
        ${withIcon || onlyIcon ? `<cbp-icon ${label == undefined ? '' : `size=var(--cbp-space-6x)`} name="${icon}"></cbp-icon>` : ''} ${label && !onlyIcon ? label : ''} ${withBadge && !onlyIcon ? `<cbp-badge ${orientation=="vertical" ? `sx='{"margin-left": "auto"}'`: ``}>22</cbp-badge>` : ''}
      </cbp-tab>
    `;
  });
  return html.join('');
}

function createTabPanels(tabs) {
  const html = tabs.map(({ name, panelContent }) => {
    return `
      <cbp-tab-panel name="${name}">
        ${panelContent}
      </cbp-tab-panel>
    `;
  });
  return html.join('');
}

const Template = ({ tabs, orientation, flexBasis, accessibilityText, withIcon, onlyIcon, withBadge,context, sx }) => {
 return `
 ${orientation =='vertical' ? `
    <cbp-flex
      direction='row'
      gap="1rem"
    >
      <cbp-flex-item
        flex-basis=${flexBasis}
      >
        ` : ``}
        <cbp-tabs
          ${orientation ? `orientation="${orientation}"` : ''}
          ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
          ${context && context != 'light-inverts' ? `context="${context}"` : ''}
          ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
        >
          ${createTabs(tabs, withIcon, onlyIcon, withBadge, orientation)}
        </cbp-tabs>

        ${orientation =='vertical' ? `
 
      </cbp-flex-item>
      
      <cbp-flex-item
        flex-grow='1'
      >` : ``}
        ${createTabPanels(tabs)}
      ${orientation =='vertical' ? `
        </cbp-flex-item>
    </cbp-flex>` : ``}
 `;
};

export const Tabs = Template.bind({});

Tabs.args = {
  tabs: [
    {
      name: 'tab1',
      label: 'Tab 1',
      icon: 'address-book',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 1 content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false,
      withIcon: true,
      withBadge: true
    },
    {
      name: 'tab2',
      label: 'Tab 2',
      icon: 'clock',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 2 content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false,
    },
    {
      name: 'tab3',
      label: 'Tab 3 is longer',
      icon: 'headset',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 3 content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false,
    },
    {
      name: 'tab4',
      label: 'Tab 4',
      icon: 'landmark',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 4 content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false,
    },
    {
      name: 'tab5',
      label: 'Tab 5',
      icon: 'computer',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 5 content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false,
    },
    {
      name: 'tab6',
      label: 'Tab 6',
      icon: 'book',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 6 content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false,
    },
    {
      name: 'tab7',
      label: 'Tab 7',
      icon: 'circle-info',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 7 content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false,
    },
  ],
  accessibilityText: 'Tabs Example',
  flexBasis: 'auto'
};
