import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-button',
  styleUrl: 'cbp-button.scss',
})
export class CbpButton {
  
  @Element() host: HTMLElement;

  @Prop() tag: 'button' | 'a' = 'button';
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop({ reflect: true }) fill: 'solid' | 'outline' | 'ghost' = 'solid';
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Prop({ reflect: true }) variant: 'square' | 'cta';
  
  @Prop() href: string;
  @Prop() rel: string;
  @Prop() target: string;
  @Prop() download: boolean;

  @Prop() accessibilityText: string;
  @Prop() disabled: boolean;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() buttonClick!: EventEmitter;
  handleClick = ({target}) => {
    const button = target.closest('button,a');
    this.buttonClick.emit({
      host: this.host,
      el: button,
      value: button.value || null
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
    const {
      type,
      disabled,
      rel,
      target,
      href,
      download
    } = this;

    const attrs =
      this.tag === 'button'
      ? { type, disabled }
      : {
          download,
          href,
          rel,
          target,
        };

    if (this.tag === 'button') {
      return (
        <Host>
          <button {...attrs}
            aria-label={this.accessibilityText}
            onClick={this.handleClick}
          >
            <slot />
          </button>
        </Host>
      )
    }
    else {
      return (
        <Host>
          <a {...attrs}
            aria-label={this.accessibilityText}
            role={disabled ? "link" : null}
            aria-disabled={disabled ? "true" : null}
            onClick={this.handleClick}
          >
            <slot />
          </a>
        </Host>
      )
    }
  }
  
}
