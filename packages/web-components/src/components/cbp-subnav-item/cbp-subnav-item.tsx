import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-subnav-item',
  styleUrl: 'cbp-subnav-item.scss',
})
export class CbpSubnavItem {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
