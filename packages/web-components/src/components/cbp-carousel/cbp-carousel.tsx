import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-carousel',
  styleUrl: 'cbp-carousel.scss'
})
export class CbpCarousel {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
