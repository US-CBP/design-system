import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Footer component serves site visitors who arrive at the bottom of a page without finding 
 * what they want, typically containing information about the agency and navigation links.
 * 
 * @slot - The main footer content goes in the default slot.
 * @slot cbp-footer-nav - Footer navigation links are slotted within this named slot.
 */
@Component({
  tag: 'cbp-footer',
  styleUrl: 'cbp-footer.scss',
})
export class CbpFooter {

  @Element() private host: HTMLElement;

  /** Fully qualified or relative URL pointing to the larger SVG containing the CPB seal with text. */
  @Prop() logoSrc: string = "/assets/images/dhs-seal.svg";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {
    return (
      <Host>
        <footer>
          {
            this.host.querySelector('[slot=cbp-footer-nav]') && 
            <div class="cbp-footer-nav">
              <slot name="cbp-footer-nav" />
            </div>
          }
          <div class="cbp-footer-content">
            <cbp-flex
              gap="var(--cbp-space-2x)"
              sx='{"padding-bottom" : "var(--cbp-space-3x)","margin-bottom" : "var(--cbp-space-3x)","border-bottom": "var(--cbp-border-size-md) solid var(--cbp-color-gray-cool-60)"}'
            >
              <cbp-flex-item
                flexShrink={0}
              >
                <img src={this.logoSrc} alt="U.S. Customs and Border Protection" height="44" width="44" />
              </cbp-flex-item>
              <cbp-flex 
                direction="column"
              >
                <cbp-typography variant="heading-xs" context="dark-always">US Customs and Border Protection</cbp-typography>
                <cbp-typography variant="body-text">This is an official website of the United States government, Department of Homeland Security</cbp-typography>
              </cbp-flex>
            </cbp-flex>
            <slot />
          </div>
        </footer>
      </Host>
    );
  }
}
