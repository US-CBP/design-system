import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-table',
  styleUrl: 'cbp-table.scss',
})
export class CbpTable {

  private caption: HTMLTableCaptionElement;

  @Element() host: HTMLElement;

  @Prop({ reflect: true }) striped: "odd" | "even";
  @Prop({ reflect: true }) sortable: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};



  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, Object.assign({}, this.sx));
  }

  componentDidLoad() {
    this.caption = this.host.querySelector('caption');
    if (!this.caption) console.warn(`cbp-table: A caption tag is required for accessibility. If you don't want a visible caption, add a 'hidden' attribute to it.`);
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
