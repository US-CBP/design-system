import { Component, Element, Host, h, Prop} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-floating-action',
  styleUrl: 'cbp-floating-action.scss'
})
export class CbpFloatingAction {

  @Element() private host: HTMLElement;

  /**sets the top css property of the floating action component */
  @Prop() top: any 

  /**sets the top css property of the floating action component */
  @Prop() right: any 

  /**sets the top css property of the floating action component */
  @Prop() bottom: any 

  /**sets the top css property of the floating action component */
  @Prop() left: any 

  /** Supports adding inline styles (to the host) as an object. This property is not reactive. */
  @Prop() sx: any = {};

  componentWillLoad() {
      if (typeof this.sx == 'string') {
        this.sx = JSON.parse(this.sx) || {};
      }
      setCSSProps(this.host, {
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left,
        ...this.sx,
      });
    }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}