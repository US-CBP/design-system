import { Component, Prop, Element, Event, EventEmitter, Listen, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

@Component({
  tag: 'cbp-dropdown',
  styleUrl: 'cbp-dropdown.scss',
})
export class CbpDropdown {

  private control: HTMLButtonElement;
  private formField: HTMLInputElement;
  private dropdownitems: HTMLCbpDropdownItemElement[];
    
  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop() description: string;
  
  /** Optionally specify the ID of the field here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-dropdown');
  @Prop() name: string = this.fieldId;
  
  @Prop({mutable:true}) selectedLabel: string;
  @Prop({mutable:true}) value: string;
  @Prop() placeholder: string;

  @Prop({ reflect: true }) open: boolean;

  @Prop({ reflect: true }) error: boolean;

  /** Specifies that the field is readonly; sets all form fields as readonly and related button controls to disabled.  */
  @Prop({ reflect: true }) readonly: boolean;
  
  /** Specifies that the field is disabled; sets all form fields and button controls as disabled. */
  @Prop({ reflect: true }) disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;
  handleChange() {
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.formField.value,
    });
  }

  //@Event() valueChange: EventEmitter;
  handleClick() {
    if (!this.readonly && !this.disabled) this.open=!this.open;
  }

  handleKeyUp(e) {
    if (e.key == 'Escape') {
      this.open=false;
      this.control.focus();
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
    this.control.focus();
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


  /*
   aria-haspopup, aria-controls, aria-activedescendant, and aria-autocomplete.

   Comboboxes have an implicit aria-haspopup value of listbox, so including this attribute is optional if the popup is a listbox.

   One common convention is that Down Arrow moves focus from the input to the first focusable descendant of the popup element.
   */


  render() {
    return (
      <Host>
        <button
          class="cbp-custom-form-control"
          id={this.fieldId}
          role="combobox"
          aria-controls={`${this.fieldId}-menu`}
          aria-expanded="false"
          aria-haspopup="listbox"
          disabled={this.disabled || this.readonly}
          onClick={ () => this.handleClick()}
          onKeyUp={e => this.handleKeyUp(e)}
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
          ref={el => (this.formField = el)}
        />

        <div 
          role="listbox"
          class="cbp-dropdown-menu"
          id={`${this.fieldId}-menu`}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
