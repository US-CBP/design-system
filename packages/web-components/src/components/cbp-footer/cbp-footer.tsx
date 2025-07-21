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

  @Element() host: HTMLElement;

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
            <slot />
          </div>
        </footer>
      </Host>
    );
  }
}
