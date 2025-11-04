import { Component, Element, Event, EventEmitter, Host, h, Prop} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-carousel',
  styleUrl: 'cbp-carousel.scss'
})

export class CbpCarousel {

  private slideIndex; //array of slides
  
  @Element() host: HTMLElement; 
  
 /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  @Event() carouselForward: EventEmitter;
    handleCarouselForward(e){
      let index = Number(document.querySelector('[slot="index-control"] [aria-selected="true"]').getAttribute('index')) + 1;
      this.carouselForward.emit({
        index: index,
        nativeEvent: e
      })
      document.querySelector('.cbp-carousel-viewer').setAttribute('aria-animation', 'carouselForwards');
      this.updateVisible();
     }

  @Event() carouselBackward: EventEmitter;
     handleCarouselBackward(e) {
      let index = Number(document.querySelector('[slot="index-control"] [aria-selected="true"]').getAttribute('index')) - 1;
      this.carouselForward.emit({
        index: index,
        nativeEvent: e
      })
      document.querySelector('.cbp-carousel-viewer').setAttribute('aria-animation', 'carouselBackwards');
      this.updateVisible();
     }

  updateVisible(){
    let index = document.querySelector('[slot="index-control"] [aria-selected="true"]').getAttribute('index'); //TODO: probably pretty weak selector/logic here
   
    for  (let x=0; x < this.slideIndex.length; x++) {
      const slide = this.slideIndex[x];
      slide.hidden= true;
    }

    this.slideIndex[index].hidden = false;
  }

  componentDidRender(){
    this.slideIndex = document.querySelector('.cbp-carousel-viewer').children;
    
    let indicators = document.querySelectorAll('cbp-dot-indicator .dot-indicator');
    indicators.forEach((dot) => {
      dot.addEventListener('click', () => this.updateVisible());
    })

    this.updateVisible();
  }

  render() {
    return (
      <Host
        role='region'
        aria-roledescription='carousel'
      >
        <div
          class='cbp-carousel-viewer'
          role='group'
          aria-description='slides'
        >
          <slot></slot>
        </div>
        <div class='cbp-carousel-controls'>
          <cbp-button
            type='button'
            fill='ghost'
            color='secondary'
            variant='square'
            id='carousel-back'
            onClick={(e) => this.handleCarouselBackward(e)}
          >
            <cbp-icon name='angle-down' rotate={90}></cbp-icon>
          </cbp-button>
          <slot name='index-control'></slot>
          
          <cbp-button
            type='button'
            fill='ghost'
            color='secondary'
            variant='square'
            id='carousel-forward'
            onClick={(e) => this.handleCarouselForward(e)}
          >
            <cbp-icon name='angle-down' rotate={270}></cbp-icon>
          </cbp-button>
        </div>
      </Host>
    );
  }

}
