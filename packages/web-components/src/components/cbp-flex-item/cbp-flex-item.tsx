import { Component, Prop, Element, Host, h} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Flex Item component may optionally be used to specify properties of an individual flex item.
 * 
 * @slot - Content slotted in the default slot may consist of any combination of text or DOM nodes.
 */
@Component({
  tag: 'cbp-flex-item',
  styleUrl: 'cbp-flex-item.scss',
})
export class CbpFlexItem {

  @Element() private host: HTMLElement;

  /** Specifies the alignment of the specific flex item along the cross-axis separate from the parent context. */
  @Prop() alignSelf: "auto" | "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
    
  /** Specifies an ordinal group value for sorting this flex item within its group. Defaults to zero, which renders the items in DOM order. */
  @Prop() order: number;
  
  /** Specifies the growth factor the item will grow at relative to other items. Defaults to zero, as flex items do not grow by default. */
  @Prop() flexGrow: number;
  
  /** Specifies the shrink factor the item will shrink at relative to other items. Defaults to 1, as flex items will shrink at an equal rate by default, taking content size into consideration. */
  @Prop() flexShrink: number;
  
  /** Specifies a basis (in CSS units or content values) for calculating flex behavior different from the default of "auto" (which usually evaluates to "content"). */
  @Prop() flexBasis: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  componentWillLoad() {
    if (typeof this.sx == "string") {
        this.sx = JSON.parse(this.sx) || {}
    }
    setCSSProps(this.host, {
        'align-self': this.alignSelf,
        'order': this.order,
        'flex-grow': this.flexGrow,
        'flex-shrink': this.flexShrink,
        'flex-basis': this.flexBasis,
        ...this.sx
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
