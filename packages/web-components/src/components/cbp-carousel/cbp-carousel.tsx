import { Component, Element, Host, h, Listen, Prop} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-carousel',
  styleUrl: 'cbp-carousel.scss'
})

export class CbpCarousel {

  private control: HTMLCbpDotIndicatorElement;
    
  @Element() host: HTMLElement; 
  
  @Prop() height;
  @Prop() width;

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
  }

  @Listen('handleIndexChange')
  handleIndexChange() {
    this.updateVisible();
  }

  updateVisible(){
      // let carouselContainer = this.host.querySelector('.cbp-carousel-container');
      // carouselContainer.classList.contains('carousel-animation')?carouselContainer.classList.remove('carousel-animation'): null;

      let activeCarouselItem = this.control.activeIndicator;
      let widthValue = parseInt(this.width);
      let carouselOffset = 0;
      let carouselOffsetStart = getComputedStyle(this.control).getPropertyValue('--cbp-carousel-offset');


      for(let x=0; x < activeCarouselItem; x++){
        carouselOffset -= widthValue;
      }
      setCSSProps(this.host, {
        "--cbp-carousel-offset": `${carouselOffset}px`,
        "--cbp-carousel-offset-start": `${carouselOffsetStart}px`
      });
      // carouselContainer.classList.add('carousel-animation');
  }

  componentDidRender(){
    this.updateVisible();
  }

  componentWillRender(){
    this.control = this.host.querySelector('[slot="index-control"]');
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
        <slot name="index-control"></slot>
      </Host>
    );
  }

}
