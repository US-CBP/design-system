import { Component, Host, h } from '@stencil/core';

/**
 * @slot - The default slot may contain any application-specific markup placed to the right of the CBP seal, usually a list of links.
 */
@Component({
  tag: 'cbp-universal-header',
  styleUrl: 'cbp-universal-header.scss',
})
export class CbpUniversalHeader {

  render() {
    return (
      <Host>
        <header>
          <div class="cbp-universal-header__brand">
            <picture>
              <source srcSet="assets/images/cbp-seal.svg" media="(max-width: 37.5rem)" type="image/svg+xml" height={44} width={44} />
              <img src="assets/images/cbp-header-logo.svg" alt="U.S. Customs and Border Protection" height="55" width="186" />
            </picture>
          </div>
          <div class="cbp-universal-header__content">
            <slot />
          </div>
        </header>
      </Host>
    );
  }

}
