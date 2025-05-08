import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-subnav',
  styleUrl: 'cbp-subnav.scss'
})
export class CbpSubNav {
  @Element() host: HTMLElement;
  private subnavItems: HTMLCbpSubnavItemElement[] = [];

  /**  Sets the aria-label for the navigation element of the subnav*/
  @Prop() accessibilitytext: string = 'Sub-Navigation';

  /** used to toggle child indenation */
  @Prop({ reflect: true }) flat: boolean;

  /** used to determine if subnav is dependent on a state.store*/
  @Prop() store: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  
  initSubnav(){
    this.setActiveSubnav(this.subnavItems[0], false)
  }

  setActiveSubnav(activatedSubNav, needParent) { 
    this.subnavItems.forEach((subnavItem: HTMLCbpSubnavItemElement) => {
      let link = subnavItem.querySelector('a, button');

      if(activatedSubNav == subnavItem){
        subnavItem.current = true;
        link ? link.setAttribute('aria-current', 'true') : '';
        if(this.store){
          state.currentPage = activatedSubNav.getAttribute('name');
          needParent ? state.currentParent = this.findParent(activatedSubNav) : null;
        }
      } else {
        subnavItem.current = false;
        link.hasAttribute('aria-current') ? link.removeAttribute('aria-current') : '';
      }
    })
  }
    
  findParent(element){
    let parent; 
    parent = element.parentNode.closest('cbp-subnav-item');

    if(parent){
      if( parent.parentNode.tagName == 'SECTION'){
        return this.findParent(parent);
      } else{
        return parent.getAttribute('name');
      }
    } else {
      return element.getAttribute('name');
    }
    
  }

  componentWillLoad() {
    this.subnavItems = Array.from(this.host.querySelectorAll('cbp-subnav-item')).filter(subnav => subnav.closest('cbp-subnav'))
    this.subnavItems.forEach(subnavItem => {
      subnavItem.addEventListener('subnavCurrentClick', e => this.setActiveSubnav(e.detail.host, true)); 
    });
   
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }
  
  componentDidLoad(){
     this.initSubnav(); 
  }

  testStateinRender(){ //TODO: local testing to remove after review
    console.log('---Subnav Render---');
    console.log(state.currentPage)
    console.log(state.currentParent)
    console.log(state.activeItemName)
  }
  
  render() {
    /** test if function call to stored state still triggers rerender on value update */
    this.testStateinRender();

    /** update the active to match the state.current */
    if(this.store){
      this.subnavItems.forEach(subnavItem => {
        if(subnavItem.name == state.currentPage){
        this.setActiveSubnav(subnavItem, false);
        }
      });  
    }
    
    return (
      <Host>
        <nav
          aria-label={this.accessibilitytext} 
        >
          <slot></slot>
        </nav>
      </Host>
    );
  }

}
