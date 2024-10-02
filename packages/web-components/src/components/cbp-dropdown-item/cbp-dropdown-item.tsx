import { Component, Prop, Element, Event, EventEmitter, Watch, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-dropdown-item',
  styleUrl: 'cbp-dropdown-item.scss',
})
export class CbpDropdownItem {
  
  private checkbox: HTMLInputElement;
  private parent: HTMLCbpDropdownElement;

  @Element() host: HTMLElement;

  /** Specifies an optional value to be passed in the FormData instead of the display text/label. */
  @Prop() value: string;

  /* Specifies that a dropdown item is disabled and cannot be selected */
  //@Prop({reflect:true}) disabled: boolean; // No disabled state designed, but keep this in case we revisit it, as native options can be disabled

  /** Specifies if an item is selected */
  @Prop({ reflect: true }) selected: boolean;


  @Event() dropdownItemClick: EventEmitter;
  handleClick({target}) {
    // Ignore a click on the label because it will fire a click on the input as well
    if(target.tagName != "LABEL") {
      const label=(this.host.querySelector('.cbp-dropdown-item-content') as HTMLElement).innerText;
      this.dropdownItemClick.emit({
        host: this.host,
        target: target,
        label: label,
        value: (!!this.value) ? this.value : label
      });
      //console.log('Dropdown Item Click: ', this.value, (!!this.value) ? this.value : label);
    }
    //this.selected=true; delegate this to the parent level because we don't know if this is single or multiselect here
  }
  
  @Watch('selected')
  watchSelected(newValue) {
    //console.log('Selected Watch fired in dropdown-item: ', this.host);
    if (this.checkbox) this.checkbox.checked=newValue; // sync a slotted checkbox (if any) with the selected state
    if (newValue && this.parent?.open) this.host.focus(); // If the dropdown is open, send focus to the selected dropdown item (not its children)
  }

  handleKeyUp(e) {
    if (e.key == 'Enter') {
      this.handleClick(e);
      return false;
    }
  }


  componentWillLoad() {
    this.parent=this.host.closest('cbp-dropdown');
    this.checkbox = this.host.querySelector('input[type=checkbox]');
  }

  componentDidLoad() {
    if (this.selected && this.checkbox) this.checkbox.checked=true;
  }

  render() {
    return (
      <Host
        role="option"
        tabindex={-1}
        onClick={ (e) => this.handleClick(e)}
        onKeyDown={ (e) => this.handleKeyUp(e)}
        aria-selected={this.selected ? "true" : "false"}
      >
        <div class="cbp-dropdown-item-content">
          <slot />
        </div>
      </Host>
    );
  }
}
