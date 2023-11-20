import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

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
              <slot name="cbp-footer-nav"></slot>
            </div>
          }
          <div class="cbp-footer-content">
            <slot/>
          </div>
        </footer>
      </Host>
    );
  }

}
