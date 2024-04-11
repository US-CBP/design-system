import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - Content slotted in the default slot is rendered inside of the specified tag, if any.
 */
@Component({
  tag: 'cbp-section',
  styleUrl: 'cbp-section.scss'
})
export class CbpSection {

  @Element() host: HTMLElement;

  /** Specifies the tag to render. Use `section` with the `accessibilityText` property to make an accessible landmark element. */
  @Prop() tag: 'div' | 'section' | 'none' = 'none';
  /** Specifies an accessible label to make a `section` tag an accessible landmark element. Likely has no effect otherwise. */
  @Prop() accessibilityText: string;
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
    const Tag = this.tag;

    return (
      <Host>
        { this.tag != 'none' ?
          <Tag aria-label={this.accessibilityText}>
            <slot />
          </Tag>
        : <slot />
        }
      </Host>
    );
  }
}
