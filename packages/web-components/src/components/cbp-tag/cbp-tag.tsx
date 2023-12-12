import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-tag',
  styleUrl: 'cbp-tag.scss'
})
export class CbpTag {

  @Element() host: HTMLElement;

  @Prop({ reflect: true }) color: 'default' | 'danger' | 'success' | 'warning';

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
