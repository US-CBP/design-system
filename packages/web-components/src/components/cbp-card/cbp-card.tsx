import { Component, Host, Element, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - The default slot contains the body of the card.
 * @slot cbp-card-title - Contains the card title, if present.
 * @slot cbp-card-actions - Contains the links/buttons for decision cards.
 */
@Component({
  tag: 'cbp-card',
  styleUrl: 'cbp-card.scss',
})
export class CbpCard {
  @Element() host: HTMLElement;

  /** Optionally specifies a card color (different from the default color) based on predefined design token values. */
  @Prop({ reflect: true }) color: 'info' | 'success' | 'warning' | 'danger';
  
  /** Specifies optional variants with difference from the default card. */
  @Prop({ reflect: true }) variant: 'banner' | 'decision';

  /** When present, the card will stretch vertically to fill its parent container; most useful when placed in an equally sized grid or row of cards. */
  @Prop({ reflect: true }) stretch: boolean = false;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {
    return (
      <Host>
        {this.variant === 'banner' && <slot name="cbp-card-title" />}
        <div class="cbp-card-body">
          {this.variant !== 'banner' && <slot name="cbp-card-title" />}
          <slot />
        </div>
        <slot name="cbp-card-actions" />
      </Host>
    );
  }
}
