import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Grid Item component may optionally be used to specify properties of an individual grid item.
 * 
 * @slot - The default slot may contain any content representing the grid item. 
 */
@Component({
  tag: 'cbp-grid-item',
  styleUrl: 'cbp-grid-item.scss',
})
export class CbpGridItem {
  
  @Element() private host: HTMLElement;

  /** Specifies the starting position/edge of the grid item in the horizontal/column plane, which is used to calculate the size (including column and row spanning) and location within the grid. */
  @Prop() gridColumnStart: number | string;

  /** Specifies the ending position/edge (non-inclusive) of the grid item in the horizontal/column plane, which is used to calculate the size (including column and row spanning) and location within the grid. */
  @Prop() gridColumnEnd: number | string;

  /** Specifies the starting position/edge of the grid item in the vertical/row plane, which is used to calculate the size (including column and row spanning) and location within the grid. */
  @Prop() gridRowStart: number | string;

  /** Specifies the ending position/edge (non-inclusive) of the grid item in the vertical/row plane, which is used to calculate the size (including column and row spanning) and location within the grid. */
  @Prop() gridRowEnd: number | string;

  /** Aligns this specific grid item in the vertical/column axis, perpendicular to the inline axis, separate from the parent context.  */
  @Prop() alignSelf: string;

  /** Justifies this specific grid item content horizontally, along the inline/row axis, separate from the parent context. */
  @Prop() justifySelf: string;

  /** Names the Grid Area for use with grid-template-area on the parent. */
  @Prop() gridArea: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      'grid-column-start': this.gridColumnStart,
      'grid-column-end': this.gridColumnEnd,
      'grid-row-start': this.gridRowStart,
      'grid-row-end': this.gridRowEnd,
      'align-self': this.alignSelf,
      'justify-self': this.justifySelf,
      'grid-area': this.gridArea,
      ...this.sx,
    });
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
