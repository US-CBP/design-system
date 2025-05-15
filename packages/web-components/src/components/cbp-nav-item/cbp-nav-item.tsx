import { Component, Element, Prop, Watch, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

import state from '../cbp-app-header/store';

@Component({
  tag: 'cbp-nav-item',
  styleUrl: 'cbp-nav-item.scss',
})

export class CbpNavItem {

  private control: any; // HTMLAnchorElement | HTMLButtonElement

  @Element() host: HTMLCbpNavItemElement;

  /** Specifies whether this is the Nav Item that represents the current page. Only one item per set should be marked as current. */
  @Prop({ reflect: true }) current: boolean;

  /** Specifies a name used to associated Nav Items with Subnav Items. */
  @Prop({ reflect: true }) name: string;

  /** Supports adding inline styles as an object. */
  @Prop() sx: any = {};
  
  @Event() navItemClick: EventEmitter;
  handleNavItemClick() {
    state.activeItemName = this.name;

    // For anchors, set selected and update states (buttons will open a drawer for further action)
    if (this.host.querySelector('a')) {
      this.current = true;

      state.currentPage = this.name;
      state.currentParent = this.name;
      // Only emit the event if it's an anchor
      this.navItemClick.emit({
        host: this.host,
      })
    }
  }

  @Watch('selected')
  doSelected(newValue) {
    if (newValue) this.control.setAttribute('aria-current', 'page');
    else this.control.removeAttribute('aria-current');
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    this.control = this.host.querySelector('a,button');
    if (this.current) this.control?.setAttribute('aria-current', 'page');
  }

  render() {
    return (
    <Host onClick={() => this.handleNavItemClick()}>
      <slot />
    </Host>
    );  
  }
}
