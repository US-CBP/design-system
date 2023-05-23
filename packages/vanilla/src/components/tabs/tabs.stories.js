export default {
  title: 'Patterns/Tabs',
  argTypes: {
    tabsObj: {
      name: 'Tabs Object',
      description: 'This object contains the attributes/values for the tabs in the story, including tab label, panelid, and danger (Boolean).',
      control: { type: 'object' }
    },
  },
};


const TabsTemplate = ({tabsObj: { tab1, tab2, tab3, tab4 }}) => {
  return `
    <div class="cbp-tabset" role="tablist">
      <button class="cbp-tab ${tab1.danger ? 'cbp-tab--danger' : ''}" type="button" role="tab" aria-controls=${tab1.panelid}>
        ${tab1.danger ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
        ${tab1.label}
      </button>
      <button class="cbp-tab ${tab2.danger ? 'cbp-tab--danger' : ''}" type="button" role="tab" aria-controls=${tab2.panelid}>
        ${tab2.danger ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
        ${tab2.label}
      </button>
      <button class="cbp-tab ${tab3.danger ? 'cbp-tab--danger' : ''}" type="button" role="tab" aria-controls=${tab3.panelid}>
        ${tab3.danger ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
        ${tab3.label}
      </button>
      <button class="cbp-tab ${tab4.danger ? 'cbp-tab--danger' : ''}" type="button" role="tab" aria-controls=${tab4.panelid}>
        ${tab4.danger ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
        ${tab4.label}
      </button>
    </div>

    <div class="cbp-tab-panel" id=${tab1.panelid} role="tabpanel">
      <p>Tab panel 1 contents.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

    <div class="cbp-tab-panel" id=${tab2.panelid} role="tabpanel">
      <p>Tab panel 2 contents: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>

    <div class="cbp-tab-panel" id=${tab3.panelid} role="tabpanel">
      <p>Tab panel 3 contents.</p>
    </div>

    <div class="cbp-tab-panel" id=${tab4.panelid} role="tabpanel">
      <p>Tab panel 4 contents.</p>
    </div>

  `;
};

export const Tabs = TabsTemplate.bind({});
Tabs.args = {
  tabsObj: {
    tab1: {
      label: 'Tab 1 Label',
      panelid: 'tabpanel1',
      danger: false
    },
    tab2: {
      label: 'Tab 2 Label',
      panelid: 'tabpanel2',
      danger: false
    },
    tab3: {
      label: 'Tab 3 Label',
      panelid: 'tabpanel3',
      danger: true
    },
    tab4: {
      label: 'Tab 4 Label',
      panelid: 'tabpanel4',
      danger: false
    },

  },
};