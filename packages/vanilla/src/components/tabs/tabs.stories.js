export default {
  title: 'Patterns/Tabs',
  argTypes: {},
};


const TabsTemplate = () => {
  return `
    <div class="cbp-tabset">
      <button class="cbp-tab" type="button" role="tab" name="Tab 1" aria-controls="panel1">Tab 1 Label</button>
      <button class="cbp-tab" type="button" role="tab" aria-controls="panel2">Tab 2 Label</button>
      <button class="cbp-tab" type="button" role="tab" aria-controls="panel3">Tab 3 Label</button>
      <button class="cbp-tab" type="button" role="tab" aria-controls="panel4">Tab 4 Label</button>
    </div>

    <div class="cbp-tab-panel" id="panel1" role="tabpanel">
      <p>Tab panel 1 contents.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

    <div class="cbp-tab-panel" id="panel2" role="tabpanel">
      <p>Tab panel 2 contents: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>

    <div class="cbp-tab-panel" id="panel3" role="tabpanel">
      <p>Tab panel 3 contents.</p>
    </div>

    <div class="cbp-tab-panel" id="panel4" role="tabpanel">
      <p>Tab panel 4 contents.</p>
    </div>

  `;
};

export const Tabs = TabsTemplate.bind({});
Tabs.args = {};



const DangerTabsTemplate = () => {
  return `
    <div class="cbp-tabset">
      <button class="cbp-tab" type="button" role="tab" aria-controls="panel1">Tab 1 Label</button>
      <button class="cbp-tab cbp-tab--danger" type="button" role="tab" aria-controls="panel2"><i class="fas fa-exclamation-triangle"></i> Danger Tab</button>
      <button class="cbp-tab" type="button" role="tab" aria-controls="panel3">Tab 3</button>
    </div>

    <div class="cbp-tab-panel" id="panel1" role="tabpanel">
      <p>Tab panel 1 contents.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

    <div class="cbp-tab-panel" id="panel2" role="tabpanel">
      <p>Tab panel 2 contents: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>

    <div class="cbp-tab-panel" id="panel3" role="tabpanel">
      <p>Tab panel 3 contents.</p>
    </div>
  `;
};

export const DangerTabs = DangerTabsTemplate.bind({});
DangerTabs.args = {};
DangerTabs.storyName="Tabs - Danger";
