import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - The individual links making up the breadcrumbs are placed in the default slot.
 */
@Component({
  tag: 'cbp-breadcrumb',
  styleUrl: 'cbp-breadcrumb.scss',
})
export class CbpBreadcrumb {

  @Element() host: HTMLElement;

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
        <nav aria-label="Breadcrumb">
          <slot />
        </nav>      
      </Host>
    );
  }
}