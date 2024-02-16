import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-tabs',
  styleUrl: 'cbp-tabs.scss',
})

export class CbpTabs {

  private tabs: HTMLCbpTabElement[] = [];
  private selectedIndex: number = 0;
  private focusIndex: number = 0;
  
  @Element() host: HTMLElement;

  /** The accessible label of the tablist. Required unless `aria-labelledby` is specified on the host tag directly. */
  @Prop() accessibilityText: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  initTabset() {
    // check for a default tab, otherwise set the first one active
    let activeTab = this.tabs[0];
    this.tabs.forEach(tab => {
      if (tab.selected === true) activeTab = tab;
    });
    this.setActiveTab(activeTab);
  }

  setActiveTab(activatedTab) {
    this.tabs.forEach((tab: HTMLCbpTabElement, index) => {
      let button = tab.querySelector('button');
      let panelid = button.getAttribute('aria-controls');
      let panel: HTMLCbpTabPanelElement = document.querySelector(`#${panelid}`);

      if (!panel) {
        console.error(`Error: cbp-tab does not reference valid tab panel with id ${panelid}`);
        return;
      }

      if (activatedTab == tab) {
        tab.selected = true;
        this.selectedIndex = this.focusIndex = index;
        panel.selected = true;
      } else {
        tab.selected = false;
        panel.selected = false;
      }
    });
  }

  keyboardNav(key) {
    const l = this.tabs.length - 1;
    const n = {
      Home: 0,
      ArrowLeft: -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l,
      ArrowRight: l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0,
      End: l,
      Tab: this.focusIndex=this.selectedIndex, // reset the focusIndex when tabbing out of the tablist
    }[key];
    if (n !== undefined) {
      this.tabs[n].querySelector('button').focus();
      this.focusIndex = n;
    }
  }

  componentWillLoad() {
    // get all children, taking into account nested tabs
    this.tabs = Array.from(this.host.querySelectorAll('cbp-tab')).filter(tab => tab.closest('cbp-tabs') == this.host);
    console.log('this.tabs: ', this.tabs);

    // Attach event listeners to the child tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('tabClicked', e => this.setActiveTab(e.detail.host));
    });

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, Object.assign({}, this.sx));
  }

  componentDidLoad() {
    this.initTabset();
  }

  render() {
    return (
      <Host
        role="tablist"
        aria-label={this.accessibilityText}
        onKeydown={({ key }) => {
          this.keyboardNav(key);
        }}
      >
        <slot />
      </Host>
    );
  }
}
