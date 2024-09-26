import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-usa-banner',
  styleUrl: 'cbp-usa-banner.scss'
})
export class CbpUsaBanner {

  @Element() host: HTMLElement;

  /** When set, specifies that the banner is open */
  @Prop({ reflect: true }) open: boolean;

  // /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  // @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};
  
  /** A custom event emitted when the banner link control is activated. */
  @Event() bannerLinkClick: EventEmitter;
  handleClick(e) {
    e.preventDefault();
    this.open = !this.open;
    this.bannerLinkClick.emit({
      host: this.host,
      open: this.open,
    });
  }

  render() {
    return (
      <Host>
        <img src="../assets/images/us_flag_small.png" height="11" width="16" alt="usa logo"/>Official website of the United State government. 
        <cbp-link class='cbp-usa-banner-expand' onClick={() => this.handleClick(event)} href='#'>
          Here is how you know<cbp-icon name='chevron-right'/>
        </cbp-link>
        <div class='cbp-usa-banner-content'>
          <cbp-icon 
              class='cbp-banner-content-icon'
              color="var(--cbp-color-info-light)"
              name='landmark'
              size="1.25rem" 
          />  
          <div>
            <cbp-typography
              tag='h5'
              sx='{"color": "var(--cbp-usa-banner-color)"}'
            >
              Official websites use .gov
            </cbp-typography>
            <cbp-typography
              tag='p'
              sx='{"margin-bottom":0}'
            >
              A <b>.gov</b> website belongs to the official government organization in the United States.
            </cbp-typography>
          </div>
          <cbp-icon 
              class='cbp-banner-content-icon'
              color="var(--cbp-color-info-light)"
              name='lock'
              size="1.25rem" 
            />
          <div>
            <cbp-typography
              tag='h5'
              sx='{"color": "var(--cbp-usa-banner-color)"}'
            >
              Secure .gov websites use HTTPS
            </cbp-typography>
            <cbp-typography
              tag='p'
              sx='{"margin-bottom":0}'
            >
              A lock(<cbp-icon name='lock' />) or https:// means you've safetly connected to the .gov website. Share sensitive information only on official, secure websites
            </cbp-typography>
          </div>
          <slot>  
          </slot>
        </div>
      </Host>
    );
  }

}
