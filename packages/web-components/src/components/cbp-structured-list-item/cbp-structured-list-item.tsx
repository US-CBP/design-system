import { Component, Prop, Element, Host, h, Listen } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-structured-list-item',
  styleUrl: 'cbp-structured-list-item.scss',
})

export class CbpStructuredListItem {

  @Element() host: HTMLElement;

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
  stateChangedHandler(){
    console.log('state toggle for structured list item selected');
    this.selected = !this.selected;
  }

  render() {
    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
