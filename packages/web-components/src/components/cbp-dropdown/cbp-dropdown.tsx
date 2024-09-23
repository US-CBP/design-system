import { Component, Prop, State, Element, Event, EventEmitter, Method, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey, clickAwayListener } from '../../utils/utils';

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
  private counterControl: HTMLElement;
    
  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop() description: string;
  
  /** Specifies whether multiple selections are supported, in which case checkboxes shall be slotted in accordance with the design system specified pattern. Defaults to false, which renders a single-select dropdown. */
  @Prop({reflect: true}) multiple: boolean;

  /** Optionally specify the ID of the visible control here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-dropdown');
  
  /** Specifies the name of the (hidden) form field */
  @Prop() name: string = this.fieldId;
  
  /** Represents placeholder text on the dropdown control, displayed in a distinctive style from the selected item. Defaults to "Choose Item". Has no effect on multi-selects, as the component manages this text. */
  @Prop({ mutable:true }) placeholder: string = "Choose Item";

  /** Specifies the visible label on the dropdown control of the selected item. Primarily updated dynamically by the component. */
  @Prop({ mutable:true }) selectedLabel: string;

  /** Specifies the value of the hidden input holding the value (or barring one, the text label) of the selected item. Primarily updated dynamically by the component. */
  @Prop({ mutable:true }) value: any;
  
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


  @State() selectedItems: HTMLCbpDropdownItemElement[];

  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;

  @Listen('dropdownItemClick')
  handleDropdownItemClick( {detail: { host, label, value} }) {

    // multi-select behavior
    if(this.multiple) {
      // TechDebt: this should ideally be async/promise. Update: Made selectedItems a State, so this might be fine now. Needs testing.
      let newValue = host.selected = !host.selected; // toggle the selected state of the item

      setTimeout( () => {
        this.selectedItems=Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
        this.placeholder=this.selectedItems.length != 1 ? 'Selected Items' : 'Selected Item';
      }, 50);

      // update the values array
      newValue ? this.value = [...this.value, value] : this.value = this.value.filter( (item) => item !== value);
    }

    // single select
    else {
      this.dropdownitems=Array.from(this.host.querySelectorAll('cbp-dropdown-item'));
      // Unselect all items except the one that was activated
      this.dropdownitems.forEach( (item) => {
        if (item === host) item.selected=true;
        else item.selected=false;
      });
      // Update values at this level, close the menu, and return focus to the control
      this.selectedLabel=label;
      this.value=value;
      this.open=false;
      // Delay sending focus a bit to prevent enter from re-opening the dropdown (verified)
      setTimeout( () => {
        this.control.focus();
      }, 100);
    }

    // Update the focusIndex for keyboard navigation
    this.focusIndex=this.dropdownitems?.indexOf(host); // Update the focusIndex for keyboard navigation

    // Emit the custom event 
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.value,
      label: this.selectedLabel
    });
  }

  @Watch('open')
  watchOpen(newValue) {
    // If the menu was opened, give it time to render and set focus to the selected/first item
    if (newValue) {
      this.dropdownitems=Array.from(this.host.querySelectorAll('cbp-dropdown-item')); // Get and set this array whenever the menu is opened
      this.selectedItem=this.host.querySelector('cbp-dropdown-item[selected]'); // Get the first selected item (works for single and multi-select)

      // Update the focusIndex for keyboard navigation
      if (this.multiple) this.focusIndex=0;
      else this.focusIndex = this.dropdownitems.indexOf(this.selectedItem) || 0;

      this.setFocus();

      // Set up a clickaway listener to close the menu
      clickAwayListener(this.host, _ => {
          this.open = false;
      });
    }
  }


/*
 Need public methods to:
  clear selections
  advance/select +1
  backwards/select -1

*/

  @Method()
  async clearSelections() {
    this.selectedItems=Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    this.selectedItems.forEach( (item) => {
      item.selected=false;
    });
    
    // reset the value
    this.multiple ? this.value = [] : this.formField.value=undefined;

    // Update the selectedItems state after all of the items have been deselected
    setTimeout(() => {
      this.selectedItems=Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    }, 100)

    // Emit the custom valueChange event 
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.value,
      label: undefined
    });
  }

  handleCounterClick(e) {
    this.clearSelections();
    e.stopImmediatePropagation();
    this.counterControl.focus();
  }

  handleCounterKeydown(e) {
    const {key} = e;
    if (key == ' ' || key == 'Enter') {
      this.clearSelections();
      e.preventDefault();
      this.counterControl.focus();
    }
  }

  // This handles activating the button via Space or Enter as well (as long ).
  handleDropdownClick() {
    if (!this.readonly && !this.disabled) this.open=!this.open;
  }

  handleKeyUp({key}) {
    // Close the menu when pressing ESC anywhere in the component and send focus back to the control
    if (key == 'Escape') {
      this.open=false;
      this.control.focus();
    }
    // Open the menu when ArrowDown, usually when focused on the control
    if (key == 'ArrowDown') {
      if (!this.readonly && !this.disabled && !this.open) {
        !this.open ? this.open=true : this.setFocus();
      }
    }
  }

  // Detecting a Tab press has to be done on KeyDown, before focus has left the component
  handleKeyDown({key}) {
    if (key == 'Tab') {
      this.open=false;
    }
  }


  keyboardNav({key}) {
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

  setFocus() {
    setTimeout(() => {
      if (!this.multiple && this.selectedItem) this.selectedItem.focus();
      else this.dropdownitems[0].focus();
    }, 100)
  }

  
  componentWillLoad() {
    //this.parent = this.host.closest('cbp-form-field');

    // Look for any selected item to set the initial state, only if the value is not set
    this.selectedItems=Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    if (this.multiple) {
      this.value = []; // make an array of the values of selected items
      this.selectedItems.forEach( (item) => {
        const checkbox: HTMLInputElement = item.querySelector('input[type=checkbox]');
        this.value = [...this.value, checkbox.value];
      });
      this.placeholder=this.selectedItems.length != 1 ? 'Selected Items' : 'Selected Item';
    }

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    // Getting values and innerText only works after rendering
    if (!this.multiple) {
      if (!this.value || !this.selectedLabel) {
        this.selectedItem=this.host.querySelector('cbp-dropdown-item[selected]');
        if (this.selectedItem) {
          this.value=this.selectedItem.value || this.selectedItem?.innerText;
          this.selectedLabel=this.selectedItem.innerText;
        }
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
            {this.selectedLabel 
              ? <div class="cbp-dropdown-label">{this.selectedLabel}</div> 
              : <div class="cbp-dropdown-placeholder">
                  {this.multiple && 
                    <span 
                      role="button"
                      tabindex={0}
                      class="cbp-dropdown-multiselect-counter" 
                      title={`Click to clear selections`}
                      onClick={ (e) => this.handleCounterClick(e)}
                      onKeyDown={ (e) => this.handleCounterKeydown(e)}
                      ref={ el => this.counterControl = el}
                    >
                      {this.selectedItems.length}
                      <cbp-icon
                        name="circle-xmark" 
                        size="var(--cbp-space-3x)" 
                        sx={{'margin-inline-start':'var(--cbp-space-2x)'}}
                      />
                    </span>
                  }
                  {this.placeholder}
                </div>
            }
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
          onKeyUp={e => this.keyboardNav(e)}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
