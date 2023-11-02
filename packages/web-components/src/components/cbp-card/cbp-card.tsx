import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-card',
  styleUrl: 'cbp-card.scss',
})
export class CbpCard {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
