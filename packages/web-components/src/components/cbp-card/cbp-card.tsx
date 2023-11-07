import { Component, Host, Element, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-card',
  styleUrl: 'cbp-card.scss',
})
export class CbpCard {
  @Element() host: HTMLElement;

  @Prop({ reflect: true }) color: 'info' | 'success' | 'warning' | 'danger';
  @Prop({ reflect: true }) variant: 'banner' | 'decision';
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
        {this.variant === 'banner' && <slot name="cbp-card-title" />}
        <div class="cbp-card-body">
          {this.variant !== 'banner' && <slot name="cbp-card-title" />}
          <slot />
        </div>
        <slot name="cbp-card-actions" />
      </Host>
    );
  }
}
