import { Component, Prop, Element, Event, EventEmitter, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

@Component({
  tag: 'cbp-dropdown',
  styleUrl: 'cbp-dropdown.scss',
})
export class CbpDropdown {

  private control: HTMLButtonElement;
  private formField: HTMLInputElement;
  private dropdownitems: HTMLCbpDropdownItemElement[];
  private selectedItem: HTMLCbpDropdownItemElement;
  private focusIndex: number;
    
  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop() description: string;
  
  /** Optionally specify the ID of the visible control here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-dropdown');
  
  /** Specifies the name of the (hidden) form field */
  @Prop() name: string = this.fieldId;
  
  /** Specifies the visible label on the dropdown control of the selected item. Primarily updated dynamically by the component. */
  @Prop({ mutable:true }) selectedLabel: string;

  /** Specifies the value of the hidden input holding the value (or barring one, the text label) of the selected item. Primarily updated dynamically by the component. */
  @Prop({ mutable:true }) value: string;
  
  /** TODO: Specifies faux placeholder text for the dropdown control. */
  @Prop() placeholder: string;

  /** Specifies whether the dropdown menu is open/visible. */
  @Prop({ reflect: true, mutable:true }) open: boolean;

  /** Specifies that the field has an error (and sets aria-invalid accordingly). Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true }) error: boolean;

  /** Specifies that the field is readonly. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true }) readonly: boolean;
  
  /** Specifies that the field is disabled. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true }) disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;

  // This handles activating the button via Space or Enter as well.
  handleDropdownClick() {
    if (!this.readonly && !this.disabled) this.open=!this.open;
  }


  handleKeyUp(e) {
    // Close the menu when pressing ESC anywhere in the component and send focus back to the control
    if (e.key == 'Escape') {
      this.open=false;
      this.control.focus();
    }
    // Open the menu when ArrowDown, usually when focused on the control
    if (e.key == 'ArrowDown') {
      if (!this.readonly && !this.disabled && !this.open) this.open=true;
    }
  }

  // Detecting a Tab press has to be done on KeyDown, before focus has left the component
  handleKeyDown(e) {
    if (e.key == 'Tab') {
      this.open=false;
    }
  }


  keyboardNav(key) {
    const l = this.dropdownitems.length - 1;
    const n = {
      Home: 0,
      ArrowUp: -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l,
      ArrowDown: l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0,
      End: l,
    }[key];
    if (n !== undefined && key !== 'Tab') {
      setTimeout(() => {
        this.dropdownitems[n].focus();
      }, 20);
      this.focusIndex = n;
    }
  }

  @Listen('dropdownItemClick')
  handleDropdownItemClick(e) {
    // Unselect all items except the one that was activated
    this.dropdownitems=Array.from(this.host.querySelectorAll('cbp-dropdown-item'));
    this.dropdownitems.forEach( (item) => {
      if (item !== e.detail.host) {
        item.selected=false;
      }
    });
    // Update values at this level, close the menu, and return focus to the control
    this.selectedLabel=e.detail.label;
    this.value=e.detail.value;
    this.open=false;
    // Delay sending focus a bit to prevent enter from re-opening the dropdown (verified)
    setTimeout( () => {
      this.control.focus();
    }, 100);

    // Emit the custom event 
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.formField.value,
      label: this.selectedLabel
    });
  }

  @Watch('open')
  watchOpen(newValue) {
    // Get and set this array whenever the menu is opened
    this.dropdownitems=Array.from(this.host.querySelectorAll('cbp-dropdown-item'));
    this.selectedItem=this.host.querySelector('cbp-dropdown-item[selected');
    
    // If the menu was opened, give it time to render and set focus to the selected/first item
    if (newValue) {
      setTimeout(() => {
        if (this.selectedItem) this.selectedItem.focus();
        else this.dropdownitems[0].focus();
      }, 100)
    }
  }

  componentWillLoad() {
    //this.parent = this.host.closest('cbp-form-field');
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }


  componentDidLoad() {
    // Look for any selected item to set the initial state, only if the value is not set
    if (!this.value || !this.selectedLabel) {
      this.selectedItem=this.host.querySelector('cbp-dropdown-item[selected');
      if (this.selectedItem) {
        this.value=this.selectedItem.value || this.selectedItem?.innerText;
        this.selectedLabel=this.selectedItem.innerText;
      }
    }
  }


  /*
  Notes (keep until complete):

    aria-haspopup, aria-controls, aria-activedescendant, and aria-autocomplete.

    Comboboxes have an implicit aria-haspopup value of listbox, so including this attribute is optional if the popup is a listbox.

    One common convention is that Down Arrow moves focus from the input to the first focusable descendant of the popup element.
  */
  render() {
    return (
      <Host
        onKeyUp={e => this.handleKeyUp(e)}
        onKeyDown={e => this.handleKeyDown(e)}
      >
        <button
          class="cbp-custom-form-control"
          id={this.fieldId}
          role="combobox"
          aria-controls={`${this.fieldId}-menu`}
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-invalid={this.error ? "true" : false}
          disabled={this.disabled || this.readonly}
          onClick={ () => this.handleDropdownClick()}
          ref={el => (this.control = el)}
        >
          <div class="cbp-dropdown-label">
            {this.selectedLabel}
          </div>
        </button>

        <input
          type="hidden"
          id={`${this.fieldId}-field`}
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          ref={el => (this.formField = el)}
        />

        <div 
          role="listbox"
          class="cbp-dropdown-menu"
          id={`${this.fieldId}-menu`}
          onKeyUp={({ key }) => this.keyboardNav(key)}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
