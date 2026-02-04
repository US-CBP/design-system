import { Component, Element, Event, EventEmitter, Host, h, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'cbp-treeview',
  styleUrl: 'cbp-treeview.scss',
})

/**
 * Treeview is used to display nested items in a parent/child relationship with the option of selecting or interacting with items 
 * 
 * @slot - Used to populate the children of treeview
 */

export class CbpTreeview {

  @Element() host: HTMLCbpTreeviewElement;

  /**
   * determines if the control renders with a checkbox as part of the treeview-item control
   */
  @Prop() selectable: boolean;

  /**
   * identifier to prefix the treeview-item control name
   */
  @Prop() name: string

  /**
   * Label to be displayed in the control of the treeview.
   */
  @Prop() accessibilityText: string;

  /** Array of key/value pairs representing selected treeviewItems inside of the treeview*/
  private selectedChildren= []

  @Event() treeviewSubmit: EventEmitter;

  @Listen('updatedTreeviewSelected')
  handleUpdatedTreeviewSelected(e) {
    this.selectedChildren = [];
    e.detail.selected.forEach((item) => {
      this.selectedChildren.push([item.name, item.value])
    })

    this.treeviewSubmit.emit({
      host: this.host,
      selected: this.selectedChildren,
      nativeEvent: e
    })

  }

  componentWillLoad(){
    let children = Array.from(this.host.querySelectorAll('cbp-treeview-item')) as HTMLCbpTreeviewItemElement[];
    children.forEach((item) => { 
      item.name = this.name
      item.selectable = this.selectable
    })
  }

  render() {
    return (
      <Host
        role="tree"
        aria-label={this.accessibilityText}
        aria-multiselectable={this.selectable ? "true" : "false"}
      >
        <slot></slot>
      </Host>
    );
  }

}
