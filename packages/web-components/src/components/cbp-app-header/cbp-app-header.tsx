import { Component, Element, Listen, Host, h, Prop} from '@stencil/core';
import { debounce } from '../../utils/utils';
import state from '../cbp-app-header/store';

/**
 * @slot - The default slot usually contains only `cbp-nav-item` tags, but other content may also be included.
 * @slot - cbp-home - The link to the home page containing the Application Name as link text should be placed within this named slot for the intended visual treatment. 
 */
@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss'
})
export class CbpAppHeader {
  
  private navItems: HTMLCbpNavItemElement[] = [];
  private currentItem: HTMLCbpNavItemElement;

  private drawerButton: HTMLCbpButtonElement;
  private nav: HTMLElement;
  private children: HTMLElement[] = []; 
  private navWidth; 

  /** Specifies the id of the drawer to be launched*/
  @Prop() subnavdrawerid: string;

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

  handleResize( width ) {
    
    // Get the width of the content (and update the this.navWidth) before doing responsive adjustments.
    if(this.navWidth == undefined){
      this.navWidth = this.nav.getBoundingClientRect().width;
    }
    
    // If the emitted size is less than the current mode's width, step down to the next responsive size
    if (width <= this.navWidth) {
      this.doResponsive();
    } else{
      this.doFullSize();
    }
  }

  doResponsive(){
    this.children.forEach( (item, index) => {
      if (index > 0) {
        item.setAttribute('hidden','');
      }
    });
    this.drawerButton.removeAttribute('hidden');
  }

  doFullSize(){
    this.children.forEach( (item, index) => {
      if (index > 0) {
        item.removeAttribute('hidden');
      }
    });
    this.drawerButton.setAttribute('hidden', '');
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

  componentDidLoad(){
    // Get the immediate children to toggle hidden
    this.children=Array.from(this.nav.querySelectorAll(':scope > *'));   
  }

  render() {
    if(this.currentItem?.name != state.currentParent) {
      this.updateCurrentItem(state.currentParent);
    }

    return (
      <Host>
        <cbp-resize-observer 
          onResized={ debounce((e) => {
            this.handleResize(e.detail.width);
        }, 10)}
        >
          <nav 
            aria-label="Primary Navigation" 
            ref={el => this.nav = el}
          >
            <slot name="cbp-home" />
            <slot />
            
            <cbp-button
              hidden
              ref={el => this.drawerButton = el}
              fill="outline"
              color="secondary"
              target-prop="open"
              controls={this.subnavdrawerid}
              accessibilityText="Navigation Menu"
            >
              <cbp-icon
                name="bars"
              />
            </cbp-button>
          </nav>
        </cbp-resize-observer>
        
      </Host>
    );
  }
}

