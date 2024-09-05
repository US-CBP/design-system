import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-dropdown-item',
  styleUrl: 'cbp-dropdown-item.scss',
})
export class CbpDropdownItem {
  
  @Element() host: HTMLElement;

  /** Specifies an optional value to be passed in the FormData instead of the display text/label. */
  @Prop() value: string;

  /* Specifies that a dropdown item is disabled and cannot be selected */
  //@Prop({reflect:true}) disabled: boolean; // No disabled state designed, but keep this in case we revisit it, as native options can be disabled

  /** Specifies if an item is selected */
  @Prop({ reflect: true }) selected: boolean;


  @Event() dropdownItemClick: EventEmitter;
  handleClick() {
    const label=(this.host.querySelector('.cbp-dropdown-item-content') as HTMLElement).innerText;
    this.dropdownItemClick.emit({
      host: this.host,
      label: label,
      value: (this.value) ? this.value : label
    });
    this.selected=true;
  }
  
  handleKeyUp(e) {
    if (e.key == 'Enter') {
      this.handleClick();
      return false;
    }
  }

  render() {
    return (
      <Host
        role="option"
        tabindex={-1}
        onClick={ () => this.handleClick()}
        onKeyDown={e => this.handleKeyUp(e)}
        aria-selected={this.selected ? "true" : "false"}
      >
        <div class="cbp-dropdown-item-content">
          <slot />
        </div>
      </Host>
    );
  }
}
