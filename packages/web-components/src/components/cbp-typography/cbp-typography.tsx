import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-typography',
  styleUrl: 'cbp-typography.scss',
})
export class CbpTypography {

  private renderedTag: HTMLElement;

  @Element() host: HTMLElement;

  /** Specifies the semantic tag to be rendered. */
  @Prop() tag!: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'code' | 'pre' | 'div' | 'span' ;
  
  /** Specifies the visual style of the text regardless of the semantic tag. */
  @Prop({ reflect: true }) variant: 'masthead-1' | 'masthead-2' | 'heading-xxl' | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'heading-xs' | 'body-text' | 'subhead';

  /** Specifies whether the text contains visual treatments that act as a divider. */
  @Prop({ reflect: true }) divider: 'underline' | 'fill';

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentDidLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
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
