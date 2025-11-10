import { Component, Element, Event, EventEmitter, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-dot-indicator',
  styleUrl: 'cbp-dot-indicator.scss'
})
export class CbpDotIndicator {

  @Element() host: HTMLElement; 
  
  private selectedIndex: number = 1; // index of the selected indicator
  private focusIndex: number = 0; // index of the focused indicator, used for keyboard nav

  /** the currently active dot */
  @Prop ({reflect: true}) activeIndicator: number; //TODO: this may not need reflect: true
  /** Length of index dot-indicator is tracking */
  @Prop({ reflect: true }) indicatorLength: number;

  /** Custom event emitted when the Dot-indicator changes active indicator*/
  @Event() handleIndexChange: EventEmitter;

  setIndexActive(index){
    if(index >= this.indicatorLength){
      index=0;
    }else if(index < 0){
      index=this.indicatorLength - 1;
    }

    this.host.querySelectorAll('.dot-indicators-container button').forEach((item)=> {
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('tabindex', '-1');
    })

    this.selectedIndex = this.focusIndex = index;
    
    let indicator = this.host.querySelector('.dot-indicators-container').childNodes[index] as HTMLButtonElement;
    indicator.setAttribute('aria-selected', 'true');
    indicator.setAttribute('tabindex', '0');
    this.activeIndicator = index;

    this.handleIndexChange.emit({
      host: this.host,
      active: this.activeIndicator
    })
  }

  generateIndicator(){
    let dotIndicator: HTMLButtonElement[] = [];
    for (let x = 0; x < this.indicatorLength; x++){
      let newIndicator: HTMLButtonElement = 
        <button 
          // aria-index={`${x}`} //TODO: aria-index not right, just here for testing
          aria-selected = {x == this.activeIndicator ? "true" : "false"}
          tabindex="-1"
          onClick={() => this.setIndexActive(x)}
        >
          <span></span> 
        </button>;
        dotIndicator = [...dotIndicator, newIndicator]
    }
    
    return dotIndicator
  }

  keyboardNav(key) {
    const l = this.indicatorLength - 1;
    const n = {
      Home: 0,
      ArrowLeft: -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l,
      ArrowRight: l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0,
      End: l,
      Tab: this.focusIndex=this.selectedIndex, // reset the focusIndex when tabbing out of the dot-indicator
    }[key];
    if (n !== undefined && key !== 'Tab') {
      this.focusIndex = n;
      let focusedIndicator = this.host.querySelectorAll(`.dot-indicators-container button`)[this.focusIndex] as HTMLElement;
      focusedIndicator.focus();
    }
  }

  componentDidRender(){
  this.setIndexActive(this.activeIndicator);
  }

  render() {
    return (
      <Host
      >
        <cbp-button
          fill="ghost"
          color="secondary"
          variant="square"
          value="carousel-back"
          onClick={() => {
              // document.querySelector('.cbp-carousel-viewer').setAttribute('aria-animation', 'carouselBackwards'); //TODO: note for animation refactor
              this.setIndexActive(this.selectedIndex - 1)
            }
          }
        >
          <cbp-icon name="angle-down" rotate={90}></cbp-icon>
        </cbp-button>

        <div class="dot-indicators-container"
          onKeyDown={({ key }) => {
            this.keyboardNav(key);
          }}
        >
          {this.generateIndicator()}
        </div>
        
        <cbp-button
          fill="ghost"
          color="secondary"
          variant="square"
          value="carousel-forward"
          onClick={() => {
              // document.querySelector('.cbp-carousel-viewer').setAttribute('aria-animation', 'carouselForwards'); //TODO: note for animation refactor
              this.setIndexActive(this.selectedIndex + 1)
            }
          }
        >
          <cbp-icon name="angle-down" rotate={270}></cbp-icon>
        </cbp-button>
      </Host>
    );
  }
}
