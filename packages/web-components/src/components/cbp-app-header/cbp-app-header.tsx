import { Component, Element, Host, h, Listen } from '@stencil/core';
import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss'
})
export class CbpAppHeader {

  
  private navItems: HTMLCbpNavItemElement[] = [];

  @Element() host: HTMLElement;
  @Listen('drawerClose', { target: 'body'})
  handleNavDrawerClose(e) {
    if(e.target.previousElementSibling == this.host){
      let active = this.host.querySelector(`[name="${state.activeItemName}"] cbp-button > button `) as HTMLElement;
      active.focus();  
      this.setActiveNav(this.host.querySelector(`[name="${state.currentParent}"]`));
    }
  }

  initNavItemset() {
    state.currentPage=this.navItems[0].name;
    this.setActiveNav(this.navItems[0]);
  }

  setActiveNav(activatedNav) {
    this.navItems.forEach((navItem: HTMLCbpNavItemElement) => {
      let link = navItem.querySelector('a, button');

      if (activatedNav == navItem){
        navItem.selected = true;
        link.setAttribute('aria-current', 'true');
      } else {
        navItem.selected = false;
        link.hasAttribute('aria-current') ? link.removeAttribute('aria-current') : '';
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
    /** stored state needed in render to trigger rerender on value update */
    console.log('---App Header Render---');
    console.log(state.currentPage)
    console.log(state.currentParent)
    console.log(state.activeItemName)
    return (
      <Host>
        <slot name="cbp-home" />
        <slot />
      </Host>
    );
  }
}

