import { Component, Element, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-menu-item',
  styleUrl: 'cbp-menu-item.scss'
})
export class CbpMenuItem {

  private menuitem: HTMLElement;
  @Element() host: HTMLElement;

  @Prop( {reflect: true} ) color: "danger";


  constructor() {
    this.host.slot="cbp-menu-items"; // auto-slot the menu items
  }

  componentWillLoad() {
    this.menuitem = this.host.querySelector('a,button');
    if (this.menuitem) {
      this.menuitem.setAttribute('role','menuitem');
    }
  }

  render() {
    return (
      <Host
        color={this.color}
      >
        <slot />
      </Host>
    );
  }

}
