import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-button',
  styleUrl: 'cbp-button.scss',
})
export class CbpButton {
  
  private button: any; // HTMLButtonElement or HTMLAnchorElement

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

  @Prop() pressed: boolean;
  @Prop() expanded: boolean;
  @Prop() controls: string;

  @Prop() accessibilityText: string;
  @Prop() disabled: boolean;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() buttonClick!: EventEmitter;
  @Event() componentLoad!: EventEmitter;

  handleClick = () => {
    this.buttonClick.emit({
      host: this.host,
      nativeElement: this.button,
      value: this.button.tagName=='button' ? this.button.value : null
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
  
  componentDidLoad() {
    this.componentLoad.emit({
      host: this.host,
      nativeElement: this.button,
      value: this.button.tagName=='button' ? this.button.value : null
    });
  }

  render() {
    const {
      type,
      pressed,
      expanded,
      controls,
      disabled,
      rel,
      target,
      href,
      download
    } = this;

    const attrs =
      this.tag === 'button'
      ? { 
          type, 
          controls, 
          disabled 
        }
      : {
          controls,   
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
            aria-pressed={pressed ? "true" : null}
            aria-expanded={expanded ? "true" : null}
            aria-controls={this.controls}
            onClick={this.handleClick}
            ref={(el) => this.button = el} 
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
            aria-pressed={pressed ? "true" : null}
            aria-expanded={expanded ? "true" : null}
            aria-controls={this.controls}
            role={disabled ? "link" : null}
            aria-disabled={disabled ? "true" : null}
            onClick={this.handleClick}
            ref={(el) => this.button = el} 
          >
            <slot />
          </a>
        </Host>
      )
    }
  }
  
}
