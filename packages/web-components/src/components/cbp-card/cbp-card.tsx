import { Component, Host, Element, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-card',
  styleUrl: 'cbp-card.scss',
})
export class CbpCard {
  @Element() host: HTMLElement;

  @Prop({ reflect: true }) color: 'default' | 'danger' = 'default';
  @Prop({ reflect: true }) variant: 'general' | 'banner' | 'decision' = 'decision';
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
        <slot name="cardbody">
          <slot name="cardtitle" />
        </slot>
        <slot name="cardactions" />
      </Host>
    );
  }

}
