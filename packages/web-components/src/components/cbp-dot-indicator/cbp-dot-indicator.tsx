import { Component, Element, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-dot-indicator',
  styleUrl: 'cbp-dot-indicator.scss'
})
export class CbpDotIndicator {


  
  @Element() host: HTMLElement; 
  
  private selectedIndex: number = 0; // index of the selected indicator
  private focusIndex: number = 0; // index of the focused indicator, used for keyboard nav

  /** Length of index dot-indicator is tracking */
  @Prop({ reflect: true }) index: number;

  setIndexActive(index){
    if(index >= this.index){
      index=0;
    }else if(index < 0){
      index=this.index - 1;
    }

    this.host.querySelectorAll('.dot-indicator').forEach((item)=> {
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('tabindex', '-1');
    })

    this.selectedIndex = this.focusIndex = index;
    let indicator = this.host.querySelector(`.dot-indicator[index="${index}"]`);
    indicator.setAttribute('aria-selected', 'true');
    indicator.setAttribute('tabindex', '0');
  }

  generateIndicator(){
    let html='';
    for(let x=0; x < this.index; x++){
      html+= `<button 
                class='dot-indicator'
                index=${x}
                tabindex="-1"
              >
                <div class='dot'>
                </div> 
              </button> `;
    }
    this.host.innerHTML = html;
  }


  keyboardNav(key) {
    const l = this.index - 1;
    const n = {
      Home: 0,
      ArrowLeft: -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l,
      ArrowRight: l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0,
      End: l,
      Tab: this.focusIndex=this.selectedIndex, // reset the focusIndex when tabbing out of the dot-indicator
    }[key];
    if (n !== undefined && key !== 'Tab') {
      console.log('keyboardNav check: ', n);
      this.focusIndex = n;
      this.setIndexActive(this.focusIndex);
    }
  }

  componentDidRender(){
    let indicators = this.host.querySelectorAll('.dot-indicator');
    indicators.forEach((dot) => {
      let dotIndex = dot.getAttribute('index');
      dot.addEventListener('click', () => this.setIndexActive(dotIndex));
    })
    
    let carousel = document.querySelector('cbp-carousel');
    carousel.addEventListener('carouselForward', (e)=> this.setIndexActive(e.detail.index));
    carousel.addEventListener('carouselBackward', (e)=> this.setIndexActive(e.detail.index));

    indicators[0].setAttribute('aria-selected', 'true'); //default set first index to active;
  }

  render() {
    return (
      <Host
        onKeydown={({ key }) => {
          this.keyboardNav(key);
        }}
      >
        {this.generateIndicator()}
      </Host>
    );
  }
}
