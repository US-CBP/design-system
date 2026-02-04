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

  @Event() updateTreeviewItemParent: EventEmitter;

  private immediateChildren: HTMLCbpTreeviewItemElement[] = []
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

    this.updateTreeviewItemParent.emit({
      host: this.host,
      parent: this.parent,
    })
  }

  @Listen('updateTreeviewItemParent')
  handleUpdateTreeviewItemParent(e) {
    if (this.host == e.detail.parent) {
      setTimeout(() => { 
        let selectedChildren = this.host.querySelectorAll("cbp-treeview-item[checked]").length;
        if (this.allChildren.length == selectedChildren) {
          this.checked = true;
          this.indeterminate = false;
        } else if (selectedChildren == 0) {
          this.checked = false;
          this.indeterminate = false;
        } else {
          this.checked = false;
          this.indeterminate = true;
        }

        this.updateTreeviewItemParent.emit({
          host: this.host,
          parent: this.parent,
        })
      }, (50));
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
    this.immediateChildren = Array.from(this.host.querySelectorAll(':scope > cbp-treeview-item'));
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
          {this.immediateChildren.length > 0 &&
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
            {this.immediateChildren.length > 0 && `(${this.immediateChildren.length})`}
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
