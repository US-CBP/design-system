import { Component, Host, Prop, Element, h } from '@stencil/core';

@Component({
  tag: 'cbp-list-item',
  styleUrl: 'cbp-list-item.scss',
})
export class CbpListItem {
    @Element() host: HTMLElement;
    
    /** Supports adding inline styles as an object */
    @Prop() sx: any = {};

    /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
    @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
    //todo: need to figure out how to handle sub-list/nested lists
  render() {
    return (
      <Host>
        <li>
          <slot />
        </li>
      </Host>
    );
  }

}
