import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-structured-list-item',
  styleUrl: 'cbp-structured-list-item.scss',
})

export class CbpStructuredListItem {

  @Element() host: HTMLElement;

  @Prop({ reflect: true }) color: 'danger';

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
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
