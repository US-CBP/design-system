import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-visuallyhidden',
  styleUrl: 'cbp-visuallyhidden.scss'
})
export class CbpVisuallyhidden {

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
