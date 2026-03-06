import { Component, Element, Prop, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps, clickAwayListener, createNamespaceKey, createValidId } from '../../utils/utils';

/**
 * A Listbox wraps a standard text or search input, enhancing it by providing suggestions in a format visually similar to a dropdown, from which a selection may optionally be made.
 * 
 * @slot - A native text or search input (or optionally `cbp-form-field-wrapper as well) should be slotted in the default slot.
 */
@Component({
  tag: 'cbp-listbox',
  styleUrl: 'cbp-listbox.scss'
})
export class CbpListbox {

  private formField: HTMLInputElement; // the hidden input that stores the dropdown value for form posts
  private autocomplete: string;
  private value: string =''; // track the value of the wrapped input as a sort of internal state
  private listbox: HTMLElement;
  private listboxItems: HTMLLIElement[] = [];
  private generatedItems: HTMLLIElement[] = []; // JSX nodes do not allow DOM manipulation
  private focusIndex: number = -1;

  @Element() private host: HTMLCbpDropdownElement;

  /** 
   * Optionally specify the ID of the listbox element (role=listbox), which is used to generate related 
   * pattern node IDs and associate it to the wrapped input for accessibility. 
   */
  @Prop() uid: string = createNamespaceKey('cbp-listbox');

  /** Specifies whether the listbox is open/visible. */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /** 
   * A JSON object (or stringified JSON) containing an array of labels. Labels may contain markup as needed but 
   * only the text can be populated into the native input upon selection.
   * The expected format is [{"label":"string"}, ...]
   */
  @Prop({mutable: true}) items: string | object;

  /** 
   * Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled.
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles (to the host) as an object. This property is not reactive. */
  @Prop() sx: any = {};


  /** 
   * A custom event emitted when the value of the wrapped input changes to update the listbox suggestions (items) 
   * via application logic. 
   */
  @Event() updateListboxSuggestions: EventEmitter;

  /** 
   * A custom event emitted only when a selection is made in the listbox.
   * This event will be listened for in addition to the native input's change event by the parent `cbp-form-field`, 
   * as selection does not trigger a native change event on the input.
   * To get all changes to the wrapped input, listen to the `valueChange` event on the parent `cbp-form-field`.
   */
  @Event() valueChange: EventEmitter;


  @Watch('open')
  watchOpen(newValue) {
    // If the menu was opened, give it time to render and set focus to the selected/first item
    if (newValue) {
      this.showListbox();

      // Set up a clickaway listener to close the menu
      clickAwayListener(this.host, _ => {
        this.open = false;
      });
    }

    // If the dropdown was closed, clear any filters and reset the "current" status of dropdown items.
    else {
      this.closeListbox();
    }
  }

  @Watch('items')
  watchItems(newValue) {
    let items = this.getItems(newValue);
    this.generatedItems = this.generateItems(items);
    this.focusIndex=-1; // reset this any time the list is updated, which occurs based on user input
    
    if(items.length) this.showListbox();
    else this.closeListbox();
    //this.items = items;
  }

  private getItems(items) {
    // Parse stringified JSON into an object for easier manipulation
    if (typeof items == 'string') {
      //items = JSON.parse(items) || {};
      items = !items ? [] : JSON.parse(items) || [];
    }
    return items;
  }

  private showListbox() {
    if( !this.formField?.hasAttribute('readonly') && !this.formField?.hasAttribute('disabled') ) {
      this.open=true;
      this.formField?.setAttribute('autocomplete',"off");
      this.formField?.setAttribute('aria-expanded',"true");
    }
  }

  private closeListbox() {
    this.open=false;
    this.formField?.removeAttribute('aria-activedescendant'); // selection/focus is not persisted like a dropdown
    this.formField?.setAttribute('aria-expanded',"false");
    this.autocomplete ? this.formField?.setAttribute('autocomplete',this.autocomplete) : this.formField?.removeAttribute('autocomplete');
    this.focusIndex=-1;
  }

  private handleFocus() {
    if(this.listboxItems.length) this.showListbox();
    else this.closeListbox();
  }

  // Verified to handle paste, delete, delete selection, and selecting from an autocomplete popover
  private handleInput(e) {
    // Only emit the custom event to update the list if the value has changed
    if (this.value != this.formField?.value) {
      this.value = this.formField?.value;

      // Emit the custom event to update suggestions (further actions are invoked when the items prop is updated)
      this.updateListboxSuggestions.emit({
        host: this.host,
        nativeElement: this.formField,
        value: this.formField?.value,
        nativeEvent: e,
      });
    }
  }

  private handleListboxClick(e) {
    const {target} = e;
    const listItem = target?.closest('[role=listbox] li');

    // When a selection is made, populate it as the text field's value, clear, and close the listbox
    if (listItem) {
      this.formField.value = listItem.innerText;
      this.formField.focus();
      this.open = false;
      // Clear the list if a selection was made
      this.items='';
      this.listboxItems=[];

      // Emit the custom event here; Trying to handle this as input causes the listbox to reopen after a selection, giving poor feedback
      this.valueChange.emit({
        host: this.host,
        nativeElement: this.formField,
        value: this.formField.value,
        nativeEvent: e
      });
    }
  }

  // handle keyboard navigation
  getActionFromKey(event) {
    const { key } = event;
    const selectKeys = ['Enter', ' '];
    const navKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End']; // all keys that will do the default open action

    // If the menu is already open, pressing enter or space triggers a click on the current item -
    // with an exception for pressing space as part of a combobox searchString (not the first character).
    // Run this first, before the menu may be opened by later code.
    if (this.open && selectKeys.includes(key)) {
      event.preventDefault();
      this.listboxItems[this.focusIndex]?.click();
      return;
    }

    // Navigation within an open menu
    if (this.open) {
      const i = this.focusIndex; // index
      const l = this.listboxItems?.length - 1 || 0; // length
      const n = {
        Home: 0,
        ArrowUp: -1 < i + -1 ? i + -1 : l,
        ArrowDown: l + 1 > i + 1 ? i + 1 : 0,
        End: l,
      }[key]; //navigation key pressed

      // If it was a navigation key
      if (n !== undefined && key !== 'Tab') {
        this.setCurrent( n, this.focusIndex);
      }
      // Prevent listbox navigation keys from doing things in the input while open, as this may be confusing
      if (navKeys.includes(key)) {
        event.preventDefault();
      }
    }

    // Close the menu when pressing ESC anywhere in the component and send focus back to the control
    if (key == 'Escape') {
      this.closeListbox();
    }
    // Close the menu when pressing TAB anywhere in the component
    if (key == 'Tab') {
      this.closeListbox();
    }
  }

  setCurrent(newValue=0, oldValue=undefined) {
    // Unset the old item, if any
    if (oldValue != undefined && oldValue != newValue && this.listboxItems[oldValue]) {
      this.listboxItems?.[oldValue]?.classList.remove('cbp-listbox-current');
    }

    // Mark the current item and associate it with the control via aria-activedescendant
    if (this.generatedItems[newValue]) {
      this.listboxItems?.[newValue]?.classList.add('cbp-listbox-current');
      this.formField?.setAttribute('aria-activedescendant', this.listboxItems?.[newValue]?.id)
      this.focusIndex = newValue;
      
      // ensure the new option is in view
      setTimeout( () => {
        if (this.isScrollable(this.listbox))
          this.maintainScrollVisibility(this.listboxItems[newValue], this.listbox);
      }, 10);
    }
    else {
      console.log(`cbp-listbox debugging - attempting to setCurrent, but ${newValue} does not exist as an index in this.listboxItems.`, newValue, oldValue, this.listboxItems);
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



  private generateItems(items) {
    // Parse stringified JSON into an object for easier manipulation
    items = this.getItems(items);

    // clear the dropdownItems array
    let generatedItems: HTMLLIElement[] = [];

    // re-populate it from items prop (JSON) 
    if(items.length) {
      items.map( ( { label } ) => {
      let newItem: HTMLLIElement =  
        <li 
          id={createValidId(`cbp-listbox-item-${label}`)}
          key={createValidId(`cbp-listbox-item-${label}`)}
        >
          <div class="cbp-listbox-item-content">
            {label}
          </div>
        </li>;
        generatedItems = [...generatedItems, newItem];
      });
    }
    return generatedItems;
  }





  componentWillLoad() {
    // Generate the items from the property before rendering, if provided. (also done in the @watch if changed)
    if(!!this.items) {
      this.generatedItems = this.generateItems(this.items);
    }

    // Get a reference to the slotted native input (text or search)
    this.formField=this.host.querySelector('input');
    // save the default autocomplete attribute if set so it can be reverted properly
    this.autocomplete=this.formField?.getAttribute('autocomplete');

    // Update attributes directly on the input to make it an accessible combobox
    this.formField?.setAttribute('role','combobox');
    this.formField?.setAttribute('aria-controls', this.uid);
    this.formField?.setAttribute('aria-haspopup','listbox');
    this.formField?.setAttribute('aria-expanded', `${this.open}`);
    // aria-activedescendant is handled by setCurrent()

    // Set up a focus listener for showing a default listbox
    this.formField.addEventListener( 'focus', () => {
      this.handleFocus();
    });
    // Set up an input listener to emit events for filtering
    this.formField.addEventListener( 'input', (e) => {
      this.handleInput(e);
    });

    // Apply sx
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidRender() {
    this.listboxItems = Array.from(this.listbox.querySelectorAll('li'));
    // The "current" class is added via DOM manipulation, so it can safely be removed after a re-render, which is caused by a change in open or items
    this.listboxItems.forEach( item => {
      item.classList.remove('cbp-listbox-current');
    })
  }

  render() {
    return (
      <Host onKeyDown={e => this.getActionFromKey(e)}>
        <slot />

        <ul
          id={this.uid}
          role="listbox"
          hidden={!this.open}
          tabindex={-1}
          ref={ (el) => this.listbox = el}
          onClick={(e) => this.handleListboxClick(e)}
        >
          {[...this.generatedItems]}
        </ul>
      </Host>
    );
  }
}