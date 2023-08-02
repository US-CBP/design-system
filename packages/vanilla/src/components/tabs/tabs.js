class Tabset {
  constructor(tabset) {
    this.tabset = tabset;
    this.tabs = this.tabset.querySelectorAll('button');
    this.focusIndex=0;

    // Set the initial active state
    this.initTabset();
    
    // Set event listeners on each tab control
    this.tabs.forEach(el => {
      el.addEventListener('click', (e) => {
        this.handleTabClick(e);
      });
    });

    // Listen for arrow keys within the tabset
    this.tabset.addEventListener('keydown', (e) => {
      this.handleNavigation(e);
    });
  }

  initTabset() {
    let activeTab = this.tabs[0];

    // If a reference tab was not passed in, check for a default tab, otherwise set the first one active
    this.tabs.forEach( tab => {
      if (tab.getAttribute('aria-selected') === 'true') activeTab = tab;
    });
    this.setActiveTab(activeTab);
  }

  setActiveTab(activatedTab){
    this.tabs.forEach( (tab, index) => {
      let panelid=tab.getAttribute('aria-controls');
      let panel=document.querySelector(`#${panelid}`);

      if(!panel) {
        console.error(`Tab does not reference valid tab panel with id ${panelid}`)
        return;
      }

      if(activatedTab === tab) {
        tab.setAttribute('aria-selected','true');
        tab.setAttribute('tabindex', '0');
        this.focusIndex = index;
        panel.removeAttribute('hidden');
      }
      else {
        tab.setAttribute('aria-selected','false');
        tab.setAttribute('tabindex', '-1');
        panel.setAttribute('hidden','');
      }
    });
  }

  handleTabClick(e) {
    const clickedButton = e.target.closest('button');
    this.setActiveTab(clickedButton);
  
    // Emit a custom event so that the developer can listen to
    const tabActivatedEvent = new CustomEvent("tabActivated", { 
      detail: {
        tab: clickedButton,
        name: clickedButton.name || clickedButton.innerText,
        nativeEvent: e
      }
    });
    this.tabset.dispatchEvent(tabActivatedEvent);
    // Set focus manually because Safari doesn't do this automatically, which breaks the keyboard navigation event listeners
    clickedButton.focus();
  }

  handleNavigation(e) {
    e.key == 'ArrowRight' && this.keyboardNavigateForward(e);
    e.key == 'ArrowLeft' && this.keyboardNavigateBackward(e);
    e.key == 'Home' && this.focusTab(0);
    e.key == 'End' && this.focusTab(this.tabs.length - 1);
  }

  keyboardNavigateForward(e) {
    this.focusIndex == this.tabs.length - 1
      ? this.focusTab(0)
      : this.focusTab(this.focusIndex + 1);
  }

  keyboardNavigateBackward(e) {
    this.focusIndex == 0
      ? this.focusTab(this.tabs.length - 1)
      : this.focusTab(this.focusIndex - 1);
  }

  focusTab(i) {
    this.focusIndex = i;
    this.tabs[i].focus();
  }

}

export default Tabset;
