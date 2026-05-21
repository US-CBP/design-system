import { Component, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Typography component encapsulates predefined styles for different kinds of text that makes 
 * up a website, merging design language with CSS and HTML implementations.
 * 
 * @slot - The content provided in the default slot is wrapped within the specified HTML tag.
 */
@Component({
  tag: 'cbp-typography',
  styleUrl: 'cbp-typography.scss',
})
export class CbpTypography {

  private renderedTag: HTMLElement;

  /** Specifies the semantic tag to be rendered. */
  @Prop() tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'code' | 'pre' | 'div' | 'span' = "span";
  
  /** Specifies the visual style of the text regardless of the semantic tag. */
  @Prop({ reflect: true }) variant: 'heading-xxl' | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'heading-xs' | 'body-text' | 'subhead' | 'heading-dialog';

  /** Specifies the visual size of a the text which will set the font-size */
  @Prop({ reflect: true }) size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';

  /** Specifies the line-height of a the text */
  @Prop({ reflect: true }) lineHeight: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18';

  /** Specifies the font-weight of a the text */
  @Prop({ reflect: true }) fontWeight: 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'black' ;

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
