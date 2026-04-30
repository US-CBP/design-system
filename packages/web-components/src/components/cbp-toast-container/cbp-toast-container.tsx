import { Component, Host, h, Prop } from '@stencil/core';

/**
 * The Toast container is used to hold and position multiple toasts.
 *
 * @slot - Only `cbp-toast` components shall be placed in the default slot.
 */
@Component({
  tag: 'cbp-toast-container',
  styleUrl: 'cbp-toast-container.scss'
})

export class CbpToastContainer {

  /** Specifies the position of the toast container relative to the viewport. */
  @Prop({ reflect: true }) position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'top-right';

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

}
