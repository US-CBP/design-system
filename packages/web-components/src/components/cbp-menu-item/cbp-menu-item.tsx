import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-menu-item',
  styleUrl: 'cbp-menu-item.scss'
})
export class CbpMenuItem {

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

}
