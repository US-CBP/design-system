import { Component, Prop, State, Element, Event, EventEmitter, Method, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey, clickAwayListener } from '../../utils/utils';
import { floatUI, floatUIProps } from '../../utils/floatingPlacement';

/**
 * The Dropdown component offers an alternative to the native select element that can be fully styled 
 * and support additional variants, such as a multi-select and/or combobox.
 * 
 * @slot - Only Dropdown Items should be placed in the default slot. They get auto-slotted into 'cbp-dropdown-items' behind the scenes.
 * @slot cbp-dropdown-items - Dropdown items are auto-slotted here. Not need to specify this named slot.
 * @slot cbp-dropdown-attached-button-start - Allows for an optional button control to be slotted as an overlay at the start of the dropdown (such as a "previous" button).
 * @slot cbp-dropdown-attached-button-end - Allows for an optional button control to be slotted as an overlay at the end of the dropdown (such as a "next" button).
 */
@Component({
  tag: 'cbp-dropdown',
  styleUrl: 'cbp-dropdown.scss',
})
export class CbpDropdown {

  /*
    TechDebt: things work smoothly for slotted items with the order of lifecycle hooks.
    
    However, when swapping JSON items (async or not), race conditions are present with the
    population of this.dropdownItems and this.selectedItems and setting the 
    default/current item for keyboard support, possibly causing extra re-renders.
    This needs to be stripped down and revisited.
  */

  private control: HTMLButtonElement | HTMLInputElement;
  private formField: HTMLInputElement; // the hidden input that stores the dropdown value for form posts
  
  private initialValue: any // string | object - Save the initial value to support reset functionality

  private listbox: HTMLElement;
  private dropdownItems: HTMLCbpDropdownItemElement[] = [];
  // even with the same typings, these are JSX nodes and behaving differently than Array.from()
  private generatedItems: HTMLCbpDropdownItemElement[] = [];
  private focusIndex: number | undefined;

  private matches: number[] = []; // an array of indexes (to dropdownItems) of the matches.
  private matchIndex: number | undefined; // like focusIndex, but to the matches array

  private counterControl: HTMLElement;
  private createOption: HTMLCbpDropdownItemElement;

  private attachedButtonStart: any;
  private attachedButtonEnd: any;
  private attachedButtonStartWidth;
  private attachedButtonEndWidth;

  private createLabel: string | undefined; // the button label when the create option is in use

  private visible: boolean = false; // tracked for size calculations
  private observer: ResizeObserver;

  private typingMode: boolean = false; // track typing mode for combobox mode (only when filter=true)
  private newItems: boolean = false;

  @Element() private host: HTMLCbpDropdownElement;

  /** 
   * Specifies whether multiple selections are supported, in which case checkboxes shall be slotted in accordance 
   * with the design system specified pattern. Defaults to false, which renders a single-select dropdown. 
   */
  @Prop({ reflect: true }) multiple: boolean = false;

  /** Specifies whether the dropdown accepts key presses to filter results, enabling combobox functionality. */
  @Prop({ reflect: true }) filter: boolean = false;

  /** Indicates that the filtering will be performed by asynchronous calls (handled by application logic). */
  @Prop({reflect: true}) async: boolean = false;

  /** 
   * Specifies the number of characters need to emit an event to make an API call and return filtered results. 
   * This property is only used when filter=true AND async=true.
   */
  @Prop() minimumInputLength: number = 1;

  /** 
   * A JSON object (or stringified JSON) containing an array of labels, values, and optionally selected status. 
   * Labels may contain markup as needed, but in such cases, a value should always be specified explicitly.
   * The expected format is [{"label":"string","value":"string","selected":"boolean (optional"}, ...]
   */
  @Prop() items: string | object;

  /** Specifies that when an exact match is not found for a search string (for combobox functionality), an option to create a new item is presented. */
  @Prop() create: boolean;

  /** 
   * Optionally specify the ID of the visible control here, which is used to generate related 
   * pattern node IDs and associate everything for accessibility. 
   */
  @Prop() fieldId: string = createNamespaceKey('cbp-dropdown');

  /** Specifies the name of the (hidden) form field */
  @Prop() name: string = this.fieldId;

  /** 
   * Represents placeholder text on the dropdown control, displayed in a distinctive style from the 
   * selected item. Defaults to "Choose Item". Has no effect on multi-selects, as the component manages this text. 
   */
  @Prop({ mutable: true }) placeholder: string = 'Choose Item';

  /** 
   * Specifies the visible label on the dropdown control of the selected item. 
   * Primarily updated dynamically by the component. 
   */
  @Prop({ mutable: true }) selectedLabel: string | undefined;

  /** 
   * Specifies the value of the hidden input holding the value (or barring one, the text label) 
   * of the selected item. Primarily updated dynamically by the component. 
   */
  @Prop({ mutable: true }) value: any = ''; //string | object;

  /** Specifies whether the dropdown menu is open/visible. */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /** 
   * Specifies that the field has an error (and sets aria-invalid accordingly). Primarily controlled by the 
   * parent `cbp-form-field` component. 
   */
  @Prop({ reflect: true }) error: boolean = false;

  /** Specifies that the field is readonly. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true, mutable: true }) readonly: boolean = false; // TechDebt: there's no such thing as a readonly dropdown/select. Can this be removed or is it needed for compatibility with the parent form field component?

  /** Specifies that the field is disabled. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles (to the host) as an object. This property is not reactive. */
  @Prop() sx: any = {};

  /** Turns on debug mode, since the dropdown is complex and has complex integration concerns. (This prop is temporary and will be removed) */
  @Prop() debug: boolean = false;


  //@State() dropdownItems: HTMLCbpDropdownItemElement[];
  @State() private selectedItems: HTMLCbpDropdownItemElement[] = [];
  @State() private selectedItemCount: number=0;
  @State() private searchString: string = ''; // This needs to be a state so that it can be used in the render method to replace the control label. TODO: test for accessibility.
  

  /** A custom event emitted when the a selection is made in the dropdown. */
  @Event() valueChange: EventEmitter;

  /** A custom event that is fired when the "create item" option is clicked. */
  @Event() createItem: EventEmitter;

  /** A custom event that is fired when a key is pressed while filtering a combobox. */
  @Event() filterKeypress: EventEmitter;

  /** 
   * A custom event emitted for asynchronous comboboxes (`async=true` and `filter=true`) and 
   * the search string meets the `minimumInputLength` requirement. 
   * This event can be listened for and the `items` (JSON) updated via application logic/service call.
   */
  @Event() populateCombobox: EventEmitter;



  @Listen('dropdownItemClick')
  handleDropdownItemClick(e) {
    const { host, label, value } = e.detail;
    let oldIndex = this.focusIndex;

    // If this was a "Create" item, then ignore all other behavior
    if (this.create && label==`Create "${value}"`) {
      this.doCreateItem(e);

      // Update the current item for keyboard navigation
      //this.setCurrent(this.dropdownItems?.indexOf(host), oldIndex);
      
      // Delay sending focus a bit to prevent enter from re-opening the dropdown (verified)
      setTimeout(() => {
        this.control.focus();
      }, 100);
    }
    
    // Not a "Create" item
    else {
      // multi-select behavior
      if (this.multiple) {
        // TechDebt: this should ideally be async/promise. Update: Made selectedItems a State, so this might be fine now. Needs testing.
        let newValue = host.selected = !host.selected; // toggle the selected state of the item

        setTimeout(() => {
          this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
          this.placeholder = this.selectedItems.length != 1 ? 'Selected Items' : 'Selected Item';
        }, 50);

        this.updateValue(value,newValue);

        // send focus back to the control in case it was trapped in a checkbox
        this.control.focus();
      }

      // single select
      else {
        //this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item'));
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
        this.control.value = label; // update the control value, which only has a visible effect for the combobox text input
        if(this.filter) this.searchString = label;
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
        nativeEvent: e
      });

      // debugging
      if(this.debug) console.log('cbp-dropdown debugging - valueChange fired: ', 
        {
          host: this.host,
          nativeElement: this.formField,
          value: this.value,
          label: this.selectedLabel,
          nativeEvent: e
        }
      );
    }
  }


  @Watch('open')
  watchOpen(newValue) {
    // If the menu was opened, give it time to render and set focus to the selected/first item
    if (newValue) {
      // Reassigning this.dropdownitems breaks the rendering for some reason. The array is not the same as when generated.
      //this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item')); // Get and set this array whenever the menu is opened
      
      // Only set the selectedItems if they were slotted
      if (!this.items) {
        this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')); // Get and set this array whenever the menu is opened
        this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
      }
      
      // Set the default Item for keyboard navigation if the items are already defined (otherwise, do it after re-rendering)
      if (this.dropdownItems.length) this.setDefaultItem();

      // Set up a clickaway listener to close the menu
      clickAwayListener(this.host, _ => {
        this.open = false;
      });
    }

    // If the dropdown was closed, clear any filters and reset the "current" status of dropdown items.
    else {
      this.dropdownItems.forEach( item => {
        item.current=false;
      })
      this.control.removeAttribute('aria-activedescendant');
      
      // Clear multi-select comboboxes (to show default state), but not single select comboboxes, which retain the selection text.
      if (this.multiple && this.filter) {
        this.clearFilters();
      }
    }
  }

  @Watch('value')
  watchValue(newValue, oldValue) {
    // TechDebt: reevaluate - does this make sense and what is the interplay with repopulating a JSON?
    if(this.debug) console.log('cbp-dropdown debugging - watch on value fired: ', {newValue}, {oldValue}, this.formField?.value);

    // Only update the selection if the value is different from the hidden field's value (externally updated).
    // TechDebt: verify this isn't prone to race conditions when re-rendering
        if (newValue != this.formField?.value) {
      this.setSelectedFromValue();
    }
    //else console.log('Value Watch on dropdown fired - component and form values already match, so no action needed.');
  }

  @Watch('items')
  watchItems(newValue) {
    if(this.debug) console.log('cbp-dropdown debugging - watch on items fired: ', {newValue});
    this.newItems = true;
    this.generatedItems = this.generateItems(newValue);

    // For async, set the matches array as well
    if(this.async) {
      this.selectedItems=[];
      this.selectedItemCount=0;

      let matches: number[] = [];
      this.generatedItems.forEach( (_, index) => {
        matches = [...matches, index];
      })
      this.matches = matches;
    }
  }

  /** 
   * A custom method to reset the Dropdown component to its initial state and value since it does not update 
   * properly on a native form reset. This method may be called manually, but is automatically called on 
   * form reset when using the `cbp-form` component.
   */
  @Method()
  async reset() {
    // TODO: Verify that this works to update the field across all variants (single, multi, slotted/JSON items, filtered, async)
    if(this.debug) console.log(`cbp-dropdown debugging - resetting from ${this.value} to ${this.initialValue}.`, this.host);

    // Clear all of the selected items and internal states
    this.selectedItems?.forEach(item => {
      item.selected = false;
      item.current = false;
    });
    this.selectedLabel=this.focusIndex=this.matchIndex=undefined;
    this.searchString='';
    this.matches=[];

    // set the value back to the initial value
    this.value=this.initialValue;
    
    if (this.value != '') this.setSelectedFromValue(); // TechDebt: this is not working fully for multi-select
  }

  /** 
   * A public method to clear all selected items in a dropdown (single or multi-select).
   * Emits the valueChange event afterward.
   */
  @Method()
  async clearSelections(e=undefined) {
    this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    this.selectedItems.forEach(item => {
      item.selected = false;
    });

    // reset the value
    this.multiple ? (this.value = []) : (this.formField.value = '');

    // Update the selectedItems state after all of the items have been deselected
    setTimeout(() => {
      this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    }, 100);

    // Emit the custom valueChange event only when triggered by the user from the built-in counter pill control
    if(e != undefined) {
      this.valueChange.emit({
        host: this.host,
        nativeElement: this.formField,
        value: this.value,
        label: undefined,
        nativeEvent: e
      });

      // debugging
      if(this.debug) console.log('cbp-dropdown debugging - valueChange fired from clearSelections method: ', 
        {
          host: this.host,
          nativeElement: this.formField,
          value: this.value,
          label: undefined,
          nativeEvent: e
        }
      );
    }
  }


  // TODO: Reorder multi-select dropdowns with selected items at the start (only works with JSON items)
  /*
  multiSelectReorderSelected() {
    itemsJSON = 
    let selectedItems = this.items.filter( (item) =>  item.value ? this.value.includes(item.value) : this.value.includes(item.label));
    let unselectedItems = this.items.filter( (item) =>  item.value ? !e.detail.value.includes(item.value) : !e.detail.value.includes(item.label));
    // return the filtered JSON result to the component via the items property
    this.items = [...selectedItems, ...unselectedItems];
  }
  */

  // Create a new dropdown item (and select it) after the user clicked the "Create" item
  doCreateItem(e: CustomEvent){
    const { value } = e.detail;
    e.stopPropagation();

    // Emit a custom event in case something needs to be done on the app/backend
    this.createItem.emit({
      host: this.host,
      value: value,
    })

    // Add the new item to the dropdown
    const newItem: HTMLCbpDropdownItemElement = document.createElement('cbp-dropdown-item');
    newItem.value=value;
    newItem.selected=true;
    if (this.multiple) {
      newItem.innerHTML=`<cbp-checkbox ${this.context ? `context="${this.context}"` : ''}>
        <input 
          type="checkbox" 
          name="${this.name}-selection"
          value="${value}"
          tabindex={-1}
          checked
        />
        ${value}
      </cbp-checkbox>`;
    }
    else newItem.textContent=e.detail.value;
    this.host.appendChild(newItem);
    
    // close the menu and update the value
    this.updateValue(e.detail.value);
    if (!this.multiple) this.selectedLabel = e.detail.value;
    
    // if async, add the item to the items JSON (after the value was updated for the correct selected state)
    if(this.async || !!this.items) {
      let items: any;
      if (typeof this.items == 'string') {
        items = JSON.parse(this.items) || {};
      }
      else items = this.items;
      const newItemJSON: object = {label : e.detail.value, value : e.detail.value};
      this.items = [...items, newItemJSON]
    }

    // for multi-select, the dropdown stays open; we need to add the new item and remove the "create" option.
    if (this.multiple) {
      this.dropdownItems=Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results,.cbp-dropdown-create-item)'));
      //const createItem=this.listbox.querySelector('cbp-dropdown-item.cbp-dropdown-create-item');
      this.createOption?.setAttribute('hidden',''); // hide the create item immediately since it's not always removed properly from the render immediately upon creating the item.
    }
    else this.open=false;

    // set focusIndex to the newly created item???
  }


  updateValue(value:string, selected:boolean=true) {
    // multi-select behavior
    if (this.multiple) {
        // If there is already a value, turn it into an array
        if(this.value && typeof this.value == "string") this.value=this.value.split(',');
        // Update the values array based on selected/unselected state of the clicked item
        selected ? (this.value = [...this.value, value]) : (this.value = this.value.filter(item => item !== value));
    }
    // single select
    else {
      this.value = value;
    }
  }

  setSelectedFromValue() {
    // debugging
    if(this.debug) console.log('cbp-dropdown debugging - setSelectedFromValue:', this.value, this.host);

    this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)')); // make sure this array is accurate
    let selectedItems:HTMLCbpDropdownItemElement[] = [];
    
    if(this.multiple) {
      let values = (typeof this.value == "string") ? this.value.split(",") : this.value;

      // deselect them all first
      this.dropdownItems.forEach( item => {
        item.selected=false;
      });

      // now select those from the values
      this.dropdownItems.forEach( item => {
        if(item.value) {
          if(values.includes(item.value)) {
            item.selected=true;
            selectedItems=[...selectedItems, item]
          }
        }
        // If there's no value, the item will be stored in the hidden input value using the label (like a native select)
        else {
          if(values.includes(item.innerText.trim())) {
            item.selected=true;
            selectedItems=[...selectedItems, item]
          } 
        }
      });
      // Updating this state will cause a re-render and the number on the multi-select to update
      this.selectedItems.length > 0 ? this.selectedItems=[...selectedItems] : this.selectedItems=[];
    }

    // Single select
    else {
      // Select the item with the value and deselect the rest
      this.dropdownItems.forEach( item => {
        if (item.value == this.value){
          this.selectedLabel = item.innerText.trim();
          item.selected = true;
          this.selectedItems=[...selectedItems, item];
        }
        else item.selected = false;
      });
    }
  }

  setValueFromSelected() {
    // debugging
    if(this.debug) console.log('cbp-dropdown debugging - setValueFromSelected:', this.host);

    this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));

    if (this.multiple) {
      if (!!this.selectedItems) this.value=[];
      let temp: string[] = []; // make an array of the values of selected items
      this.selectedItems.forEach(item => {
        const checkbox = item.querySelector('input[type=checkbox]') as HTMLInputElement;
        temp = [...temp, checkbox.value];
      });
      this.value=temp;
      this.placeholder = this.selectedItems.length != 1 ? 'Selected Items' : 'Selected Item';
      this.selectedItemCount = this.selectedItems.length;
    }
    // If single-select, only 1 selection should be valid so take the first one from the array
    else {
      this.value = this.selectedItems.length ? this.selectedItems?.[0].value || this.selectedItems?.[0].innerText : '';
      this.selectedLabel = this.selectedItems.length ? this.selectedItems?.[0].innerText : undefined;
    }

    this.selectedItemCount = this.value.length;

  }


  /*
    When generating new items based on JSON, it will attempt to set those items matching the value 
    as selected, but it will not run setValueFromSelected().

    The `value` property should not be set explicitly if there are items marked as selected. 
    But in the case that this occurs, the selected items will override the specified value; 
    the value will be updated to match the selected items.

    Issues with JSON generated items:

    For async, the initial selection is always the first item, not a selection if any -
      until user interaction occurs, then it updates to the first selected item if shown

  */
  generateItems(items) {
    // Parse stringified JSON into an object for easier manipulation
    if (typeof items == 'string') {
      items = JSON.parse(items) || {};
    }

    let firstSelected: number | undefined;
    let newValue: any;

    // Search the JSON to see if selected items are being set explicitly
    const SelectedItems = items.filter( (item) => ('selected' in item && !!item.selected) );
    const Selected = SelectedItems.length ? true : false;
    
    // If selections specified via JSON items, rebuild the value
    if(Selected) newValue = [];
    // Otherwise, if there is already a string value for multiselect, turn it into an array
    else if(this.multiple && this.value && typeof this.value == "string") this.value=this.value.split(',');

    // for async dropdowns, clear the items locally if search string is too short (the component is not emitting an event to update then)
    if (this.async && this.searchString.length < this.minimumInputLength) {
      items = this.dropdownItems = [];
    }
    
    // clear the dropdownItems array
    let generatedItems: HTMLCbpDropdownItemElement[] = [];

    // Repopulate the list with selected items if they are not in the list of values
    /*
      This is not working when using async and < minimumInputLength
      or
      Filtered to 0 results (all disappear).

      As long as a result is returned, the selected items are preserved and shown.
    */

    /*
    this.selectedItems.forEach( item => {
      // If the selected item is not already in this.items, add it.
      let exists = items.length ? items.find( (obj) => (obj.label === item.innerText) ) : true;
      
      console.log('Looking for item: ', item, exists, items?.length, items);

      if (!exists) {  
        console.log('Item doesn't exist, creating a new one from selected item: ',item);
        let newItem: HTMLCbpDropdownItemElement = !this.multiple 
          ? <cbp-dropdown-item value={item?.value} 
              key={`cbp-dropdown-item-${item?.value}`}
            >
              {item.innerText}
            </cbp-dropdown-item>
          : <cbp-dropdown-item 
              value={item.value} 
              key={`cbp-dropdown-item-${item?.value}`} 
              selected
            >
              <cbp-checkbox checked context={this.context}>
                <input 
                  type="checkbox" 
                  name={`${this.name}-selection`}
                  value={item?.value}
                />
                {item.innerText}
              </cbp-checkbox>
            </cbp-dropdown-item>;
        dropdownItems = [...dropdownItems, newItem];
      }
    });
    */

    // re-populate it from items prop (JSON) 
    items.map( ( { label, value=label, selected=undefined }, index) => {
      const ItemSelected = Selected 
            ? !!selected
              ? true : false
            : (this.multiple && this.value?.includes(value)) 
              ? true 
              : (!this.multiple && this.value==value) 
                ? true
                : false;

      let newItem: HTMLCbpDropdownItemElement =  
        <cbp-dropdown-item 
          value={`${value}`} 
          key={`cbp-dropdown-item-${value}`} 
          selected={ItemSelected}
        >
          {this.multiple ?
            <cbp-checkbox
              checked={ItemSelected}
              context={this.context}
            >
              <input 
                type="checkbox" 
                value={`${value}`}
                tabindex={-1}
              />
              {label}
            </cbp-checkbox>
            : `${label}`
          }
        </cbp-dropdown-item>;

      // Update the value if selected items specified through JSON
      if(Selected && ItemSelected==true) {
        if(firstSelected == undefined) this.focusIndex=this.matchIndex=index;
        newValue = this.multiple ? [...newValue, value] : value;
        if(!this.multiple) this.selectedLabel=label;
      }

      generatedItems = [...generatedItems, newItem];
    });

    // If selected states were specified via JSON, update the value based on that...
    if (Selected) this.value = newValue;

    if(this.multiple) {
      this.selectedItemCount = Selected ? SelectedItems.length : this.value.length;
      this.placeholder = this.selectedItemCount != 1 ? 'Selected Items' : 'Selected Item';
    }

    // debugging
    if(this.debug) console.log('cbp-dropdown debugging - generateItems from JSON items property:', items, this.value, this.host);

    
    return generatedItems;
  }


  // Check existing items in a combobox for an exact match to hide the "create" option in that case
  checkExactMatch(): boolean {
    let exactMatch: boolean = false;
    this.dropdownItems.forEach( item => {
      const label = item.innerText.toLowerCase().trim();
      if (this.searchString.toLowerCase() == label) exactMatch=true;
    });
    return exactMatch;
  }

  handleSlotChange(e) {
    console.log('Dropdown Slot Change: ', e); // Testing: I don't believe this event fires with polyfilled slots.
  }

  handleCounterClick(e) {
    this.clearSelections(e);
    e.stopImmediatePropagation();
    this.counterControl.focus();
  }

  handleCounterKeydown(e) {
    const { key } = e;
    if (key == ' ' || key == 'Enter') {
      this.clearSelections(e);
      e.preventDefault();
      this.counterControl.focus();
    }
  }



  // This handles activating the button via touch, Space or Enter as well (as long as it's not readonly or disabled).
  handleDropdownClick(e) {
    if (e.detail && !this.readonly && !this.disabled) {
      this.open = !this.open;
      this.control?.focus();
    }
  }

  // Handles navigation and selection keys
  getActionFromKey(event) {
    const { key, altKey, ctrlKey, metaKey } = event;
    const selectKeys = ['Enter', ' '];
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    const navKeys = ['ArrowDown', 'ArrowUp', 'Enter', 'Home', 'End']; // all keys that will do the default open action

    // If the menu is already open, pressing enter or space triggers a click on the current item -
    // with an exception for pressing space as part of a combobox searchString (not the first character).
    // Run this first, before the menu may be opened by later code.
    if (this.open && selectKeys.includes(key) && !this.typingMode) {
      event.preventDefault();
      this.dropdownItems[this.focusIndex!]?.click();
      return;
    }

    // Navigation within an open menu
    if (this.open) {
      const i = (this.filter && this.searchString) ? this.matchIndex : this.focusIndex; // index
      const l = (this.filter && this.searchString) ? this.matches?.length -1 || 0: this.dropdownItems?.length - 1 || 0; // length
      const n = {
        Home: 0,
        ArrowUp: -1 < i! + -1 ? i! + -1 : l,
        ArrowDown: l + 1 > i! + 1 ? i! + 1 : 0,
        End: l,
      }[key]; //navigation key pressed

      // If it was a navigation key
      if (n !== undefined && key !== 'Tab') {
        this.typingMode=false;
        this.matchIndex = n;
        this.setCurrent( (this.filter && (this.searchString)) ? this.matches[n] : n, this.focusIndex); // default to 0 if create?
        if (!this.filter) this.searchString='';
      }
    }

    // handle opening when closed
    if (openKeys.includes(key) && !this.readonly && !this.disabled) {
      if (!this.open) {
        this.open = true;
        this.typingMode=false;
      }
    }

    // Close the menu when pressing ESC anywhere in the component and send focus back to the control
    if (key == 'Escape') {
      this.open = false;
      this.typingMode=false;
      this.control.focus();
    }
    // Close the menu when pressing TAB anywhere in the component
    if (key == 'Tab') {
      this.typingMode=false;
      this.open = false;
    }

    
    // handle typing characters when open or closed, allowing for Space as part of the searchString (not first character)
    if ( key === 'Backspace' || key === 'Clear' || (key == ' ' && this.typingMode) ||
        (
          key.length === 1 && 
          !altKey && 
          !ctrlKey && 
          !metaKey && 
          !navKeys.includes(key)
        )
    ) {
      this.open=true;
      if(this.filter) this.typingMode=true;
      if(!this.filter) this.jumpToLetter(key.toLowerCase()); // combobox will pass through functionality to onInput to make use of the modified input
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
        if (this.matchIndex! + 1 < this.matches.length) this.matchIndex! += 1;
        else this.matchIndex = 0;
        this.setCurrent(this.matches[this.matchIndex!],this.focusIndex);
      }
    }
  }

  getFirstLetterMatches(letter) {
    let matches: number[] = [];
    this.dropdownItems.forEach( (item, index) => {
      const label=item.innerText.toLowerCase().trim();
      // does this item start with the character pressed?
      if (label.startsWith(letter)) {
        matches=[...matches, index];
      }
    });
    this.matches = matches;
  }


  // The input even now triggers filtering in a combobox after keyboard navigation has been filtered out
  handleComboBoxInput(event) {
    this.searchString = this.control.value.toLowerCase();
    this.searchByString(this.searchString, event);
  }

  // Filtering by search string via "input" event rather than keypress (supports arbitrary typing/deletion as well as paste)
  searchByString(searchString,e) {
    // Emit the filterKeypress event once the search string is updated
    this.filterKeypress.emit({
      host: this.host,
      searchString: searchString,
      nativeEvent: e
    })

    // async combobox
    if (this.async) {
      // For async calls, emit an event so that app logic can populate the items(JSON) prop
      if (this.searchString.length >= this.minimumInputLength) {
        this.populateCombobox.emit({
          host: this.host,
          searchString: searchString,
          nativeEvent: e
        });
      }
      // If the search string doesn't meet the threshold, clear items and matches
      else {
        // Clear items when searchString is shorter than minimumInputLength
        this.items = [];
        // Can we show the selected items still?
        //this.items=[...this.selectedItems]; // TechDebt: revisit later
      }
    }

    // If not async filter within them
    else {
      this.getSearchStringMatches(searchString);
      this.filterDropdownItems(this.matches);
      if (this.matches.length > 0) {
        this.setCurrent(this.matches[0],this.focusIndex);
      }
    }
  };
  
  // Updates the matches[], based on search string matches (searching the entire collection of dropdown items)
  getSearchStringMatches(searchString) {
    let matches: number[] = [];
    this.dropdownItems.forEach( (item, index) => {
      const label=item.innerText.toLowerCase().trim();

      // does this item contain the search string entered?
      if (label.indexOf(searchString) >= 0) {
        matches=[...matches, index];
      }
      // don't filter out the "create" item
      if (item.classList.contains('cbp-dropdown-create-item')) {
        matches=[...matches, index];
      }
    });
    this.matches = matches;
    this.matchIndex=0;
  }

  // Updates the selectable dropdown items based on matches[] by hiding the rest
  filterDropdownItems(matches){
    this.dropdownItems.forEach( (item, index) => {
      matches.includes(index) ? item.removeAttribute('hidden') : item.setAttribute('hidden','');
    });
  }

  // Clears all filters and variables that persist them.
  clearFilters() {
    this.matches=[];
    this.matchIndex=undefined;
    this.searchString='';
    this.control.value='';
    this.dropdownItems.forEach( item => {
      if (!item.classList.contains('cbp-dropdown-item-no-results')) item.removeAttribute('hidden');
    });
  }


  // Managing the "current" item for keyboard navigation
  // May cause a re-render if selectedItems (state) is updated
  setDefaultItem(){
    let oldIndex = this.focusIndex;
    let newIndex;
 
    // This may not always work due to race conditions, but get the latest anyway
    this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));

    // If there are selected item(s), set the first one as current, or else the first dropdown item
    if (this.selectedItems.length) {
      newIndex=this.dropdownItems.indexOf(this.selectedItems[0]);
    }
    else newIndex = 0;

    this.setCurrent(newIndex,oldIndex);
  }


  // Sets the "current" item during keyboard navigation
  setCurrent(newValue: number = 0, oldValue: number | undefined = undefined) {
    if(this.debug) console.log('cbp-dropdown debugging - setCurrent(): ', oldValue, ' => ', newValue);

    // Unset the old item, if any
    if (oldValue != undefined && oldValue != newValue && this.dropdownItems[oldValue]) {
      this.dropdownItems[oldValue].current=false;
    }

    if (this.dropdownItems[newValue]) {
      this.dropdownItems[newValue].current=true;
      this.control.setAttribute('aria-activedescendant',this.dropdownItems[newValue].id)
      this.focusIndex = newValue;
      if (this.async) this.matchIndex = newValue;

      // ensure the new option is in view
      setTimeout( () => {
        if (this.isScrollable(this.listbox))
          this.maintainScrollVisibility(this.dropdownItems[newValue], this.listbox);
      }, 10);
    }
    else {
      if(this.debug) console.log(`cbp-dropdown debugging - attempting to setCurrent, but ${newValue} does not exist as an index in this.dropdownItems.`, newValue, oldValue, this.dropdownItems);
    }
  }

  // check if an element is currently scrollable
  isScrollable(element) {
    return element && element.clientHeight < element.scrollHeight;
  }

  // Ensure a given child element is within the parent's visible scroll area;
  // if the child is not visible, scroll the parent.
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

  getSizeInfo() {
    this.visible = !!this.host.offsetWidth;

    if (this.visible) {
      // remove the resize observer if one was created
      if (this.observer) this.observer.disconnect();

      // Allocate space for attached buttons in overall sizing
      this.attachedButtonStartWidth = this.attachedButtonStart ? this.attachedButtonStart.offsetWidth : 0;
      this.attachedButtonEndWidth = this.attachedButtonEnd ? this.attachedButtonEnd.offsetWidth : 0;
      setCSSProps(this.host, {
        "--cbp-dropdown-attached-button-start-width": `${this.attachedButtonStartWidth}px`,
        "--cbp-dropdown-attached-button-end-width": `${this.attachedButtonEndWidth}px`,
      });
    }
    else if(!this.observer) {
      // Set up a resize observer to check for when the host becomes visible and gets a size.
      this.observer = new ResizeObserver(() => {
        this.getSizeInfo();
      });
      this.observer.observe(this.host);
    }
  }

  
  componentWillLoad() {
    // Generate the items from the property before rendering, if provided. (also done in the @watch if changed)
    if(!!this.items) {
      this.generatedItems = this.generateItems(this.items);
    }
    // If slotting dropdown items, query them to store as an array
    else {
      this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
      // Look for any selected item to set the initial state, only if the value is not set
      this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    }
    this.attachedButtonStart = this.host.querySelector('[slot=cbp-dropdown-attached-button-start]');
    this.attachedButtonEnd = this.host.querySelector('[slot=cbp-dropdown-attached-button-end]');

    // TechDebt: Use the dropdown values as they should match the checkbox values
    if (this.multiple && !this.value) {
      if (!!this.selectedItems) this.value=[];
      let temp: string[] = []; // make an array of the values of selected items
      this.selectedItems.forEach(item => {
        const checkbox = item.querySelector('input[type=checkbox]') as HTMLInputElement;
        temp = [...temp, checkbox.value];
      });
      this.value=temp;
      this.placeholder = this.selectedItems.length != 1 ? 'Selected Items' : 'Selected Item';
    }

    else if (this.filter && this.minimumInputLength && !this.value && !this.selectedLabel) {
      this.placeholder = 'Begin typing to search';
    }

    // Set the selected items count from the value on initial load
    if (this.multiple && !!this.value) {
      if (typeof this.value == "string") this.value=this.value.split(",");
        this.selectedItemCount = this.value.length;
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
    // Allocate space for attached buttons in overall sizing
    this.getSizeInfo();

    // Get the value and label for single-select (this doesn't work for items specified as JSON)
    this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
    if (!this.multiple) {
      if (!this.value || !this.selectedLabel) {
        if (this.selectedItems.length > 0) {
          this.value = this.selectedItems[0].value || this.selectedItems[0].innerText.trim();
          this.selectedLabel = this.selectedItems[0]?.innerText.trim();
        }
      }
    }

    // If there are no selected items, but a value is specified, set those items as selected
    if (!this.selectedItems.length && !!this.value) {
      this.setSelectedFromValue();
    }

    this.initialValue = this.value;
  }

  // Useful to see which prop/state initiated a re-render
  componentShouldUpdate(newValue, oldValue, changed) {
    if(this.debug) console.log(`cbp-dropdown debugging - componentShouldUpdate based on ${changed} prop/state update: `, oldValue, ' => ', newValue )
  }

  componentWillRender() {
    //if (this.open) this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    // Disable attached buttons if the dropdown is disabled or has no items.
    if (this.attachedButtonStart) this.attachedButtonStart.disabled=this.disabled || !this.dropdownItems.length;
    if (this.attachedButtonEnd) this.attachedButtonEnd.disabled=this.disabled || !this.dropdownItems.length;
  }

  componentDidRender() {
    // update the list of items every render for an open dropdown in case an item was created.
    if (this.open) this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
    
    // If the items were specified via JSON, they didn't exist until rendering, so set them now.
    if (this.items) {
      //this.dropdownItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item:not(.cbp-dropdown-item-no-results)'));
      // in async mode, all of the items are matches
      if (this.async) {
        // set matches = items because we're in combobox mode
        this.matches=[];
        for (let i = 0; i < this.dropdownItems.length; i++ ) {
          this.matches = [...this.matches, i];
        }
      }
      // if new items were rendered, set the selected item(s) and toggle the newItems flag to false once updated
      if(this.newItems) {
        this.selectedItems = Array.from(this.host.querySelectorAll('cbp-dropdown-item[selected]'));
        this.setCurrent(this.focusIndex);
        this.newItems = false;
      }
    }

    if(this.debug) console.log('cbp-dropdown debugging - componentDidRender() dropdown items/selected items: ', this.dropdownItems, this.selectedItems);


    // Use floatPlacement to position cbp-dropdown-menu
    if(this.open){
       const floatUiprops: floatUIProps= {
          placement: 'bottom',
          offset: {
            mainAxis: 0,
          },
          flip: true,
          shift: true,
        }
  
        floatUI(floatUiprops, this.control, this.listbox);
      // }
    }
  }


  render() {
    if(this.debug) console.log('cbp-dropdown debugging - Rendering dropdown: ', this.host, this.value);
    if (this.multiple) {
      this.selectedItemCount = this.value.length; // value was already split on initial load
    }
    this.createLabel = (this.create && this.searchString.length >= this.minimumInputLength) ? `Create "${this.control.value}"` : undefined;

    return (
      <Host>
        <slot />

        <div class="cbp-dropdown-shrinkwrap">
       
          <slot name="cbp-dropdown-attached-button-start" />

          { this.filter ?
            <div class="cbp-combobox-wrapper" onClick={e => this.handleDropdownClick(e)}>
              <input
                type="text"
                class="cbp-custom-form-control"
                id={this.fieldId}
                placeholder={!this.multiple ? this.placeholder : undefined}
                role="combobox"
                aria-controls={`${this.fieldId}-menu`}
                aria-expanded={`${this.open}`}
                aria-haspopup="listbox"
                aria-invalid={this.error ? 'true' : false}
                disabled={this.disabled || this.readonly} 
                autocomplete="off"
                onKeyDown={e => this.getActionFromKey(e)}
                onInput={e => this.handleComboBoxInput(e)}
                ref={el => (this.control = el!)}
              />
              { this.multiple && (
                <div class="cbp-dropdown-placeholder">
                  <span
                    role="button"
                    tabindex={0}
                    class="cbp-dropdown-multiselect-counter"
                    title={`Click to clear selections`}
                    onClick={e => this.handleCounterClick(e)}
                    onKeyDown={e => this.handleCounterKeydown(e)}
                    ref={el => (this.counterControl = el!)}
                  >
                    {this.selectedItemCount}
                    <cbp-icon 
                      name="circle-xmark" 
                      size="var(--cbp-space-3x)" 
                      sx={{ 'margin-inline-start': 'var(--cbp-space-2x)' }} 
                    />
                  </span>
                  {!this.searchString ? this.placeholder : ''}
                </div>
              )}
            </div>

          :
            <button
              type="button"
              class="cbp-custom-form-control"
              id={this.fieldId}
              role="combobox"
              aria-controls={`${this.fieldId}-menu`}
              aria-expanded={`${this.open}`}
              aria-haspopup="listbox"
              aria-invalid={this.error ? 'true' : false}
              disabled={this.disabled || this.readonly} 
              onClick={e => this.handleDropdownClick(e)}
              onKeyDown={e => this.getActionFromKey(e)}
              ref={el => (this.control = el!)}
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
                      ref={el => (this.counterControl = el!)}
                    >
                      {this.selectedItemCount}
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
          }

          <slot name="cbp-dropdown-attached-button-end" />

          <input
            type="hidden"
            id={`${this.fieldId}-field`}
            name={`${this.name}`}
            value={ this.value != undefined ? `${this.value}` : ''}
            disabled={this.disabled}
            ref={el => (this.formField = el!)}
          />

          <div
            role="listbox"
            class="cbp-dropdown-menu"
            tabIndex={-1}
            id={`${this.fieldId}-menu`}
            ref={el => (this.listbox = el!)}
          >
            <cbp-dropdown-item 
              value=""
              key="cbp-dropdown-item-no-results" 
              class="cbp-dropdown-item-no-results"
              disabled
              // hidden if none of the grouped conditions are met
              hidden={ !(
                (this.dropdownItems?.length == 0 && this.matches?.length == 0 && !this.items) ||
                (!this.create && (this.async || !!this.searchString) && this.matches?.length == 0) ||
                (this.create && this.dropdownItems?.length == 0 && this.matches?.length == 0 && this.searchString?.length < this.minimumInputLength)
              )}
            >
              {this.async && this.searchString?.length < this.minimumInputLength
                ? `Enter ${this.minimumInputLength} characters to search.`
                : `No ${this.filter && this.searchString?.length >0 ? 'matches' : 'items'} found.`
              }
            </cbp-dropdown-item>

            { !!this.items 
              ? [...this.generatedItems]
              : <slot name="cbp-dropdown-items" onSlotchange ={ (e) => this.handleSlotChange(e)} />
            }

            { ( this.create && 
                this.filter && 
                this.searchString.length >= this.minimumInputLength &&
                !this.checkExactMatch()
              ) &&
              <cbp-dropdown-item 
                value={`${this.searchString}`}
                class="cbp-dropdown-create-item"
                key="cbp-dropdown-create-item" 
                selected={false}
                ref={el => this.createOption = el!}
              >
                {this.createLabel}
              </cbp-dropdown-item>
            }

          </div>
        </div>
      </Host>
    );
  }
}
