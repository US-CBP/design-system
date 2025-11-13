import { Component, Element, Host, h, Listen, Prop, Watch } from '@stencil/core';
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

  /** used to set the height (in CSS units or content values) of the carousel*/
  @Prop() height: string = '100%';

  /** used to set the width (in CSS units or content values) of the carousel*/
  @Prop() width: string = '100%';

  /** used to set the activeIndex for the carousel*/
  @Prop({ mutable: true }) activeIndex = 0;

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
  }

  @Watch('activeIndex')
  watchActiveIndex(e) {
    if (e < 0) {
      this.activeIndex = 0;
    } else if (e > this.control.items) {
      this.activeIndex = this.control.items
    }
  }

  @Listen('navigateCollection')
  navigateCollection() {
    this.updateCurrent();
  }

  handleResize() {
    this.scrollToItem()
    //TechDebt: need to find behavior for fullscreen and responsive to be triggered here
  }

  scrollToItem() {
    let carouselItems = this.host.querySelectorAll('cbp-carousel-item') as unknown as HTMLCbpCarouselItemElement[];
    let carouselOffset = 0;
    let carouselOffsetStart = getComputedStyle(this.control).getPropertyValue('--cbp-carousel-offset');

    for (let x = 0; x < this.activeIndex; x++) {
      carouselOffset -= carouselItems[x].offsetWidth
    }
    setCSSProps(this.host, {
      "--cbp-carousel-offset": `${carouselOffset}px`,
      "--cbp-carousel-offset-start": `${carouselOffsetStart}px`
    });
  }

  updateCurrent() {
    this.activeIndex = this.control.current;
    this.scrollToItem();
  }


  render() {
    return (
      <Host
        role="region"
        aria-roledescription="carousel"
      >
        <cbp-resize-observer
          onResized={debounce(() => {
            this.handleResize();
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
