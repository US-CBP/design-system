import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-carousel-item',
  styleUrl: 'cbp-carousel-item.scss'
})
export class CbpCarouselItem {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
