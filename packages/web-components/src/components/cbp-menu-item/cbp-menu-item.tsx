import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Menu Item component wraps each individual control (link or button) within the menu.
 * 
 * @slot - Any form of control may be slotted in the default slot (a link, button, link component, button component, component-based Router, etc.). But any components should render a semantic anchor or button element.
 */
@Component({
  tag: 'cbp-menu-item',
  styleUrl: 'cbp-menu-item.scss'
})
export class CbpMenuItem {

  private menuItem: HTMLElement;

  @Element() host: HTMLElement;

  /** Specifies an indent level to represent hierarchical items. Defaults to zero. */
  @Prop( {reflect: true} ) indentLevel: number = 0;

  /** Specifies a color variant for the menu item. Currently the only supported variant is "danger". */
  @Prop( {reflect: true} ) color: "danger";


  constructor() {
    this.host.slot="cbp-menu-items"; // auto-slot the menu items
  }

  componentWillLoad() {
    setCSSProps(this.host, {
      "--cpb-menu-item-indent": this.indentLevel > 0 ? `var(--cbp-space-${this.indentLevel * 2}x)` : "0px"
    });
  }

  componentDidLoad() {
    this.menuItem = this.host.querySelector('a,button');
    this.menuItem?.setAttribute('role','menuitem');
    this.menuItem?.setAttribute('tabindex', '-1');
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

}
