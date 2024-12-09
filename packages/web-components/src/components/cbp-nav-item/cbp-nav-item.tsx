import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';
@Component({
  tag: 'cbp-nav-item',
  styleUrl: 'cbp-nav-item.scss',
})

export class CbpNavItem {

  @Element() host: HTMLElement;

  /** Specifies whether this is the selected nav-item. Only one item per set should be marked as selected.*/
  @Prop({ reflect: true }) selected: boolean;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};
  
  @Event() navClicked: EventEmitter;
  handleNavClick() {
    this.selected=true;
    this.navClicked.emit({
      host: this.host,
    })
  }

  componentWillLoad() {
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
      onClick={() => this.handleNavClick()}
    >
      <slot></slot>
    </Host>
    );  
  }
}
