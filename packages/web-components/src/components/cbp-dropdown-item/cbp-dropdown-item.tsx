import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-dropdown-item',
  styleUrl: 'cbp-dropdown-item.scss',
})
export class CbpDropdownItem {
  
  @Element() host: HTMLElement;

  /** Specifies an optional value to be passed in the FormData instead of the display text/label. */
  @Prop() value: string;

  /** Specifies an optional value to be passed in the FormData instead of the display text/label. */
  @Prop({reflect:true}) disabled: boolean;

  @Event() dropdownItemClick: EventEmitter;
  handleClick() {
    if (!this.disabled) {
      const label=(this.host.querySelector('.cbp-dropdown-item-content') as HTMLElement).innerText;
      this.dropdownItemClick.emit({
        host: this.host,
        label: label,
        value: (this.value) ? this.value : label
      });
    }
  }

  /** Specifies if an item is selected */
  @Prop({ reflect: true }) selected: boolean;

  render() {
    return (
      <Host
        role="??"
        tabindex={ !this.disabled ? 0 : -1 }
        onClick={ () => this.handleClick()}
      >
        <div class="cbp-dropdown-item-content">
          <slot />
        </div>
      </Host>
    );
  }
}
