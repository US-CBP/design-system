import { Component, Element, Listen, Host, h } from '@stencil/core';
import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss'
})
export class CbpAppHeader {
  
  private navItems: HTMLCbpNavItemElement[] = [];
  private currentItem: HTMLCbpNavItemElement;

  @Element() host: HTMLCbpAppHeaderElement;

  @Listen('drawerClose', { target: 'body'})
  handleNavDrawerClose(e) {
    const Subnav = e.target.querySelector('cbp-subnav');
    // Only update focus and current states if the drawer holds a subnav using state store.
    if(Subnav?.store == true) {
      let active = this.host.querySelector(`[name="${state.activeItemName}"] cbp-button > button `) as HTMLButtonElement;
      active?.focus(); // TechDebt: this needs to be revisited for navigation events that may auto-close the drawer.
      //this.setActiveNav(this.host.querySelector(`[name="${state.currentParent}"]`)) 
    }
  }

  updateCurrentItem(newValue){
    const CurrentItem = this.host.querySelector(`cbp-nav-item[name="${newValue}"]`) as HTMLCbpNavItemElement;
    this.setCurrentNav(CurrentItem);
  }

  // Called from navItem click as well as state updates.
  setCurrentNav(activatedNav) {
    this.currentItem = activatedNav;
    this.navItems.forEach((navItem: HTMLCbpNavItemElement) => {
      if (activatedNav == navItem) navItem.current = true;
      else navItem.current = false;
    });
  }

  updateActiveItem(newValue){
    const ActiveItem = this.host.querySelector(`cbp-nav-item[name="${newValue}"] button`) as HTMLCbpNavItemElement;
    setTimeout(() => {
      ActiveItem?.focus()
    }, 101) // Note: Time 101 is set due to cbp-drawer setting @ 100
  }


  componentWillLoad() {
    this.navItems = Array.from(this.host.querySelectorAll('cbp-nav-item'));
    this.currentItem = this.host.querySelector('cbp-nav-item[current]');
    
    // Set the shared states as well
    state.currentPage = state.currentParent = this.currentItem?.name;

    // Attach event listeners to the child navItem
    this.navItems.forEach(navItem => {
      navItem.addEventListener('navItemClick', e => this.setCurrentNav(e.detail.host));
    });
  }

  render() {
    if(this.currentItem?.name != state.currentParent) {
      this.updateCurrentItem(state.currentParent);
    }
    
    return (
      <Host>
        <slot name="cbp-home" />
        <slot />
      </Host>
    );
  }
}

