import { Component, Prop, Element, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { createNamespaceKey } from '../../utils/utils';

/**
 * The Dropdown Item represents an individual option for the Dropdown, similar to an option in a
 * native `select` but with more flexibility.
 *
 * @slot - The Dropdown Item's label or content goes in the default slot; for multi-select dropdowns,
 * this includes the checkbox component and slotted native `input type="checkbox"` and label.
 */
@Component({
  tag: 'cbp-dropdown-item',
  styleUrl: 'cbp-dropdown-item.scss',
})
export class CbpDropdownItem {

  private checkbox: HTMLInputElement;
  //private parent: HTMLCbpDropdownElement;

  @Element() private host: HTMLElement;

  /** Specifies an optional value to be passed in the FormData instead of the display text/label. */
  @Prop() value: string;

  /* Specifies that a dropdown item is disabled and cannot be selected */
  @Prop({ reflect: true }) disabled: boolean;

  /** For Internal Use: Specifies the current item (referenced by `aria-activedescendant`) while using keyboard navigation. */
  @Prop({ reflect: true }) current: boolean;

  /** Optionally specify the ID of each dropdown item, which is used by the parent dropdown to associate `aria-activedescendant`. If no `itemId` is specified, one will be automatically generated. */
  @Prop() itemId: string = createNamespaceKey('cbp-dropdown-item');

  /** Specifies if an item is selected */
  @Prop({ reflect: true }) selected: boolean;


  @Event() dropdownItemClick: EventEmitter;
  handleClick(e) {
    const { target } = e;
    // Do nothing if disabled
    if (!this.disabled) {
      // Ignore a click on the label because it will fire a click on the input as well
      if (target.tagName != 'LABEL') {
        const label = (this.host.querySelector('.cbp-dropdown-item-content') as HTMLElement).innerText;
        
        this.dropdownItemClick.emit({
          host: this.host,
          target: target,
          label: label,
          value: !!this.value ? this.value : label,
          nativeEvent: e,
        });
        //console.log('Dropdown Item Click: ', this.value, (!!this.value) ? this.value : label);
      }
    }
    // Selection is delegated to the parent level because we don't know if this is single or multiselect at this level.
  }

  @Watch('selected')
  watchSelected(newValue) {
    if (this.checkbox) this.checkbox.checked = newValue; // sync a slotted checkbox (if any) with the selected state
  }

  constructor() {
    if(!this.host.hasAttribute('slot')) this.host.slot="cbp-dropdown-items"; // auto-slot the dropdown items
  }

  componentWillLoad() {
    //this.parent=this.host.closest('cbp-dropdown');
    this.checkbox = this.host.querySelector('input[type=checkbox]');
  }

  componentDidLoad() {
    if (this.selected && this.checkbox) this.checkbox.checked = true;
  }

  render() {
    return (
      <Host 
        role="option" 
        id={this.itemId} 
        onClick={e => this.handleClick(e)} 
        aria-selected={this.selected ? 'true' : 'false'}
      >
        <div class="cbp-dropdown-item-content">
          <slot />
        </div>
      </Host>
    );
  }
}
