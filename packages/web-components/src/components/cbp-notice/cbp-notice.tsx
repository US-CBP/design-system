import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'cbp-notice',
  styleUrl: 'cbp-notice.scss',

})
export class CbpNotice {

  /** Optionally specifies a card color (different from the default color) based on predefined design token values. */
  @Prop({ reflect: true }) color: 'info' | 'success' | 'warning' | 'danger';
    
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
    
  render() {
    return (
      <Host>
        <div class='notice-container'>
          <slot name='cbp-notice-title'></slot>
            <div>
              <slot></slot>
            </div>
        </div>
      </Host>
    );
  }

}
