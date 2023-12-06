import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-typography',
  styleUrl: 'cbp-typography.scss',
})
export class CbpTypography {

  private renderedTag: HTMLElement;

  @Element() host: HTMLElement;

  @Prop() tag!: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'code' | 'pre' | 'div' | 'span' ;
  @Prop({ reflect: true }) variant: 'masthead-1' | 'masthead-2' | 'heading-xxl' | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'heading-xs' | 'body-text' | 'subhead';
  @Prop({ reflect: true }) divider: 'underline' | 'fill';
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
      //console.log('sx=',this.sx);
    }
    setCSSProps(this.renderedTag, {
      ...this.sx
    });
  }

  render() {
    const Tag = this.tag;
    return (
      <Host>
        <Tag ref={(el) => this.renderedTag = el}>
          <slot />
        </Tag>
      </Host>
    );
  }
}
