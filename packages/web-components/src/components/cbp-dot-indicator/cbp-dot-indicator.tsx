import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-dot-indicator',
  styleUrl: 'cbp-dot-indicator.scss'
})
export class CbpDotIndicator {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
