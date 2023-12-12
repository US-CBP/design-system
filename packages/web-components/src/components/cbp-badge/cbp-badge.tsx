import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-badge',
  styleUrl: 'cbp-badge.scss'
})
export class CbpBadge {

  @Element() host: HTMLElement;
  
  @Prop({ reflect: true }) color: 'default' | 'danger';
  
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
