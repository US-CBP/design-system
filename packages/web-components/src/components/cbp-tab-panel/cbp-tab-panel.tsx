import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-tab-panel',
  styleUrl: 'cbp-tab-panel.scss'
})
export class CbpTabPanel {
  
  @Element() host: HTMLElement;

  /** An `ID`-conformant unique name of the tab-panel, applied as an `id` on this tab panel; This value should match the corresponding cbp-tab name and links the two together. */
  @Prop() name!: string;

  /** Specifies if this is the tab panel corresponding to the selected tab and currently visible. This property is managed by the parent cbp-tabs component and does not need to be set manually. */
  @Prop({ reflect: true }) selected: boolean;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, Object.assign({}, this.sx));
  }

  render() {
    return (
      <Host
        role="tabpanel"
        id={this.name}
        aria-labelledby={`${this.name}_tab`}
      >
        <slot />
      </Host>
    );
  }
}
