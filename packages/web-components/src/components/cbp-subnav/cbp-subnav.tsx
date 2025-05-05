import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-subnav',
  styleUrl: 'cbp-subnav.scss'
})
export class CbpSubNav {
  @Element() host: HTMLElement;
  private subnavItems: HTMLCbpSubnavItemElement[] = [];

  /**  Sets the aria-label for the navigation element of the subnav*/
  @Prop() accessibilitytext: string = 'Sub-Navigation';

  /** Specifies a name used to associated nav items with subnav items*/
  @Prop({ reflect: true }) name: string;

  /** used to toggle child indenation */
  @Prop({ reflect: true }) flat: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  setActiveSubnav(activatedSubNav) {
    this.subnavItems.forEach((subnavItem: HTMLCbpSubnavItemElement) => {
      let link = subnavItem.querySelector('a, button');

      if(activatedSubNav == subnavItem){
        subnavItem.current = true;
        link.setAttribute('aria-current', 'true');
      } else {
        subnavItem.current = false;
        link.removeAttribute('aria-current');
      }
    })
  }
    
  componentWillLoad() {
    this.subnavItems = Array.from(this.host.querySelectorAll('cbp-subnav-item')).filter(subnav => subnav.closest('cbp-subnav'))
    this.subnavItems.forEach(subnavItem => {
      subnavItem.addEventListener('subnavCurrentClick', e => this.setActiveSubnav(e.detail.host));
    });
   
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
