import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-panel',
  styleUrl: 'cbp-panel.scss'
})
export class CbpPanel {

  render() {
    return (
      <Host>
        <div class="cbp-panel__header">
          <slot name="cbp-panel-header" />
        </div>
        <div class="cbp-panel__content">
          <slot />
        </div>
      </Host>
    );
  }

}
