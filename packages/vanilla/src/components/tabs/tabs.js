class Tabset {
  constructor(tabset) {
    this.tabset = tabset;
    this.tabs = this.tabset.querySelectorAll('button');
    
    console.log(tabset);

    // Set event listeners on each tab control
    this.tabs.forEach(el => {
      el.addEventListener('click', (e) => {
        this.handleTabClick(e);
      });
    });

    // Set the initial active state
    this.initTabset();
  }

  initTabset() {
    let err;
    let activeTab = this.tabs[0];

    // If a reference tab was not passed in, check for a default tab, otherwise set the first one active
    this.tabs.forEach( tab => {
      if (tab.getAttribute('aria-selected') === 'true') activeTab = tab;
    });
    console.log({activeTab})
    this.setActiveTab(activeTab);
  }

  setActiveTab(activatedTab){
    this.tabs.forEach(tab => {
      let panelid=tab.getAttribute('aria-controls');
      let panel=document.querySelector(`#${panelid}`);

      if(!panel) {
        console.log(`Tab does not reference valid tab panel with id ${panelid}`)
        return;
      }

      if(activatedTab === tab) {
        tab.setAttribute('aria-selected','true');
        panel.removeAttribute('hidden');
      }
      else {
        tab.setAttribute('aria-selected','false');
        panel.setAttribute('hidden','');
      }
    });
  }

  handleTabClick(e) {
    const clickedButton = e.target.closest('button');
    this.setActiveTab(clickedButton);
  
    // Emit a custom event so that the developer can listen to
    const tabActivatedEvent = new CustomEvent("buttonToggle", { 
      detail: {
        tab: clickedButton,
        name: clickedButton.name || clickedButton.innerText,
        nativeEvent: e
      }
    });
    console.log({tabActivatedEvent});
    this.tabset.dispatchEvent(tabActivatedEvent);
  }

}

export default Tabset;
