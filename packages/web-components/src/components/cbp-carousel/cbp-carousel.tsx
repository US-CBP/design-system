import { Component, Element, Host, h, Listen, Prop } from '@stencil/core';
import { debounce } from '../../utils/utils';
import { setCSSProps } from '../../utils/utils';

/**
 * The Carousel is a control meant to take slotted Carousel-items to visually
 * iterate though to display with a slotted control of a dot-indicator or other control
 * 
 * @slot - Intended for a collection of CBP-Carousel-Items to be rendered in the cbp-carousel-container
 * @slot cbp-carousel-controls - This named slot is intended for a control of the carousel, for example: cbp-dot-indicator
 */
@Component({
  tag: 'cbp-carousel',
  styleUrl: 'cbp-carousel.scss'
})

export class CbpCarousel {

  private control: HTMLCbpDotIndicatorElement;

  @Element() host: HTMLElement;

  //TODO: seperate these from the cbp-carousel-item instance
  @Prop() height: string = '100%';
  @Prop() width: string = '100%';

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

    this.control = this.host.querySelector('[slot="cbp-carousel-controls"]');
    this.updateVisible();
  }

  @Listen('navigateCollection')
  navigateCollection() {
    this.updateVisible();
  }

  handleResize(width) {
    this.width = width;

    //TODO: need to find behavior for fullscreen and responsive to be triggered here
  }

  updateVisible() {
    this.activeItem = this.control.current;
    let widthValue = 0;
    if (this.width.includes('%')) {
      widthValue = (this.host.offsetWidth * parseInt(this.width)) / 100;

      console.log('sanity check for %: ', widthValue)
    } else {
      widthValue = parseInt(this.width)
    }
    let carouselOffset = 0;
    let carouselOffsetStart = getComputedStyle(this.control).getPropertyValue('--cbp-carousel-offset');


    for (let x = 0; x < this.activeItem; x++) {
      carouselOffset -= widthValue;
    }
    setCSSProps(this.host, {
      "--cbp-carousel-offset": `${carouselOffset}px`,
      "--cbp-carousel-offset-start": `${carouselOffsetStart}px`
    });

    //TODO: need resize observer & set the actual css var based on resize value resize will always return px values
  }

  render() {
    return (
      <Host
        role="region"
        aria-roledescription="carousel"
      >
        <cbp-resize-observer
          onResized={debounce(e => {
            this.handleResize(e.detail.width);
            // console.log('resize observer sanity check', e);
          }, 10)}
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
        </cbp-resize-observer>
        <slot name="cbp-carousel-controls"></slot>
      </Host>
    );
  }

}
