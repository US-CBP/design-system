import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, Watch } from '@stencil/core';
import { createNamespaceKey } from '../../utils/utils';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

/**
 * The treeview items component represents a single node in the tree view. Treeview Items may be nested to create a hierarchy.
 * 
 * @slot - Nested child treeview items are placed in the default slot.
 * @slot cbp-tree-item-buttons - Optionally slot action buttons related to this treeview item in this named slot.
 */
export class CbpTreeviewItem {

  private parent: HTMLCbpTreeviewItemElement;
  private immediateChildren: HTMLCbpTreeviewItemElement[] = [];
  private allChildren: HTMLCbpTreeviewItemElement[] = [];
  private checkbox !: HTMLCbpCheckboxElement; 

  @Element() host: HTMLCbpTreeviewItemElement;


  /** Specifies the label to be displayed in the treeview item control. For selectable items, this becomes the checkbox label. */
  @Prop() label: string;

  /** Specifies whether the item, if a parent to nested items, is open/expanded. */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /** 
   * Specifies whether this item is selectable, and if so renders a checkbox within the item.
   * This property can be set on the parent `cbp-treeview` component to be applied to all treeview items.
   */
  @Prop({ reflect: true }) selectable: boolean;

    /** Specifies a name for a selectable item's checkbox. */
  @Prop({ mutable: true }) name: string;

  /** Specifies the value for a selectable item's checkbox and to pass in the `cbp-treeview`'s custom event emitter. */
  @Prop() value: string;

  /** Specifies whether a selectable item (and its rendered checkbox) is in a checked state. */
  @Prop({ reflect: true, mutable: true }) checked: boolean;

  /** Specifies whether a selectable item (and its rendered checkbox) is in an indeterminate state. This logic is handled internally and should not need to be set manually. */
  @Prop({ reflect: true, mutable: true }) indeterminate: boolean;

  /** 
   * Specifies a unique `id` for the treeview item, used to wire up the controls and accessibility features. 
   * This property is not required and will auto-generate an `id` if none is specified.
   */
  @Prop({ mutable: true }) uid: string = createNamespaceKey('cbp-treeview-item');


  /** 
   * Specifies the context of the component as it applies to the visual design and whether it 
   * inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. 
   * This property is passed down from the parent `cbp-treeview` and does not need to be set at this level.
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Custom event emitted to the parent treeview item to re-evaluate its checked/indeterminate state based on actions below it. */
  @Event() updateTreeviewItemParent: EventEmitter;

  // listen to the checkbox's stateChange event emitter to update this treeview item (and its children).
  @Listen('stateChanged')
  handleCheck(e = undefined) {
    e?.stopPropagation();

    let checkbox = e?.target || this.checkbox;
    this.checked = checkbox.checked;
    this.indeterminate = false; // if user interaction set the checkbox as checked/unchecked, then it's not indeterminate

    this.allChildren.forEach(item => {
      item.indeterminate = false;
      item.checked = checkbox.checked;
    });

    // Emit an event up to the next parent to evaluate its checked/indeterminate state.
    this.updateTreeviewItemParent.emit({
      host: this.host,
      parent: this.parent,
    });
  }

  // listen to child item's event emitter to evaluate the checked/indeterminate state of this parent item.
  @Listen('updateTreeviewItemParent')
  handleUpdateTreeviewItemParent(e) {
    // Only the immediate parent should take action on this event.
    if(this.host === e.detail.parent) {
      //console.log(`${this.label} received updateTreeviewItemParent event`, this.host, e);
      e?.stopPropagation();

      // A small timeout is necessary to allow children to re-render before querying their attributes
      setTimeout(() => { 
        let selectedChildren = Array.from(this.host.querySelectorAll("cbp-treeview-item[checked]"));
        // if all children are checked, then this parent should be checked.
        if (this.allChildren.length == selectedChildren.length) {
          this.checked = true;
          this.indeterminate = false;
        }
        // if no children are checked, then this parent should be unchecked.
        else if (selectedChildren.length == 0) {
          this.checked = false;
          this.indeterminate = false;
        }
        // if some (but not all) children are checked, then this parent is indeterminate (and checked=false).
        else {
          this.checked = false;
          this.indeterminate = true;
        }

        // Emit the event up to the next parent
        this.updateTreeviewItemParent.emit({
          host: this.host,
          parent: this.parent,
        })
      }, 50);
    }
  }


  @Watch('checked')
  watchChecked(newValue: boolean){
    if (this.checkbox) this.checkbox.checked=newValue;
  }

  toggleOpen() {
    this.open === false ? this.open = true : this.open = false;
  }

  componentWillLoad() {
    this.parent = this.host.parentElement.closest("cbp-treeview-item");
    this.immediateChildren = Array.from(this.host.querySelectorAll(':scope > cbp-treeview-item'));
    this.allChildren = Array.from(this.host.querySelectorAll('cbp-treeview-item'));
  }

  componentDidLoad() {
    if (this.checked && this.selectable) {
      this.handleCheck()
    }
  }

  render() {
    // console.log('allchildren: ', this.host, this.allChildren)
    return (
      <Host
        role="treeitem"
        id={this.uid}
        aria-selected={ this.selectable ? `${this.checked}` : false}
        aria-owns={`${this.uid}-group`}
        tabIndex= '-1'
      >
        <div class="cbp-treeview-item-control">
          { this.immediateChildren.length > 0 &&
            <cbp-button
              color="secondary"
              fill="ghost"
              class="cbp-treeview-item-toggle"
              expanded={`${this.open}`}
              aria-labelledby={`${this.uid}-label`}
              context={this.context}
              onClick={() => { this.toggleOpen() }}
            >
              <cbp-icon name="caret-down"></cbp-icon>
            </cbp-button>
          }
          { this.selectable ?
            <cbp-checkbox
              name={this.name}
              value={this.value}
              id={`${this.uid}-label`}
              checked={this.checked}
              indeterminate={this.checked ? false : this.indeterminate}
              context={this.context}
              ref={(el) => this.checkbox = el as HTMLCbpCheckboxElement}
            >
              <input
                type="checkbox"
                value={this.value}
              />
              {this.label}
              {this.immediateChildren.length > 0 && ` (${this.immediateChildren.length})`}
            </cbp-checkbox>
            : 
            <div id={`${this.uid}-label`}>
              {this.label}
              {this.immediateChildren.length > 0 && ` (${this.immediateChildren.length})`}
            </div>
          }
          <slot name="cbp-treeview-item-buttons" />
        </div>
        <div 
          role="group" 
          class="cbp-treeview-item-children"
          id={`${this.uid}-group`}
        >
          <slot />
        </div>
      </Host>
    );
  }

}
