import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-usa-banner',
  styleUrl: 'cbp-usa-banner.scss'
})
export class CbpUsaBanner {

  private button: HTMLButtonElement;
  @Element() host: HTMLElement;

  /** When set, specifies that the banner is open */
  @Prop({ reflect: true }) open: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};
  
  /** A custom event emitted when the accordion item control is activated. */
  @Event() bannerLinkClick: EventEmitter;
  handleClick() {
    this.open = !this.open;
    this.bannerLinkClick.emit({
      host: this.host,
      button: this.button,
      open: this.open,
    });
    this.button.focus();
  }

  render() {
    return (
      <Host>
        <cbp-icon name='star'></cbp-icon>This is an official website of the United State government. 
        <cbp-link class='cbp-usa-banner-expand' onClick={() => this.handleClick()}>
          Here is how you know<cbp-icon name='chevron-right' rotate={90}/**TODO: need to add a rotate*//>
        </cbp-link>
        <div class='cbp-usa-banner-content'>
          <div >
            <cbp-icon>
              
            </cbp-icon>
          </div>
          <slot>  
          </slot>
        </div>
      </Host>
    );
  }

}
