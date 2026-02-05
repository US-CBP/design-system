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

  /** A custom event that rolls up all selected values and is emitted when any selectable item is changed. */
  @Event() valueChange: EventEmitter;


  @Listen('updateTreeviewItemParent')
  handleUpdateTreeviewItemParent(e) {
    if (e.detail.parent == null) {
      let values = [];
      const selectedItems = Array.from(this.host.querySelectorAll("cbp-treeview-item[checked]")) as HTMLCbpTreeviewItemElement[];

      // Roll up all selected name/value pairs only when both a name and value exist
      selectedItems.forEach((item) => {
        const {name, value } = item;
        if (!!name && !!value ) {
          let itemValue = new Object; //{ name : value};
          itemValue[name] = value;
          values = [...values, itemValue ];
        }
      })

      this.valueChange.emit({
        host: this.host,
        values: values,
        nativeEvent: e
      })
    }
  }

  componentWillLoad() {
    const children = Array.from(this.host.querySelectorAll('cbp-treeview-item')) as HTMLCbpTreeviewItemElement[];
    children.forEach((item) => {
      if(this.name) item.name = this.name;
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
