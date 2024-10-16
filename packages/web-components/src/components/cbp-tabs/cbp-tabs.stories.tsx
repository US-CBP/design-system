export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      name: 'Tabs (slotted)',
      description: 'Controls props and content for the child components.',
      control: 'object',
    },
    accessibilityText: {
      control: 'text',
    },
    withIcon: {
      control: 'boolean',
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

function createTabs(tabs, withIcon, withBadge,) {
  const html = tabs.map(({ name, label, color, accessibilityText,  selected }) => {
    return `
      <cbp-tab 
        name="${name}"
        ${color !== 'default' ? `color=${color}` : ''}
        ${accessibilityText ? `accessibility-text=${accessibilityText}}` : ''}
        ${selected == true ? 'selected' : ''}
      >
        ${withIcon ? `<cbp-icon name='check' sx='{"padding-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>` : ''}
        ${label}
        ${withBadge ? `<cbp-badge sx='{"margin-inline-start":"var(--cbp-space-2x)"}'>22</cbp-badge>` : ''}
      </cbp-tab>
    `;
  });
  return html.join('');
}

function createTabPanels(tabs) {
  const html = tabs.map(({ name, panelContent }) => {
    return `
      <cbp-tab-panel name=${name}>
        ${panelContent}
      </cbp-tab-panel>`;
  });
  return html.join('');
}

const Template = ({ tabs, accessibilityText, withIcon, withBadge,context, sx }) => {
  return ` 
    <cbp-tabs
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${createTabs(tabs, withIcon, withBadge)}
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
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 2 content.',
      selected: false,
    },
    {
      name: 'tab3',
      label: 'Tab 3 is longer',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 3 content.',
      selected: false,
    },
    {
      name: 'tab4',
      label: 'Tab 4',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 4 content.',
      selected: false,
    },
    {
      name: 'tab5',
      label: 'Tab 5',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 5 content.',
      selected: false,
    },
    {
      name: 'tab6',
      label: 'Tab 6',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 6 content.',
      selected: false,
    },
    {
      name: 'tab7',
      label: 'Tab 7',
      accessibilityText: '',
      color: 'default',
      panelContent: 'Tab panel 7 content.',
      selected: false,
    },
  ],
  accessibilityText: 'Tabs Example',
};
