import { Component, Host, Element, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - Any controls or content may be slotted into the default slot and will be aligned to the right of the bar.
 * @slot cbp-action-bar-info - This named slot is intended for information placed before the default slot content, aligned to the left of the bar.
 */
@Component({
  tag: 'cbp-action-bar',
  styleUrl: 'cbp-action-bar.scss',
})
export class CbpActionBar {
  @Element() host: HTMLElement;

  /** Specifies whether the action bar is inline or floating. Defaults to inline. */
  @Prop({ reflect: true }) variant:  'inline' | 'floating' = 'inline'

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

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
        <slot name="cbp-action-bar-info" />
        <slot />
      </Host>
    );
  }
}
