import { Component, Element, Host, h, Prop } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Carousel Item is meant to be slotted into the CBP-Carousel and represents a single 
 * iteration of content for the CBP-Carousel
 * 
 * @slot - Anything placed into the default slot will be rendered in the cbp-carousel-item
 */

@Component({
  tag: 'cbp-carousel-item',
  styleUrl: 'cbp-carousel-item.scss'
})
export class CbpCarouselItem {

  @Element() host: HTMLElement;

  @Prop() height: string = '100%';
  @Prop() width: string = '100%';

  componentWillLoad() {
    setCSSProps(this.host, {
      "--cbp-carousel-item-height": `${this.height}`,
      "--cbp-carousel-item-width": `${this.width}`,
    });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
