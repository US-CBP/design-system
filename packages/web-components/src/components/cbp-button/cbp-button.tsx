import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-button',
  styleUrl: 'cbp-button.scss',
})
export class CbpButton {
  @Element() host: HTMLElement;

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop({ reflect: true }) fill: 'solid' | 'outline' | 'ghost' = 'solid';
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Prop({ reflect: true }) variant: 'square' | 'cta';
  @Prop() accessibilityText: string;
  @Prop() disabled: boolean;
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
        <button
          type={this.type}
          aria-label={this.accessibilityText}
          disabled={this.disabled}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
