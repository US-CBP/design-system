import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
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

  @Event() buttonClick!: EventEmitter;
  handleClick = ({target}) => {
    const button = target.closest('button');
    this.buttonClick.emit({
      host: this.host,
      button: button,
      value: button.value
    });
  }
  
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
          onClick={this.handleClick}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
