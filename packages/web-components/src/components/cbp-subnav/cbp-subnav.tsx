import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-subnav',
  styleUrl: 'cbp-subnav.scss'
})
export class CbpSubNav {

  private subNavItems: HTMLCbpSubnavItemElement[] = [];

  @Element() host: HTMLElement;

  /**  Sets the aria-label for the navigation element of the subnav*/
  @Prop() accessibilitytext: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  //TODO: is this needed? might be nice as a helper function for end user but not 100% it is nessecary if they are meant to manage current
  setCurrentSubNav(activatedSubNavItem) {
    this.subNavItems.forEach((subNavItem: HTMLCbpSubnavItemElement) => {
     if(activatedSubNavItem == subNavItem){
       subNavItem.current = true;
     }else{
       subNavItem.current = false;
     }
    });
   }
 
  componentWillLoad() {
    this.subNavItems = Array.from(this.host.querySelectorAll('cbp-subnav-item'));

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }
  
  render() {
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
