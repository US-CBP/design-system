import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-chip',
  styleUrl: 'cbp-chip.scss'
})
export class CbpChip {

  private button: HTMLButtonElement;
  private ariaPressed: boolean;

  @Element() host: HTMLElement;

  @Prop() pressed: boolean;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() chipClick!: EventEmitter;
  
  handleClick = (e) => {
    this.ariaPressed=!this.ariaPressed;

    // toggle the aria-pressed attribute directly to allow for animation
    this.button.setAttribute('aria-pressed', `${this.ariaPressed}`)

    this.chipClick.emit({
      host: this.host,
      label: this.host.innerText,
      active: this.ariaPressed,
      nativeEvent: e,
    });
  }
  

  componentWillLoad() {
    this.ariaPressed = this.pressed ? true : false;

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
          type="button"
          aria-pressed={`${this.pressed}`}
          ref={(el) => this.button = el} 
          onClick={ e => this.handleClick(e) }
        >
          <span class="cbp-chip__label">
            <slot />
          </span>
          <cbp-icon name="plus"></cbp-icon>
        </button>
      </Host>
    );
  }

}
