import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-nav-item',
  styleUrl: 'cbp-nav-item.scss',
})

export class CbpNavItem {

  @Element() host: HTMLCbpNavItemElement;

  /** Specifies whether this is the selected nav-item. Only one item per set should be marked as selected.*/
  @Prop({ reflect: true }) selected: boolean;

  /** Specifies a name used to associated nav items with subnav items*/
  @Prop({ reflect: true }) name: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};
  
  //techdebt: event logic only works for links
  @Event() navClicked: EventEmitter;
  handleNavClick() {
    state.activeItemName = this.name;
    state.currentParent = this.name;
    if(this.host.querySelector('a')){
      this.selected = true;
      state.currentPage = this.name;
    }
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
