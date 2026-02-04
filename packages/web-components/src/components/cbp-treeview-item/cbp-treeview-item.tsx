import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop } from '@stencil/core';
import { createNamespaceKey } from '../../utils/utils';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

/**
 * Treeview Items are used to display a single parent or selection for the cbp-treeview component
 * 
 * @slot - Used to populate the children of treeview item
 */

export class CbpTreeviewItem {
  @Element() host: HTMLCbpTreeviewItemElement;

  /**
   * Label to be displayed in the control of the treeview item.
   */
  @Prop() label: string;

  /**
   * determines if the component is in an open or expanded state
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /**
   * determines if the control renders with a checkbox as part of the treeview-item control
   */
  @Prop({ reflect: true }) selectable: boolean;

  /**
   * used to determing if the treeviewItem is in a checked state
   */
  @Prop({ reflect: true, mutable: true }) checked: boolean;

  /**
   * used to determing if the treeviewItem is in an indeterminate state
   */
  @Prop({ reflect: true, mutable: true }) indeterminate: boolean;

  /**
   * name to be passed to the rendered checkbox prop
   */
  @Prop({ mutable: true }) name: string;

  /** 
   * Specifies a unique `ID` for the dialog, used to wire up the controls and accessibility features. 
   */
  @Prop({ mutable: true }) uid: string = createNamespaceKey('cbp-treeview-item');

  /**
   * Sets the value for the checkbox rendered in treeviewItem
   */
  @Prop() value: string;

  @Event() updateParent: EventEmitter;
  @Event() updatedTreeviewSelected: EventEmitter; //TODO: might need a different name


  private children: HTMLCbpTreeviewItemElement[] = []
  private allChildren: HTMLCbpTreeviewItemElement[] = [];

  private parent: HTMLCbpTreeviewItemElement;

  private checkbox !: HTMLCbpCheckboxElement

  @Listen('stateChanged')
  handleCheck(e = undefined) {
    e?.stopPropagation();

    let checkbox = e?.target || this.checkbox;

    this.checked = checkbox.checked;

    this.allChildren.forEach(item => {
      item.indeterminate = false;
      item.checked = checkbox.checked;
    })

    this.updateParent.emit({
      host: this.host,
      parent: this.parent,
      checked: checkbox.checked
    })
  }

  @Listen('updateParent')
  handleUpdateParent(e) {
    if (e.detail.parent == null) {
      e?.stopPropagation();

      let selected = [];
      for (let i = 0; i < this.allChildren.length; i++) {
        if (this.allChildren[i].checked) {
          selected.push(this.allChildren[i])
        }
      }

      this.updatedTreeviewSelected.emit({
        host: this.host,
        selected: selected
      })
    }
    if (this.host == e.detail.parent) {
      let selectedChildren = 0;
      let indeterimateChild = false;

      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].checked) {
          selectedChildren = selectedChildren + 1;
        } else if (this.children[i].indeterminate) {
          indeterimateChild = true;
        }
      }

      if (this.allChildren.length == selectedChildren) {
        this.host.checked = true;
        this.host.indeterminate = false;
      } else if (selectedChildren == 0 && !indeterimateChild) { 
        this.host.checked = false;
        this.host.indeterminate = false;
      } else {
        this.host.checked = false;
        this.host.indeterminate = true;
      }

      this.updateParent.emit({
        host: this.host,
        parent: this.parent,
        checked: this.host.querySelector('cbp-checkbox')
      })
    }
  }

  toggleOpen() {
    this.open === false ? this.open = true : this.open = false;
  }

  componentDidLoad() {
    if (this.checked) {
      this.handleCheck()
    }
  }

  componentWillLoad() {
    this.parent = this.host.parentElement.closest("cbp-treeview-item");
    this.children = Array.from(this.host.querySelectorAll(':scope > cbp-treeview-item'));
    this.allChildren = Array.from(this.host.querySelectorAll('cbp-treeview-item'));
  }

  render() {

    return (
      <Host
        role="treeitem"
        id={this.uid}
        aria-selected={this.checked}
      >
        <span class="cbp-treeview-control">
          {this.children.length > 0 &&
            <cbp-button
              color="secondary"
              fill="ghost"
              class="cbp-treeview-toggle"
              onClick={() => { this.toggleOpen() }}
              expanded={this.open ? 'true' : 'false'}
              aria-labelledby={`${this.uid}-checkbox`}
            >
              <cbp-icon name="caret-down"></cbp-icon>
            </cbp-button>
          }
          <cbp-checkbox
            ref={(el) => this.checkbox = el as HTMLCbpCheckboxElement}
            checked={this.checked}
            indeterminate={this.indeterminate}
            name={this.name}
            value={this.value}
            id={`${this.uid}-checkbox`}
          >
            <input
              type="checkbox"
              value={this.value}
            />
            {this.label}
            {this.children.length > 0 && `(${this.children.length})`}
          </cbp-checkbox>

        </span>
        <div
          class="cbp-treeview-item-content"
          role="group"
        >
          <slot></slot>
        </div>
      </Host>
    );
  }

}
