import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-subnav-item',
  styleUrl: 'cbp-subnav-item.scss',
})
export class CbpSubnavItem {

  private icon: string;
  private parent: boolean;
  @Element() host: HTMLElement;

  /** Specifies the current subnav-item */
  @Prop ({ reflect: true}) current: boolean

  /** Specifies the label for the subnav item */
  @Prop () label: string;

  /** Specifies the href passed to the button prop*/
  @Prop() href: string;

  /** used to style icon based on open/hide state */
  @Prop({ reflect: true }) open: boolean 

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    this.icon = this.host.closest('cbp-subnav-item cbp-subnav-item cbp-subnav-item') ? 'caret-down' : 'chevron-right';    
    this.host.querySelector('cbp-subnav-item') ? this.parent = true : this.parent = false;

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  toggleChildVisibility(){
    if(!this.host.lastElementChild.hasAttribute('hidden')){
      this.host.lastElementChild.setAttribute('hidden', '');
      this.open= false;
    }
    else{
      this.host.lastElementChild.removeAttribute('hidden');
      this.open= true;
    }
  }

  render() {
    if(this.parent){
      return (
        <Host
          aria-current={this.current}
        >
          <div>
          <cbp-button
            tag="a"
            fill="outline"
            color="primary"
            href={this.href}
          >
            <slot name='icon'> </slot>
            {this.label} 
          </cbp-button>
          
          <cbp-button
            type="button"
            fill="outline"
            color="primary"
            onClick={() => this.toggleChildVisibility()}
          >
            <cbp-icon name={this.icon}></cbp-icon>  
          </cbp-button>
          </div>
          <section hidden>
            <slot />
          </section>
        </Host>
      );
    }else {
      return (
        <Host
          aria-current={this.current}
        >
          <cbp-button
            tag="a"
            fill="outline"
            color="primary"
            href={this.href}
          >
            <slot name='icon'> </slot>
            {this.label}
          </cbp-button>
        </Host>
      );
    }
  }
}