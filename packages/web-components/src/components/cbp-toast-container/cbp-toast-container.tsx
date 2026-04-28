import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-toast-container',
  styleUrl: 'cbp-toast-container.scss'
})

export class CbpToastContainer {

  /** specifies the position of the toast Container */
  @Prop({ reflect: true }) orientation: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'top-right';

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
