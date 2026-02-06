import { Component, Prop, Element, Listen, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';
@Component({
  tag: 'cbp-treeview',
  styleUrl: 'cbp-treeview.scss',
})

/**
 * The Treeview component is used to display nested items in a parent/child relationship with the option of selecting or interacting with items.
 * 
 * @slot - All child treeview items are placed in the default slot.
 */

export class CbpTreeview {

  @Element() host: HTMLCbpTreeviewElement;

  /** Specifies that the entire tree is selectable. Setting this property at this level overrides all child treeview items. */
  @Prop() selectable: boolean;

  /** Specifies the name for all checkboxes in selectable treeviews, similar to a checklist. */
  @Prop() name: string

  /** Creates an accessible label for the treeview control if one has not been associated via `aria-labelledby`. */
  @Prop() accessibilityText: string;

  /** 
   * Specifies the context of the component (and its child items) as it applies to the visual design and whether it 
   * inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /**
   * A custom event that rolls up all selected values and is emitted when any selectable item is changed. 
   * Only selectable items that have both a name and value specified will be included.
   * If all items/checkboxes have the same name, specified by the `cbp-treeview`, then the values are returned as a simple array.
   * If items/checkboxes have individually specified names, values are returned as an array of objects containing name-value pairs.
   */
  @Event() valueChange: EventEmitter;


  @Listen('updateTreeviewItemParent')
  handleUpdateTreeviewItemParent(e) {
    //console.log(`Treeview received updateTreeviewItemParent event`, e.target, e);
    let values = [];
    const selectedItems = Array.from(this.host.querySelectorAll("cbp-treeview-item[checked]")) as HTMLCbpTreeviewItemElement[];

    // If a name is specified at this level, then roll the values into a simple array
    if(this.name != undefined) {
      selectedItems.forEach((item) => {
        if (item.value != undefined ) values = [...values, item.value ];
      });
    }
    // Roll up all selected name/value pairs only when both a name and value exist
    else {
      selectedItems.forEach((item) => {
        const {name, value } = item;
        if (name != undefined && value != undefined) {
          let itemValue = new Object; //{ name : value};
          itemValue[name] = value;
          values = [...values, itemValue ];
        }
      });
    }

    // Emit a rollup of all selected values as an array if same-named or name-value pairs.
    this.valueChange.emit({
      host: this.host,
      name: this.name,
      values: values,
      nativeEvent: e
    })
  }

  componentWillLoad() {
    const children = Array.from(this.host.querySelectorAll('cbp-treeview-item')) as HTMLCbpTreeviewItemElement[];
    
    // Push down high-level props to all children, if specified
    children.forEach((item) => {
      if(this.name != undefined) item.name = this.name;
      if(this.selectable) item.selectable = this.selectable;
      item.context = this.context;
    });

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {
    return (
      <Host
        role="tree"
        aria-label={this.accessibilityText}
        aria-multiselectable={this.selectable ? "true" : "false"}
      >
        <slot />
      </Host>
    );
  }

}
