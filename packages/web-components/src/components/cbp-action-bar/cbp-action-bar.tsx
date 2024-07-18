import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'cbp-action-bar',
  styleUrl: 'cbp-action-bar.scss',
})
export class CbpActionBar {

  /** variant for type: sticky/inline */
  @Prop({ reflect: true }) variant: 'inline' | 'sticky'

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  render() {
    return (
      <Host variant={this.variant}>
        <slot name="cbp-action-bar-info" />
        <slot />
      </Host>
    );
  }

}
