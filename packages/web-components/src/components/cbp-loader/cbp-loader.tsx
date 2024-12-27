import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-loader',
  styleUrl: 'cbp-loader.scss',
})

export class CbpLoader {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
