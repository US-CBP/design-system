import { Component, Element, Host, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';
@Component({
  tag: 'cbp-app-header-nav',
  styleUrl: 'cbp-app-header-nav.scss',
})

export class CbpAppHeaderNav {

  @Element() host: HTMLElement;

  @Prop() text: string;

   /** The `href` attribute of a link button. */
   @Prop() href: string;

  /** Specifies the variant of button displayed */
  @Prop({ reflect: true }) variant: 'single' | 'multi' = 'single';  

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

  render() {
    
    if(this.variant === 'multi'){
      return (
        <Host>
          <nav>
            <cbp-button
              type="button"
              fill="ghost"
              color="secondary"
              href={this.href}
            >
              {this.text} <cbp-icon name="chevron-right" rotate={90}></cbp-icon>
            </cbp-button>
          </nav>
        </Host>
      );
    } else {
      return (
        <Host>
          <nav>
            <cbp-button
              type="button"
              fill="ghost"
              color="secondary"
              href={this.href}
            >
              {this.text}
            </cbp-button>
          </nav>
        </Host>
      );
    }
  }
}
