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
  @Prop({ reflect: true }) selectable: boolean;

  /**
   * unique identifier to prefix the treeview-item control name
   */
  @Prop() name: string

  /**
   * Label to be displayed in the control of the treeview.
   */
  @Prop({ reflect: true}) accessibilityText: string;

  /**
   * text to be rendered as UID for the component
   */
  @Prop() uid: string

  /** Array of selected treeviewItems inside of the treeview*/
  private selectedChildren = [] as HTMLCbpTreeviewItemElement[];

  @Event() treeviewSubmit: EventEmitter;

  @Listen('updatedState')
  handleUpdatedState(e){
    let combined = [...this.selectedChildren, ...e.detail.selected];
    this.selectedChildren = combined.filter((item, index) => {
      return combined.indexOf(item) === index;
    });
  
    this.treeviewSubmit.emit({
      host: this.host,
      selected: this.selectedChildren,
      nativeEvent: e
    })
  }


  render() {
    return (
      <Host
        role="tree"
        aria-label={this.accessibilityText}
        uid={this.uid}
      >
        <slot></slot>
      </Host>
    );
  }

}
