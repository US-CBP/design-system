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

  /** Specifies if an item is selected */
  @Prop({ reflect: true }) selected: boolean;


  @Event() dropdownItemClick: EventEmitter;
  handleClick() {
    if (!this.disabled) {
      this.selected=true;
      const label=(this.host.querySelector('.cbp-dropdown-item-content') as HTMLElement).innerText;
      this.dropdownItemClick.emit({
        host: this.host,
        label: label,
        value: (this.value) ? this.value : label
      });
    }
  }
  
  handleKeyUp(e) {
    if (e.key == 'Enter') {
      this.handleClick();
    }
  }

  render() {
    return (
      <Host
        role="??"
        tabindex={ !this.disabled ? 0 : -1 }
        onClick={ () => this.handleClick()}
        onKeyUp={e => this.handleKeyUp(e)}
      >
        <div class="cbp-dropdown-item-content">
          <slot />
        </div>
      </Host>
    );
  }
}
