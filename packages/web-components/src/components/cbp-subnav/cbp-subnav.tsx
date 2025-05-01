import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';
import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-subnav',
  styleUrl: 'cbp-subnav.scss'
})
export class CbpSubNav {
  @Element() host: HTMLElement;

  /**  Sets the aria-label for the navigation element of the subnav*/
  @Prop() accessibilitytext: string = 'Sub-Navigation';

  /** Specifies a name used to associated nav items with subnav items*/
  @Prop({ reflect: true }) name: string;

  /** used to toggle child indenation */
  @Prop({ reflect: true }) flat: boolean;

  /** used to set the current item in the subnav  */
  @Prop({ reflect: true}) current: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

 
  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }
  
  componentDidLoad(){
    this.current ? state.currentPage = this.name : null;
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
