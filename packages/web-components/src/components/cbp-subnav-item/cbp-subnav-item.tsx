import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-subnav-item',
  styleUrl: 'cbp-subnav-item.scss',
})
export class CbpSubnavItem {

  @Element() host: HTMLElement;

  /** Specifies the current subnav-item */
  @Prop ({ reflect: true}) current: boolean

  /** Specifies if this nav item renders as a parent */
  @Prop ({ reflect: true}) parent: boolean

  /** Specifies the href passed to the button prop*/
  @Prop() href: string;

  /** used to style icon based on open/hide state */
  @Prop({ reflect: true }) open: boolean 

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

  toggleChildVisibility(){
    if(!this.host.nextElementSibling.hasAttribute('hidden')){
      this.host.nextElementSibling.setAttribute('hidden', '');
      this.open= false;
    }
    else{
      this.host.nextElementSibling.removeAttribute('hidden');
      this.open= true;
    }
  }

  render() {
    if(this.parent){
      return (
        <Host>
          <cbp-button
            tag="a"
            fill="outline"
            color="primary"
            href={this.href}
          >
            <slot></slot>
          </cbp-button>
          
          <cbp-button
            type="button"
            fill="outline"
            color="primary"
            
            onClick={() => this.toggleChildVisibility()}
          >
            <cbp-icon name="chevron-right"></cbp-icon>
          </cbp-button>
        </Host>
      );
    }else {
      return (
        <Host>
          <cbp-button
            tag="a"
            fill="outline"
            color="primary"
            href={this.href}
          >
            <slot></slot>
          </cbp-button>
        </Host>
      );
    }
  }

}
