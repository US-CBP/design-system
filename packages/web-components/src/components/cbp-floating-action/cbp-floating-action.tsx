import { Component, Element, Host, h, Prop} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-floating-action',
  styleUrl: 'cbp-floating-action.scss'
})
export class CbpFloatingAction {

  @Element() private host: HTMLElement;

  /** Sets the top position (in CSS units) of the floating action component within the viewport.*/
  @Prop() top: string 

  /** Sets the right position (in CSS units) of the floating action component within the viewport. */
  @Prop() right: string 

  /** Sets the bottom position (in CSS units) of the floating action component within the viewport.*/
  @Prop() bottom: string 

  /** Sets the left position (in CSS units) of the floating action component within the viewport.*/
  @Prop() left: string 

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