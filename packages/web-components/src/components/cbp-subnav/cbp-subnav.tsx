import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-subnav',
  styleUrl: 'cbp-subnav.scss'
})
export class CbpSubNav {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
