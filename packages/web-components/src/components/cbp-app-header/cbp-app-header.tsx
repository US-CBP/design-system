import { Component, Element, Host, h, Listen } from '@stencil/core';
import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss'
})
export class CbpAppHeader {
  
  private navItems: HTMLCbpNavItemElement[] = [];
  private currentItem;

  @Element() host: HTMLElement;

  @Listen('drawerClose', { target: 'body'})
  handleNavDrawerClose(e) {
    const Subnav = e.target.querySelector('cbp-subnav');
    // Only update focus and current states if the drawer holds a subnav using state store.
    if(Subnav?.store == true) {
      let active = this.host.querySelector(`[name="${state.activeItemName}"] cbp-button > button `) as HTMLButtonElement;
      active?.focus(); // TechDebt: this needs to be revisited for navigation events that may auto-close the drawer.
      this.setActiveNav(this.host.querySelector(`[name="${state.currentParent}"]`)) 
    }
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
    });
  }


  componentWillLoad() {
    this.navItems = Array.from(this.host.querySelectorAll('cbp-nav-item'));
    this.currentItem = this.host.querySelector('cbp-nav-item[selected]');
    state.currentPage = state.currentParent = this.currentItem?.name;

    // Attach event listeners to the child navItem
    this.navItems.forEach(navItem => {
      navItem.addEventListener('navClicked', e => this.setActiveNav(e.detail.host));
    }); 

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

