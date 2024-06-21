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
      <Host aria-color={this.color}>
        <div class='iconContainer'>
          <cbp-icon  
            name='exclamation-circle'
            color='var(--cbp-color-text-lighter)'
            size='3rem'
            />
        </div>
        <div class='textContainer'>
          <slot name='cbp-banner-title' /> 
          {/* typography component has max width that is causing overflow in larger cases *discussion for later* */}
          <span class='cbp-banner-content'>
            <slot />
          </span>
          {/*TODO: hook up button behavior, use hidden attribute need to import event and event emitter decorators*/}
          <cbp-button 
            type='button'
            fill='solid'
            color='primary'
            context='dark-always'
            onButtonClick={ () => {this.handleDismiss()}}
          >
            {/* sx command doesn't seem to be working, probably syntax issue: use stringafied json sx='{"":""}' */}
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
