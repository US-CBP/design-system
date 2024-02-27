export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      name: 'Tabs (slotted)',
      description: 'Controls props and content for the child components.',
      control: 'object'
    },
    accessibilityText: {
      control: 'text'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function createTabs(tabs) {
  const html = tabs.map(({ name, label, accessibilityText, selected}) => {
    return `
      <cbp-tab 
        name="${name}"
        ${accessibilityText ? `accessibility-text=${accessibilityText}}` : ''}
        ${selected == true ? 'selected' : ''}
      >
        ${label}
      </cbp-tab>
    `
  })
  return html.join("")
};

function createTabPanels(tabs) {
  const html = tabs.map(({ name, panelContent}) => {
    return `
      <cbp-tab-panel name=${name}>
        ${panelContent}
      </cbp-tab-panel>`
  })
  return html.join("")
};


const Template = ({ tabs, accessibilityText, sx }) => {
  return ` 
    <cbp-tabs
      ${ accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${createTabs(tabs)}
    </cbp-tabs>
    ${createTabPanels(tabs)}
 `;
};

export const Tabs = Template.bind({});4
Tabs.args = {
  tabs: [
    {
      name: "tab1",
      label: "Tab 1",
      accessibilityText: "",
      panelContent: "Tab panel 1 content.",
      selected: false,
    },
    {
      name: "tab2",
      label: "Tab 2",
      accessibilityText: "",
      panelContent: "Tab panel 2 content.",
      selected: false,
    },
    {
      name: "tab3",
      label: "Tab 3",
      accessibilityText: "",
      panelContent: "Tab panel 3 content.",
      selected: false,
    },
    {
      name: "tab4",
      label: "Tab 4",
      accessibilityText: "",
      panelContent: "Tab panel 4 content.",
      selected: false,
    },
    {
      name: "tab5",
      label: "Tab 5",
      accessibilityText: "",
      panelContent: "Tab panel 5 content.",
      selected: false,
    },
    {
      name: "tab6",
      label: "Tab 6",
      accessibilityText: "",
      panelContent: "Tab panel 6 content.",
      selected: false,
    },
  ],
  accessibilityText: 'Tabs Example'
}
