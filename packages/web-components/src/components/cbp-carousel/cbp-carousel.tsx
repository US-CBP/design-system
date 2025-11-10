import { Component, Element, Host, h, Listen, Prop} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Carousel is a control meant to take slotted Carousel-items to visually
 * iterate though to display with a slotted control of a dot-indicator or other control
 * 
 * @slot - Anything placed into the default slot will be rendered in the cbp-carousel-container
 * @slot cbp-carousel-controls - This named slot is intended for a control of the carousel, for example: cbp-dot-indicator
 */
@Component({
  tag: 'cbp-carousel',
  styleUrl: 'cbp-carousel.scss'
})

export class CbpCarousel {

  private control: HTMLCbpDotIndicatorElement;
    
  @Element() host: HTMLElement; 
  
  @Prop() height;
  @Prop() width;

  /** used to set the activeItem for the carousel*/
  @Prop() activeItem
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
        "--cbp-carousel-height": `${this.height}`,
        "--cbp-carousel-width": `${this.width}`,
      ...this.sx,
    });
    
    this.updateVisible();
  }

  @Listen('navigateCollection')
  navigateCollection() {
    this.updateVisible();
  }

  updateVisible(){
      // let carouselContainer = this.host.querySelector('.cbp-carousel-container');
      // carouselContainer.classList.contains('carousel-animation')?carouselContainer.classList.remove('carousel-animation'): null;

      this.activeItem = this.control.current;
      let widthValue = parseInt(this.width);
      let carouselOffset = 0;
      let carouselOffsetStart = getComputedStyle(this.control).getPropertyValue('--cbp-carousel-offset');


      for(let x=0; x < this.activeItem; x++){
        carouselOffset -= widthValue;
      }
      setCSSProps(this.host, {
        "--cbp-carousel-offset": `${carouselOffset}px`,
        "--cbp-carousel-offset-start": `${carouselOffsetStart}px`
      });
      // carouselContainer.classList.add('carousel-animation');
  }

  componentWillRender(){
    this.control = this.host.querySelector('[slot="cbp-carousel-controls"]');
  }

  render() {
    return (
      <Host
        role="region"
        aria-roledescription="carousel"
      >
        <div
          class="cbp-carousel-viewer"
          role="group"
          aria-description="slides"
        >
          <div class="cbp-carousel-container">
            <slot></slot>
          </div>
        </div>
        <slot name="cbp-carousel-controls"></slot>
      </Host>
    );
  }

}
