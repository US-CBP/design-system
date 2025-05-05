import { Component, Element, Host, h, Listen } from '@stencil/core';
import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss'
})
export class CbpAppHeader {

  
  private navItems: HTMLCbpNavItemElement[] = [];
  private subnavItems : HTMLCbpSubnavItemElement[] = [];

  @Element() host: HTMLElement;
  @Listen('drawerClose')
  handleNavDrawerClose(e) {
    if(e.target.parentElement == this.host){
      let active = this.host.querySelector(`[name="${state.activeItemName}"] cbp-button > button `) as HTMLElement;
      active.focus();  
      // this.host.querySelector(`[name="${state.currentParent}"] cbp-button > button > *`).setAttribute('aria-current', 'true');
      this.setActiveNav(this.host.querySelector(`[name="${state.currentParent}"]`));
    }
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

  updateCurrent(current){
    state.currentPage = current.getAttribute('name');
    this.findParent(current);
  }

  findParent(element){
    let parent;
    if( element.parentNode.parentNode.tagName == 'CBP-SUBNAV-ITEM'){
      parent = element.parentNode.parentNode; //account for subnav <sections>
      this.findParent(parent); 
    }else {
      state.currentParent = element.getAttribute('name');
      return;
    }
  }

  componentWillLoad() {
    this.navItems = Array.from(this.host.querySelectorAll('cbp-nav-item'));

    // Attach event listeners to the child navItem
    this.navItems.forEach(navItem => {
      navItem.addEventListener('navClicked', e => this.setActiveNav(e.detail.host));
    }); 

    this.subnavItems = Array.from(this.host.querySelectorAll('cbp-subnav-item')).filter(subnav => subnav.closest('cbp-subnav'))
    this.subnavItems.forEach(subnavItem => {
      subnavItem.addEventListener('subnavCurrentClick', e => this.updateCurrent(e.detail.host));
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

