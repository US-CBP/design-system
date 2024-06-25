import { Component, Host, Prop, Element,  h } from '@stencil/core';

@Component({
  tag: 'cbp-banner',
  styleUrl: 'cbp-banner.scss',
})
export class CbpBanner {

  @Element() host: HTMLElement;

  @Prop() color: string = 'infoBanner'; //intended to be used for different statuses (error, warning, etc)

  handleDismiss() {
    this.host.setAttribute('hidden', '');
    //call event emitter for app to piggy back (need Event, EventEmitter ?)
  }

  render() {
    return (
      <Host>
          <cbp-icon  
            class='cbp-banner__icon-container'
            name='exclamation-circle'
            color='var(--cbp-color-text-lighter)'
            size='3rem'
            />
        <div class='cbp-banner__text-container'>
          <slot name='cbp-banner-title' /> 
          <span class='cbp-banner-content'>
            <slot />
          </span>
          <cbp-button 
            type='button'
            fill='solid'
            color='primary'
            context='dark-always'
            onButtonClick={ () => {this.handleDismiss()}}
          >
            <cbp-icon 
              name='times'
              sx={{"margin-inline-end": "var(--cbp-space-1x)"}}
            />
            Dismiss
          </cbp-button>
        </div>

      </Host>
    );
  }

}
