import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-section',
  styleUrl: 'cbp-section.scss'
})
export class CbpSection {

  @Element() host: HTMLElement;

  @Prop() tag: 'div' | 'section' | 'none' = 'none';
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
