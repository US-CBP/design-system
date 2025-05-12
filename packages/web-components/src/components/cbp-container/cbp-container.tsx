import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - Any content or layout components may be slotted within the container.
 */
@Component({
  tag: 'cbp-container',
  styleUrl: 'cbp-container.scss',
})
export class CbpContainer {
  
  @Element() host: HTMLElement;

  /** Specifies the CSS background of the parent container, which could be a solid color, an image, a gradient, or any combination (or multiples) achievable via the CSS `background` property. */
  @Prop() background: string;
  
  /** Specifies the text color for content within the container, since it could be on any background. */
  @Prop() textColor: string;
  
  /** Specifies the width of the inner container area. */
  @Prop() width: string;
  
  //@Prop() padding: string;
  
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
