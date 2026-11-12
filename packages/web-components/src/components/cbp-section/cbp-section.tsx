import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';
import { SECTION_TAGS, SectionTags } from '../../utils/interface';

/**
 * The Section component represents a generic block that may be used for semantic meaning or as 
 * a generic container for styling.
 * 
 * @slot - Content slotted in the default slot is rendered inside of the specified tag, if any.
 */
@Component({
  tag: 'cbp-section',
  styleUrl: 'cbp-section.scss'
})
export class CbpSection {

  @Element() private host: HTMLElement;

  /** Specifies the tag to render. Use `section` with the `accessibilityText` property to make an accessible landmark element. */
  @Prop() tag: SectionTags = 'none';

  /** Specifies an accessible label as `aria-label` to make a `section` tag an accessible landmark element. Likely has no effect otherwise. */
  @Prop() accessibilityText: string;
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  private isSectionTag(value: string): value is SectionTags {
    return SECTION_TAGS.some(tag => tag === value);
  }

  componentWillLoad() {
    if(typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {
    if(!this.isSectionTag(this.tag)) {
      console.warn(`cbp-section - Invalid tag value "${this.tag}" for cbp-section. Valid values are: ${SECTION_TAGS.join(', ')}`);
      return void(0);
    }

    const Tag = this.tag;
    return (
      <Host>
        { this.isSectionTag(this.tag) && this.tag != 'none' ?
          <Tag aria-label={this.accessibilityText}>
            <slot />
          </Tag>
        : <slot />
        }
      </Host>
    );
  }
}
