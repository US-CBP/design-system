import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Tag component is a non-interactive visual treatment for text, typically representing labels, keywords, or search terms.
 * 
 * @slot - The tag label or content is placed in the default slot.
 */
@Component({
  tag: 'cbp-tag',
  styleUrl: 'cbp-tag.scss'
})
export class CbpTag {

  @Element() private host: HTMLElement;

  /** Specifies a tag color variant. Default does not need to be specified. */
  @Prop({ reflect: true }) color: 'default' | 'danger' | 'success' | 'warning';

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
        <slot />
      </Host>
    );
  }
}
