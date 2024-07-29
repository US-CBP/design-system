import { Component, Host, Element, Prop, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-list',
  styleUrl: 'cbp-list.scss',
})
export class CbpList {
  @Element() host: HTMLElement;
  
  private renderedTag: HTMLElement;
  
  /** Specifies optional variants with difference from the default card. */
  @Prop({ reflect: true }) variant: 'unordered' | 'ordered' | 'descriptive';

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
    
    var Tag;
    switch (this,this.variant){
      case 'ordered':
        Tag = 'ol';
        break;
      case 'descriptive':
        Tag= 'dl';
        break;
      default: //unordered
        Tag = 'ul'
        break;
    }
    
    return (
      <Host>
        <Tag ref={(el) => this.renderedTag = el}>
          <slot />
        </Tag>
      </Host>
    );
    
  }

}
