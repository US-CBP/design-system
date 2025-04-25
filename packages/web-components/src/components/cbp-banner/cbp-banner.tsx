import { Component, Prop, Element, Event, EventEmitter, h, Host} from '@stencil/core';

/**
 * @slot - The main content of the banner goes in the default slot. 
 * @slot cbp-banner-title - An optional banner title may be slotted here.
 */
@Component({
  tag: 'cbp-banner',
  styleUrl: 'cbp-banner.scss',
})
export class CbpBanner {

  @Element() host: HTMLElement;

  /** Specifies a color variant for the banner. */
  @Prop({reflect: true}) color: "info" = "info"; //intended to be used for different statuses (error, warning, etc)

  /** A custom event emitted with the Banner is dismissed. */
  @Event() bannerDismiss: EventEmitter;
    handleDismiss() {
      this.host.setAttribute("hidden", "");
      this.bannerDismiss.emit({
        host: this.host
    }) 
  }

  /*
      TechDebt: should the banner title render a standard heading size? 
      Leaving it entirely to the developer is prone to inconsistencies.
      Also, should there be a title prop? (keep optional slot)
    */
  render() {
    return (
      <Host>
          <cbp-icon  
            class="cbp-banner-icon-container"
            name="exclamation-circle"
            color="var(--cbp-color-text-lighter)"
            size="3rem"
            />
        <div class="cbp-banner-text-container">
          <slot name="cbp-banner-title" /> 
          <p>
            <slot />
          </p>
          <cbp-button 
            type="button"
            fill="solid"
            color="primary"
            context="dark-always"
            onButtonClick={ () => {this.handleDismiss()}}
          >
            <cbp-icon 
              name="times"
              sx={{"margin-inline-end": "var(--cbp-space-1x)"}}
            />
            Dismiss
          </cbp-button>
        </div>

      </Host>
    );
  }

}
