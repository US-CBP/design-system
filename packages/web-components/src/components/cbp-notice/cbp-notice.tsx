import { Component, Host, Element, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Notice component presents persistent information that gives extra insight into a particular content area.
 * 
 * @slot - The notice body content is placed in the default slot.
 * @slot cbp-notice-title - The notice title is placed in this named slot.
 */
@Component({
  tag: 'cbp-notice',
  styleUrl: 'cbp-notice.scss',
})
export class CbpNotice {

  @Element() private host: HTMLElement;

  /** Optionally specifies a notice color based on predefined design token values. Defaults to "info". */
  @Prop({ reflect: true }) color: 'info' | 'success' | 'warning' | 'danger' = 'info';
    
  /** 
   * Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified.
   */
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
      <Host >
        <slot name="cbp-notice-title" />
        <div>
          <slot />
        </div>
      </Host>
    );
  }
}
