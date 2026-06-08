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
    return `
      <cbp-tab 
        name="${name}"
        ${color !== 'default' ? `color="${color}"` : ''}
        ${accessibilityText ? `accessibility-text="${accessibilityText}}"` : ''}
        ${selected == true ? 'selected' : ''}
      >
        ${withIcon || onlyIcon ? `<cbp-icon ${label ? '' : `size=var(--cbp-space-6x)`} name="${icon}"}></cbp-icon>` : ''} ${label && !onlyIcon ? label : ''} ${withBadge && !onlyIcon ? `<cbp-badge ${orientation=="vertical" ? `sx='{"margin-left": "auto"}'`: ``}>22</cbp-badge>` : ''}
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

const Template = ({ tabs, orientation, accessibilityText, withIcon, onlyIcon, withBadge,context, sx }) => {
  return ` 
    <cbp-tabs
      ${orientation ? `orientation="${orientation}"` : ''}
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${createTabs(tabs, withIcon, onlyIcon, withBadge, orientation)}
    </cbp-tabs>

    ${createTabPanels(tabs)}
 `;
};

export const Tabs = Template.bind({});
4;
Tabs.args = {
  tabs: [
    {
      name: 'tab1',
      label: 'Tab 1',
      icon: 'address-book',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 1 content.',
      selected: false,
      withIcon: true,
      withBadge: true
    },
    {
      name: 'tab2',
      label: 'Tab 2',
      icon: 'angle-down',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 2 content.',
      selected: false,
    },
    {
      name: 'tab3',
      label: 'Tab 3 is longer',
      icon: 'arrow-right',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 3 content.',
      selected: false,
    },
    {
      name: 'tab4',
      label: 'Tab 4',
      icon: 'arrow-right-from-bracket',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 4 content.',
      selected: false,
    },
    {
      name: 'tab5',
      label: 'Tab 5',
      icon: 'bars',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 5 content.',
      selected: false,
    },
    {
      name: 'tab6',
      label: 'Tab 6',
      icon: 'book',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 6 content.',
      selected: false,
    },
    {
      name: 'tab7',
      label: 'Tab 7',
      icon: 'caret-down',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 7 content.',
      selected: false,
    },
  ],
  accessibilityText: 'Tabs Example',
};
