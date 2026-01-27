import { Component, Prop, Element, Host, h, Listen } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Structured List Item component may optionally be used to hold each list item's content. This component 
 * is needed primarily when designating an item with the "danger" color or when list items are selectable.
 * 
 * @slot - The list item content is placed in the default slot. Content may be wrapped in a CSS grid (e.g., `cbp-grid`) to give each list item consistent structure and sizing.
 */
@Component({
  tag: 'cbp-structured-list-item',
})

export class CbpStructuredListItem {

  @Element() private host: HTMLElement;

  /** Optionally specifies a color variant based on design tokens. */
  @Prop({ reflect: true }) color: 'danger';
  
  /** Specifies whether the item is selected. */
  @Prop({ reflect: true }) selected: boolean;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  @Listen('stateChanged')
  stateChangedHandler({detail: {checked}}){
    this.selected = checked;
  }

  render() {
    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
