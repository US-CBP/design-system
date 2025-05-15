import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-subnav',
  styleUrl: 'cbp-subnav.scss'
})
export class CbpSubNav {

  private subnavItems: HTMLCbpSubnavItemElement[] = [];
  private currentItem: HTMLCbpSubnavItemElement;
  private activeItem: HTMLCbpSubnavItemElement = null;

  @Element() host: HTMLElement;

  /** Sets the aria-label for the `nav` landmark element rendered by the subnav. */
  @Prop() accessibilityText: string = 'Sub-Navigation';

  /** Specifies a flat display, rather than the default indented layout based on tag hierarchy. */
  @Prop({ reflect: true }) flat: boolean;

  /** Specifies whether the Subnav pushes updates to a state store to integrate with the Application Header. */
  @Prop() store: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  //@State() currentItem: HTMLCbpSubnavItemElement;
  //@State() activeItem: HTMLCbpSubnavItemElement = null;

  updateActiveItem(newValue){
    const ActiveItem = this.host.querySelector(`cbp-subnav-item[name="${newValue}"]`) as HTMLCbpSubnavItemElement;
    this.activeItem=ActiveItem;

    // Close all the subnav items
    this.subnavItems.forEach(el => { 
      el.open=false;
    });

    // Open the Subnav Item and give it focus
    if(ActiveItem) ActiveItem.open=true;
    setTimeout(() => {
      ActiveItem?.querySelector('a').focus()
    }, 101) // Note: Time 101 is set due to cbp-drawer setting @ 100
  }

  updateCurrent(newValue){
    const CurrentItem = this.host.querySelector(`cbp-subnav-item[name="${newValue}"]`) as HTMLCbpSubnavItemElement;
    this.currentItem = CurrentItem;
    // Rest the current status on all the subnav items
    this.subnavItems.forEach(el => { 
      if(el == CurrentItem) el.current=true;
      else el.current=false;
    }); 

  }

  handleSubnavItemClick({detail: {host}}) { 
    console.log('Subnav - handleSubnavItemClick: ', host);
    this.subnavItems.forEach((subnavItem: HTMLCbpSubnavItemElement) => {
      if(host == subnavItem) {
        // Update the state store for integrating with the App Header
        if(this.store) {
          const TopParent = this.findParent(subnavItem);
          state.currentPage = host.name;
          state.currentParent = TopParent.name;
        }
      }
      else {
        subnavItem.current = false;
      }
    })
  }

  findParent(subnavItem: HTMLCbpSubnavItemElement): HTMLCbpSubnavItemElement {
    const Parent = subnavItem.parentElement.closest('cbp-subnav-item') as HTMLCbpSubnavItemElement;
    if (!Parent) return subnavItem;
    else return this.findParent(Parent);
  }

  componentWillLoad() {
    this.subnavItems = Array.from(this.host.querySelectorAll('cbp-subnav-item'));
    this.currentItem = this.host.querySelector('cbp-subnav-item[current]') as HTMLCbpSubnavItemElement;
    //this.activeItem = this.subnavItems[0]; // Does this make sense as a default?

    // Set event listeners on Subnav Items
    this.subnavItems.forEach( subnavItem  => {
      subnavItem.addEventListener('subnavItemClick', (e) => {
        this.handleSubnavItemClick(e);
      });
    });

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {
    // Update the active to match the state.current
    if(this.store){
      if(this.currentItem?.name != state.currentPage) {
        this.updateCurrent(state.currentPage);
      }
      if(this.activeItem?.name != state.activeItemName) {
        this.updateActiveItem(state.activeItemName);
      }
    }
    
    return (
      <Host>
        <nav aria-label={this.accessibilityText}>
          <slot />
        </nav>
      </Host>
    );
  }

}
