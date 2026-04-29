import { Component, Host, h, Prop } from '@stencil/core';

/**
 * The Toast container is to position a collection of toast components in app
 * @slot - The default slot is to be populated with cbp-toasts
 */

@Component({
  tag: 'cbp-toast-container',
  styleUrl: 'cbp-toast-container.scss'
})

export class CbpToastContainer {

  /** specifies the position of the toast Container */
  @Prop({ reflect: true }) position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'top-right';

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
