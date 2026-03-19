import { Component, Host, h, Prop} from '@stencil/core';

@Component({
  tag: 'cbp-floating-action',
  styleUrl: 'cbp-floating-action.scss'
})
export class CbpFloatingAction {

  /**determines the alignment of the floating action component. defaults to bottom-right*/
  @Prop() alignment: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-right';

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}