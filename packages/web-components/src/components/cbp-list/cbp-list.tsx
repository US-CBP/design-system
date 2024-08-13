import { Component, Host, Element, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-list',
  styleUrl: 'cbp-list.scss',
})
export class CbpList {
  @Element() host: HTMLElement;
  
  private renderedTag: HTMLElement;

  /** Specifies the variant of list (unstyled, icon, special) */
  @Prop() variant: 'unstyled' | 'link' | 'icon'; 
  
  /** Specifies the semantic tag to be rendered. */
  @Prop() tag: 'ul' | 'ol' = 'ul';

  /** Specifies the font size for the list */
  @Prop({ reflect: true }) size: 'normal' | 'large' = 'normal';

  /** Specifies an accessible label for the list as an `aria-label`, similar to a table `caption`. */
  @Prop() accessibilityText: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  

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
          <Tag 
            ref={(el) => this.renderedTag = el} 
            aria-label={this.accessibilityText}
          >
            <slot />
          </Tag>
        </Host>
      );
    }
    
    
  }