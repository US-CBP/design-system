import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-button',
  styleUrl: 'cbp-button.scss',
})
export class CbpButton {

  render() {
    return (
      <Host>
        <button>
          <slot />
        </button>
      </Host>
    );
  }

}
