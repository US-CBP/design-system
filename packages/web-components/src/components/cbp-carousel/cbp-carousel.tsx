import { Component, Element, Host, h, Prop} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-carousel',
  styleUrl: 'cbp-carousel.scss'
})

export class CbpCarousel {

  private slideIndex; //array of slides
  
  @Element() host: HTMLElement; 
  
  @Prop({reflect: true}) height
  @Prop({reflect: true}) width

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
    document.querySelector('#carousel-back').addEventListener('click', () => this.updateVisible())
    document.querySelector('#carousel-forward').addEventListener('click', () => this.updateVisible())
    
    this.height != null ? this.host.style.height = this.height : null;
    this.width != null ? this.host.style.width = this.width : null;
    
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
        <slot name='index-control'></slot>
      </Host>
    );
  }

}
