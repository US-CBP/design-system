import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-typography',
  styleUrl: 'cbp-typography.scss'
})
export class CbpTypography {
  @Element() host: HTMLElement;

  @Prop() variant: 'masthead-1' | 'masthead-2' | 'xxl' | 'xl' | 'l' | 'md' | 'sm' | 'xs';
  @Prop() divider: 'text' | 'fill';
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
