import { Component, Element, Prop, Event, EventEmitter, Host, h } from '@stencil/core';
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

  private menuItem: HTMLAnchorElement | HTMLButtonElement;

  @Element() private host: HTMLElement;

  /** Specifies an indent level to represent hierarchical items. Defaults to zero. */
  @Prop( {reflect: true} ) indentLevel: number = 0;

  /** Specifies a color variant for the menu item. Currently the only supported variant is "danger". */
  @Prop( {reflect: true} ) color: "danger";


  constructor() {
    this.host.slot="cbp-menu-items"; // auto-slot the menu items
  }

  /** 
   * A custom event emitted when a menu item is clicked/activated.
   */
  @Event() menuItemClick: EventEmitter;
  handleClick(e) {
    const { target } = e;
    const label = this.menuItem.innerText;
  
    this.menuItemClick.emit({
      host: this.host,
      nativeElement: this.menuItem,
      nativeEvent: e,
      target: target,
      label: label,
      value: this.menuItem.getAttribute('value'),
    });
  }

  // Normalize link/button behavior as menu items and prevent space from scrolling the page
  private handleKeyPress(e){
    const { key } = e;
    const activationKeys=['Enter',' '];
    // For space/enter, manually trigger the click event.
    if(activationKeys.includes(key)) {
      e.preventDefault();
      this.menuItem.click();
    }
  }

  componentWillLoad() {
    setCSSProps(this.host, {
      "--cpb-menu-item-indent": this.indentLevel > 0 ? `var(--cbp-space-${this.indentLevel * 2}x)` : "0px"
    });
  }

  componentDidLoad() {
    // The interactive element acts as the actual menu item
    this.menuItem = this.host.querySelector('a,button');
    this.menuItem?.setAttribute('role','menuitem');
    this.menuItem?.setAttribute('tabindex', '-1');
    // Handle keydown and clicks on the slotted menu controls
    this.menuItem?.addEventListener('keydown', e => this.handleKeyPress(e));
    this.menuItem?.addEventListener('click', e => this.handleClick(e));
  }

  render() {
    return (
      <Host role="presentation">
        <slot />
      </Host>
    );
  }
}
