import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - The default slot defines the chip's label.
 * @slot cbp-chip-icon - Optionally slot a custom icon for the default state (will still show the x for removal when pressed).
 */
@Component({
  tag: 'cbp-chip',
  styleUrl: 'cbp-chip.scss'
})
export class CbpChip {

  private button: HTMLButtonElement;
  private icon: HTMLCbpIconElement;
  private iconName: string = "plus"; // default is "plus" but if customized, we need to keep track of it
  private ariaPressed: boolean;

  @Element() host: HTMLElement;

  /** Specifies the `name` attribute of the rendered button */
  @Prop({ reflect: true }) name: string;
  
  /** Specifies the `value` attribute of the rendered button */
  @Prop() value: string;
  
  /** Specifies the pressed state of the button and `aria-pressed` attribute of the rendered button */
  @Prop() pressed: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** A custom event emitted when the chip is activated/toggled. */
  @Event() chipClick!: EventEmitter;
  
  handleClick(e){
    // We're using this variable rather than the property to avoid re-rendering, which would impact the animation
    this.ariaPressed=!this.ariaPressed;

    // toggle the aria-pressed attribute directly to allow for animation
    if (this.iconName == "plus" ) {
      this.button.setAttribute('aria-pressed', `${this.ariaPressed}`)
    }
    else {
      this.pressed = !this.pressed;
      this.pressed ? this.icon.name="times" : this.icon.name=this.iconName;
    }

    this.chipClick.emit({
      host: this.host,
      name: this.name,
      value: this.value || this.button.innerText,
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

  componentDidLoad() {
    if (!this.icon) this.icon = this.host.querySelector('cbp-icon');
    this.iconName = this.icon.name;
  }

  render() {
    return (
      <Host>
        <button
          type="button"
          value={this.value}
          aria-pressed={`${this.pressed}`}
          ref={(el) => this.button = el} 
          onClick={ (e) => this.handleClick(e) }
        >
          <span class="cbp-chip__label">
            <slot />
          </span>
          {this.host.querySelector('[slot=cbp-chip-icon]')
            ? <slot name="cbp-chip-icon" />
            : <cbp-icon name="plus" size='var(--cbp-space-3x)' ref={el => this.icon = el} />
          }
        </button>
      </Host>
    );
  }
}