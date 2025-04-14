import { Component, Prop, State, Element, Event, EventEmitter, Method, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey, clickAwayListener } from '../../utils/utils';

/**
 * @slot - Only Dropdown Items should be placed in the default slot.
 * @slot cbp-dropdown-attached-button-start - Allows for an optional button control to be slotted as an overlay at the start of the dropdown (such as a "previous" button).
 * @slot cbp-dropdown-attached-button-end - Allows for an optional button control to be slotted as an overlay at the end of the dropdown (such as a "next" button).
 */
@Component({
  tag: 'cbp-dropdown',
  styleUrl: 'cbp-dropdown.scss',
})
export class CbpDropdown {
  private control: HTMLButtonElement;
  private formField: HTMLInputElement; // the hidden input that stores the dropdown value for form posts
  
  private listbox: HTMLElement;
  private dropdownItems: HTMLCbpDropdownItemElement[] = [];
  private focusIndex: number;

  private matches: number[]; // an array of indexes (to dropdownItems) of the matches.
  private matchIndex: number; 

  private counterControl: HTMLElement;
  
  private attachedButtonStart: any;
  private attachedButtonEnd: any;
  private attachedButtonStartWidth;
  private attachedButtonEndWidth;

  @Element() host: HTMLCbpDropdownElement;

  /** Specifies whether multiple selections are supported, in which case checkboxes shall be slotted in accordance with the design system specified pattern. Defaults to false, which renders a single-select dropdown. */
  @Prop({ reflect: true }) multiple: boolean = false;

  /** Specifies whether the dropdown accepts key presses to filter results, enabling combobox functionality. */
  @Prop({ reflect: true }) filter: boolean = false;

  /** Indicates that the filtering will be performed by asyncronous calls (handled by application logic). */
  @Prop({reflect: true}) async: boolean = false;

  /** Specifies the number of characters need to emit an event to make an API call and return filtered results. This property is only used when  */
  //@Prop() filterCharacters: number;
  @Prop() minimumInputLength: number;

  /** A JSON object (or stringified JSON) containing an array of labels and values. Labels may contain markup as needed, but in such cases, a value should always be specified explicitly. */
  @Prop() items: string | object;

  /* TODO */
  //@Prop() create: boolean;

  /** Optionally specify the ID of the visible control here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-dropdown');

  /** Specifies the name of the (hidden) form field */
  @Prop() name: string = this.fieldId;

  /** Represents placeholder text on the dropdown control, displayed in a distinctive style from the selected item. Defaults to "Choose Item". Has no effect on multi-selects, as the component manages this text. */
  @Prop({ mutable: true }) placeholder: string = 'Choose Item';

  /** Specifies the visible label on the dropdown control of the selected item. Primarily updated dynamically by the component. */
  @Prop({ mutable: true }) selectedLabel: string;

  /** Specifies the value of the hidden input holding the value (or barring one, the text label) of the selected item. Primarily updated dynamically by the component. */
  @Prop({ mutable: true }) value: any;

  /** Specifies whether the dropdown menu is open/visible. */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /** Specifies that the field has an error (and sets aria-invalid accordingly). Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true }) error: boolean = false;

  /** Specifies that the field is readonly. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true, mutable: true }) readonly: boolean = false;

  /** Specifies that the field is disabled. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  //@State() dropdownItems: HTMLCbpDropdownItemElement[];
  @State() selectedItems: HTMLCbpDropdownItemElement[];
  @State() searchString: string = ''; // This needs to be a state so that it can be used in the render method to replace the control label. TODO: test for accessibility.
  
  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;
  
  /** */
  @Event() populateCombobox: EventEmitter;

  // Dropdown Item selection
  selectDropdownItem({target}) {
    // Ignore a click on the label because it will fire a click on the input as well
    if(target.tagName != "LABEL") {
      this.valueChange.emit({
        host: this.host,
        value: this.value
      });
    }
    //this.selected=true; delegate this to the parent level because we don't know if this is single or multiselect here
  }


  @Listen('dropdownItemClick')
  handleDropdownItemClick({ detail: { host, label, value } }) {
    let oldIndex=this.focusIndex;

    // multi-select behavior
    if (this.multiple) {
      // TechDebt: this should ideally be async/promise. Update: Made selectedItems a State, so this might be fine now. Needs testing.
      let newValue = (host.selected = !host.selected); // toggle the selected state of the item

      setTimeout(() => {
        this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
        this.placeholder = this.selectedItems.length != 1 ? 'Selected Items' : 'Selected Item';
      }, 50);

      // update the values array
      newValue ? (this.value = [...this.value, value]) : (this.value = this.value.filter(item => item !== value));
    }

    // single select
    else {
      this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item'));
      // Deselect all items except the one that was activated
      this.dropdownItems.forEach(item => {
        if (item === host){
          //this.selectedItem = item;
          item.selected = true;
        }
        else item.selected = false;
      });
      // Update values at this level, close the menu, and return focus to the control
      this.selectedLabel = label;
      this.value = value;
      this.open = false;
      // Delay sending focus a bit to prevent enter from re-opening the dropdown (verified)
      setTimeout(() => {
        this.control.focus();
      }, 100);
    }

    // Update the current item for keyboard navigation
    this.setCurrent(this.dropdownItems?.indexOf(host), oldIndex);

    // Emit the custom event
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.value,
      label: this.selectedLabel,
    });
  }



  @Watch('open')
  watchOpen(newValue) {
    // If the menu was opened, give it time to render and set focus to the selected/first item
    if (newValue) {
      this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item')); // Get and set this array whenever the menu is opened
      if (this.dropdownItems.length) this.setDefaultItem();
      //this.listbox.scrollIntoView({behavior: "instant", block: "nearest"}); // TechDebt: is this needed?
      
      // Set up a clickaway listener to close the menu
      clickAwayListener(this.host, _ => {
        this.open = false;
      });
    }
    // If the dropdown was closed, clear any filters
    else {
      this.clearFilters();
    }
  }

  @Watch('value')
  watchValue(newValue) {
    // Only update the selection if the value is different from the hidden field's value (externally updated).
    if (newValue != this.formField?.value) {
      this.setSelectedFromValue(newValue);
    }
    //else console.log('Value Watch on dropdown fired - component and form values already match, so no action needed.');
  }

  setSelectedFromValue(value) {
    this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item')); // make sure this array is accurate
    
    if(this.multiple) {
      // TODO
    }

    else {
      // Select the item with the value and deselect the rest
      this.dropdownItems.forEach( (item) => {
        if (item.value == value){
          //this.selectedItem = item;
          this.selectedLabel = item.innerText;
          //this.focusIndex = index;
          item.selected = true;
        }
        else item.selected = false;
      });
    }
  }

  //@Watch('items') 
  generateItems() {
    let items;
    if (typeof this.items == 'string') {
      items = JSON.parse(this.items) || {};
    }
    else if (typeof this.items == 'object') {
      items = this.items;
    }

    // clear the dropdownItems array
    let dropdownItems: HTMLCbpDropdownItemElement[] = []
    // re-populate it from items prop (JSON) 
    items.map(({ label, value=label }) => {
      let newItem: HTMLCbpDropdownItemElement = <cbp-dropdown-item value={value} key={`cbp-dropdown-item-${value}`}>{label}</cbp-dropdown-item>;
      dropdownItems = [...dropdownItems, newItem]
    });
    this.dropdownItems = dropdownItems;
    return dropdownItems;
  }

  /** 
   * A public method to clear all selected items in a dropdown (single or multi-select).
   * Emits the valueChange event afterward.
   */
  @Method()
  async clearSelections() {
    this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    this.selectedItems.forEach(item => {
      item.selected = false;
    });

    // reset the value
    this.multiple ? (this.value = []) : (this.formField.value = undefined);

    // Update the selectedItems state after all of the items have been deselected
    setTimeout(() => {
      this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    }, 100);

    // Emit the custom valueChange event
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.value,
      label: undefined,
    });
  }


  handleSlotChange(e) {
    console.log('Dropdown Slot Change: ', e); // Testing: I don't believe this event fires with polyfilled slots.
  }

  handleCounterClick(e) {
    this.clearSelections();
    e.stopImmediatePropagation();
    this.counterControl.focus();
  }

  handleCounterKeydown(e) {
    const { key } = e;
    if (key == ' ' || key == 'Enter') {
      this.clearSelections();
      e.preventDefault();
      this.counterControl.focus();
    }
  }



  // This handles activating the button via Space or Enter as well (as long as it's not readonly or disabled).
  handleDropdownClick(e) {
    // TechDebt: Should only trigger from mouse/touch, needs verification for mobile touch
    // e.detail = 1 for mouse click and 0 when using the keyboard
    if (e.detail && !this.readonly && !this.disabled) this.open = !this.open;
  }


  // Testing...
  getActionFromKey( event) {
    const { key, altKey, ctrlKey, metaKey } = event;
    const selectKeys = ['Enter', ' '];
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    const navKeys = ['ArrowDown', 'ArrowUp', 'Enter', 'Home', 'End']; // all keys that will do the default open action

    // If the menu is already open, pressing enter or space triggers a click on the current item. 
    // Run this first, before the menu may be opened by later code.
    if (this.open && selectKeys.includes(key)) {
      //event.preventDefault();
      this.dropdownItems[this.focusIndex]?.click();
      return;
    }

    // Navigation within an open menu
    if (this.open) {
      const i = (this.filter && this.searchString) ? this.matchIndex : this.focusIndex;
      const l = (this.filter && this.searchString) ? this.matches?.length -1 || 0: this.dropdownItems?.length - 1 || 0;
      const n = {
        Home: 0,
        ArrowUp: -1 < i + -1 ? i + -1 : l,
        ArrowDown: l + 1 > i + 1 ? i + 1 : 0,
        End: l,
      }[key];
      if (n !== undefined && key !== 'Tab') {
        this.matchIndex = n;
        this.setCurrent( (this.filter && this.searchString) ? this.matches[n] : n, this.focusIndex);
        if (!this.filter) this.searchString='';
      }
    }
        
    // handle opening when closed
    if (openKeys.includes(key) && !this.readonly && !this.disabled) {
      if (!this.open) this.open = true;
    }

    // Close the menu when pressing ESC anywhere in the component and send focus back to the control
    if (key == 'Escape') {
      this.open = false;
      this.control.focus();
    }
    // Close the menu when pressing ESC anywhere in the component and send focus back to the control
    if (key == 'Tab') {
      this.open = false;
    }

    
    // handle typing characters when open or closed
    if ( key === 'Backspace' || key === 'Clear' ||
        (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey && !navKeys.includes(key))
    ) {
      this.open=true;
      this.filter ? this.searchByString(key.toLowerCase()) : this.jumpToLetter(key.toLowerCase());
    }
  }


  /*
   *  Single letter cycling (like a native select)
   */
  jumpToLetter(letter) {
    // if the letter pressed is different from the last one, find all the matches and select the first
    if (letter != this.searchString) {
      this.searchString = letter;
      this.getFirstLetterMatches(letter);

      if (this.matches.length > 0) {
        this.matchIndex=0;
        this.setCurrent(this.matches[0],this.focusIndex);
      }
    }
    // If the letter pressed matched the last one, cycle through the matches
    else {
      if (this.matches.length > 0) {
        if (this.matchIndex+1 < this.matches.length) this.matchIndex += 1;
        else this.matchIndex = 0;
        this.setCurrent(this.matches[this.matchIndex],this.focusIndex);
      }
    }
  }

  getFirstLetterMatches(letter) {
    let matches=[];
    this.dropdownItems.forEach( (item, index) => {
      const label=item.innerText.toLowerCase();
      // does this item start with the character pressed?
      if (label.startsWith(letter)) {
        matches=[...matches, index];
      }
    });
    this.matches = matches;
  }
  

  /*
    Filtering by search string
  */
  searchByString(letter) {
    // handle deletion of a character
    if ( letter == 'backspace' || letter == 'clear') {
      const l = this.searchString.length;
      if (l <= 1) {
        this.clearFilters();
        return;
      }
      else this.searchString = this.searchString.substring(0, l - 1);
    }
    // Otherwise append the letter to the searchString
    else {
      this.searchString += letter;
    }

    if (this.async) {
      // For async calls, emit an event so that app logic can populate the items(JSON) proop
      if (this.searchString.length >= this.minimumInputLength) {
        this.populateCombobox.emit({
          searchString: this.searchString,
          host: this.host
        });
      }
      // If the search string doesn't meet the threshold, clear items and matches
      else {
        this.items=[];
        this.matches=[];
      }
    }
    // If not async or we already have matches from the async call, just filter within them
    else {
      this.getSearchStringMatches(this.searchString);
      this.filterDropdownItems(this.matches);
      if (this.matches.length > 0) {
        this.setCurrent(this.matches[0],this.focusIndex);
      }
    }
  };
  
  // Updates the matches[], based on search string matches
  getSearchStringMatches(searchString) {
    let matches=[];
    this.dropdownItems.forEach( (item, index) => {
      const label=item.innerText.toLowerCase();

      // does this item contain the search string entered?
      if (label.indexOf(searchString) >= 0) {
        matches=[...matches, index];
      }
    });
    this.matches = matches;
    this.matchIndex=0;
  }

  // Updates the selectable dropdown items based on matches[]
  filterDropdownItems(matches){
    this.dropdownItems.forEach( (item, index) => {
      matches.includes(index) ? item.removeAttribute('hidden') : item.setAttribute('hidden','');
    });
  }

  // Clears all filters and variables that persist them.
  clearFilters() {
    this.matches=[];
    this.matchIndex=undefined;
    //this.focusIndex=undefined;
    this.searchString='';
    this.dropdownItems.forEach( item => {
      item.removeAttribute('hidden');
    });
  }



  /*
   *  Managing the "current" item for keyboard navigation
   */
  setDefaultItem(){
    let oldIndex = this.focusIndex;
    let newIndex;
    this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    
    // If there are selected item(s), set the first one as current, or else the first dropdown item
    if (this.selectedItems.length) {
      newIndex=this.dropdownItems.indexOf(this.selectedItems[0]);
    }
    else newIndex = 0;

    this.setCurrent(newIndex,oldIndex);
  }

  setCurrent(newValue=0, oldValue=undefined) {
    // Unset the old item, if any
    if (oldValue != undefined && oldValue != newValue && this.dropdownItems[oldValue]) {
      this.dropdownItems[oldValue].current=false;
    }

    if (this.dropdownItems[newValue]) {
      this.dropdownItems[newValue].current=true;
      this.control.setAttribute('aria-activedescendant',this.dropdownItems[newValue].id)
      this.focusIndex = newValue;  
    
      // ensure the new option is in view
      if (this.isScrollable(this.listbox)) {
        this.maintainScrollVisibility(this.dropdownItems[newValue], this.listbox);
      }
    }
  }

  // check if an element is currently scrollable
  isScrollable(element) {
    return element && element.clientHeight < element.scrollHeight;
  }

  // ensure a given child element is within the parent's visible scroll area
  // if the child is not visible, scroll the parent
  maintainScrollVisibility(activeElement, scrollParent) {
    const { offsetHeight, offsetTop } = activeElement;
    const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;
    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    if (isAbove) {
      scrollParent.scrollTo(0, offsetTop);
    }
    else if (isBelow) {
      scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
  }



  componentWillLoad() {
    //this.parent = this.host.closest('cbp-form-field');
    this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item'));
    // Look for any selected item to set the initial state, only if the value is not set
    this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    
    this.attachedButtonStart = this.host.querySelector('[slot=cbp-dropdown-attached-button-start]');
    this.attachedButtonEnd = this.host.querySelector('[slot=cbp-dropdown-attached-button-end]');

    // TechDebt: Use the dropdown values as they should match the checkbox values
    if (this.multiple) {
      if (this.selectedItems) this.value=[];
      //this.value = []; // make an array of the values of selected items
      let temp=[]; // make an array of the values of selected items
      this.selectedItems.forEach(item => {
        const checkbox: HTMLInputElement = item.querySelector('input[type=checkbox]');
        temp = [...temp, checkbox.value];
      });
      this.value=temp;
      this.placeholder = this.selectedItems.length != 1 ? 'Selected Items' : 'Selected Item';
    }
    else if (this.filter && this.minimumInputLength) {
      this.placeholder = 'Begin typing to search';
    }

    // Apply sx
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    // Update this with the buttons size
    this.attachedButtonStartWidth = this.attachedButtonStart ? this.attachedButtonStart.offsetWidth : 0;
    this.attachedButtonEndWidth = this.attachedButtonEnd ? this.attachedButtonEnd.offsetWidth : 0;
    
    setCSSProps(this.host, {
      "--cbp-dropdown-attached-button-start-width": `${this.attachedButtonStartWidth}px`,
      "--cbp-dropdown-attached-button-end-width": `${this.attachedButtonEndWidth}px`,
    });

    // TechDebt: this doesn't work here for items specified as JSON, which aren't populated until rendering
    // Get the value and label for single-select after rendering
    if (!this.multiple) {
      if (!this.value || !this.selectedLabel) {
        this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
        if (this.selectedItems.length > 0) {
          this.value = this.selectedItems[0].value || this.selectedItems[0].innerText;
          this.selectedLabel = this.selectedItems[0].innerText;
        }
      }
    }

    // If there are no selected items, but a value is specified, set those items as selected
    if (!this.selectedItems.length && this.value != undefined) {
      this.setSelectedFromValue(this.value);
    }
  }

  componentWillRender() {
    // Disable attached buttons if the dropdown is disabled or has no items.
    if (this.attachedButtonStart) this.attachedButtonStart.disabled=this.disabled || !this.dropdownItems.length;
    if (this.attachedButtonEnd) this.attachedButtonEnd.disabled=this.disabled || !this.dropdownItems.length;
  }

  componentDidRender() {
    // If the items were specified via JSON, they didn't exist until rendering, so set them now.
    if (this.items) {
      this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item'));
      // in async mode, all of the items are matches
      if (this.async) {
        this.matches=[];
        for (let i = 0; i < this.dropdownItems.length; i++ ) {
          this.matches = [...this.matches, i];
        }
      }
    }
  }


  render() {
    return (
      <Host>
        <div class="cbp-dropdown-shrinkwrap">
          
          <slot name="cbp-dropdown-attached-button-start" />

          <button
            type="button"
            class="cbp-custom-form-control"
            id={this.fieldId}
            role="combobox"
            aria-controls={`${this.fieldId}-menu`}
            aria-expanded={`${this.open}`}
            aria-haspopup="listbox"
            aria-invalid={this.error ? 'true' : false}
            disabled={this.disabled || this.readonly || ( (!this.async) && (this.dropdownItems.length < 1))} 
            onClick={(e) => this.handleDropdownClick(e)}
            onKeyDown={e => this.getActionFromKey(e)}
            ref={el => (this.control = el)}
          >
            { (this.selectedLabel || (this.filter && this.searchString)) 
              ? <div class="cbp-dropdown-label">{this.filter && this.searchString ? this.searchString : this.selectedLabel}</div>
              : <div class="cbp-dropdown-placeholder">
                {this.multiple && (
                  <span
                    role="button"
                    tabindex={0}
                    class="cbp-dropdown-multiselect-counter"
                    title={`Click to clear selections`}
                    onClick={e => this.handleCounterClick(e)}
                    onKeyDown={e => this.handleCounterKeydown(e)}
                    ref={el => (this.counterControl = el)}
                  >
                    {this.selectedItems.length}
                    <cbp-icon 
                      name="circle-xmark" 
                      size="var(--cbp-space-3x)" 
                      sx={{ 'margin-inline-start': 'var(--cbp-space-2x)' }} 
                    />
                  </span>
                )}
                {this.placeholder}
              </div>
          }
          </button>

          <slot name="cbp-dropdown-attached-button-end" />

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
            tabIndex={-1}
            id={`${this.fieldId}-menu`}
            ref={el => (this.listbox = el)}
          >
            { this.items 
              ? this.generateItems()
              : <slot onSlotchange ={ (e) => this.handleSlotChange(e)} />
            }
          </div>
        </div>
      </Host>
    );
  }
}
