import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-container',
  styleUrl: 'cbp-container.scss',
})
export class CbpContainer {
  @Element() host: HTMLElement;

  @Prop() background: string;
  @Prop() textColor: string;
  @Prop() width: string;
  @Prop() padding: string;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      "--cbp-container-color-text": this.textColor,
      "--cbp-container-color-background": this.background,
      "--cbp-container-inner-width": this.width,
      //"--cbp-container-content-padding": this.padding,
      ...this.sx,
    });
  }
  

  render() {
    return (
      <Host>
        <div class="cbp-container--inner">
          <slot />
        </div>
      </Host>
    );
  }

}
