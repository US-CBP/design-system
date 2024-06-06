import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-panel',
  styleUrl: 'cbp-panel.scss'
})
export class CbpPanel {

  @Element() host: HTMLElement;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }


  render() {
    return (
      <Host>
        <div class="cbp-panel__header">
          <slot name="cbp-panel-header" />
        </div>
        <div class="cbp-panel__content">
          <slot />
        </div>
      </Host>
    );
  }

}
