import { Component, Element, Host, h, Listen } from '@stencil/core';
import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss'
})
export class CbpAppHeader {

  
  private navItems: HTMLCbpNavItemElement[] = [];

  @Element() host: HTMLElement;
  @Listen('drawerClose')
  handleNavDrawerClose() {
    var current = this.host.querySelector('[name=\"' + state.activeItemName + '\"] cbp-button').firstElementChild as HTMLAnchorElement;
    current.focus();
  }

  initNavItemset() {
    // check for a default navItem, otherwise set the first one active
    let activeNavItem;
    activeNavItem =  this.host.querySelector('cbp-nav-item[selected]');

    this.setActiveNav(activeNavItem);
  }

  setActiveNav(activatedNav) {
    this.navItems.forEach((navItem: HTMLCbpNavItemElement) => {
      let link = navItem.querySelector('a, button');

      if (activatedNav == navItem){
        navItem.selected = true;
        link.setAttribute('aria-current', 'true');
      } else {
        navItem.selected = false;
        link.removeAttribute('aria-current');
      }
    })
  }

  componentWillLoad() {
    this.navItems = Array.from(this.host.querySelectorAll('cbp-nav-item'));

    // Attach event listeners to the child navItem
    this.navItems.forEach(navItem => {
      navItem.addEventListener('navClicked', e => this.setActiveNav(e.detail.host));
    }); 
  }

  componentDidLoad() {
    this.initNavItemset();
  }

  render() {
    return (
      <Host>
        <slot name="cbp-home" />
        <slot />
      </Host>
    );
  }
}

