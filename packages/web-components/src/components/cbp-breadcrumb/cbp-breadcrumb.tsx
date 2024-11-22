import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-breadcrumb',
  styleUrl: 'cbp-breadcrumb.scss',
})
export class CbpBreadcrumb {

  @Element() host: HTMLElement;
  
  /* Sets the href for the home button of the breadcrumb */
  @Prop() home: string;

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
    return (
      <Host>
        {/* <cbp-button
          tag="a"
          fill="ghost"
          color="primary"
          variant="square"
          href={this.home}  
        >
          <cbp-icon
            name="home"
          >
          </cbp-icon>
        </cbp-button> */}
        <slot name='home'></slot>
        <slot></slot>
      </Host>
    );
  }

}
