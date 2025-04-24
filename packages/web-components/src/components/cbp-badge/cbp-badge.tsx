import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - The slotted badge content should be a short 1-2 digit number.
 */
@Component({
  tag: 'cbp-badge',
  styleUrl: 'cbp-badge.scss'
})
export class CbpBadge {

  @Element() host: HTMLElement;
  
  /** Specifies a color variant. Currently the only variant supported is "danger". */
  @Prop({ reflect: true }) color: "default"| "danger";
  
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
        <slot />
      </Host>
    );
  }
}
