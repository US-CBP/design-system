import { Component, Prop, Host, h } from '@stencil/core';

/**
 * @slot - The default slot may contain any application-specific markup placed to the right of the CBP seal, usually a list of links.
 */
@Component({
  tag: 'cbp-universal-header',
  styleUrl: 'cbp-universal-header.scss',
})
export class CbpUniversalHeader {

  /** Fully qualified or relative URL pointing to the larger SVG containing the CPB seal with text. */
  @Prop() logoSrcLg: string = "/assets/images/cbp-header-logo.svg";
  
  /** Fully qualified or relative URL pointing to the plain SVG version of the CPB seal for smaller screens ("CBP" text is supplied via CSS automatically). */
  @Prop() logoSrcSm: string = "/assets/images/cbp-seal.svg";

  
  render() {
    return (
      <Host>
        <div class="cbp-universal-header__brand">
          <picture>
            <source srcSet={this.logoSrcSm} media="(max-width: 37.5rem)" type="image/svg+xml" height={44} width={44} />
            <img src={this.logoSrcLg} alt="U.S. Customs and Border Protection" height="55" width="186" />
          </picture>
        </div>
        <div class="cbp-universal-header__content">
          <slot />
        </div>
      </Host>
    );
  }

}
