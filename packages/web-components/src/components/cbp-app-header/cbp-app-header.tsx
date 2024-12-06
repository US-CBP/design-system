import { Component, Element, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss'
})
export class CbpAppHeader {

  
  private navItems: HTMLCbpNavItemElement[] = [];

  @Element() host: HTMLElement;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";



  initNavItemset() {
    // check for a default navItem, otherwise set the first one active
    let activeNavItem;
    this.navItems.forEach(navItem => {
      if (navItem.selected === true) activeNavItem = navItem;
    });
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
  render() {
    return (
      <Host>
        <slot name="cbp-home" />
        <slot />
      </Host>
    );
  }
}

