import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Multicol component is a wrapper that invokes a CSS Multi-column layout context, ideal for 
 * using with semantic lists and checklists/radio lists.
 * 
 * @slot - The default slot contains any content or children to be arranged in a multi-column layout.
 */
@Component({
  tag: 'cbp-multicol',
  styleUrl: 'cbp-multicol.scss',
})
export class CbpMulticol {

  @Element() host: HTMLElement;

  /** Specifies the maximum number of columns */
  @Prop() columns: number;

  /** 
   * Specifies the minimum column width in CSS units (preferably relative units such as `rem`). 
   * The column width may affect how many columns are actually used based upon available space. 
   */
  @Prop() width: string;

  /** Specifies the gap between columns in CSS units (preferably relative units such as `rem`). */
  @Prop() gap: string;

  /** Specifies the rule separating each column (syntax is similar to CSS borders, including a width, style, and color). */
  @Prop() rule: string;

  /** Specifies that children shall not be broken to spread contents across columns (using `break-inside: avoid` CSS). */
  @Prop( {reflect: true}) nobreak: boolean;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      'column-count': this.columns,
      'column-width': this.width,
      'column-gap': this.gap,
      'column-rule': this.rule,
      ...this.sx,
    });
  }

  render() {
    return (
      <Host role="list">
        <slot />
      </Host>
    );
  }
}
