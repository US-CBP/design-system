import { Component, Host, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'cbp-list',
  styleUrl: 'cbp-list.scss',
})
export class CbpList {
  @Element() host: HTMLElement;
  
  /** Specifies optional variants with difference from the default card. */
  @Prop({ reflect: true }) variant: 'unstyled' | 'bullet';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  render() {
    return (
      <Host>
        <ul>
          <slot />
        </ul>
      </Host>
    );
  }

}
