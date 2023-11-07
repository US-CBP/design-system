import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-icon',
  styleUrl: 'cbp-icon.scss',
})
export class CbpIcon {
  
  private svgUse;

  @Element() host: HTMLElement;

  // Temp for testing - will delete
  @Prop() use: string;
  
  /** Specifies which icon to use from the built-in set of icons. */
  @Prop({ reflect: true }) name?: string;
  /** Specifies the exact `src` of an SVG file to use. */
  @Prop() src?: string;

  @Prop() size: string;
  @Prop() color: string = "currentColor";

  @Prop() accessibilityText: string;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
      "--cbp-icon-color": this.color,
      //"--cbp-icon-size": this.size ? this.size : '1em',
    });
  }

  componentWillRender() {
    if(this.use) {
      this.svgUse = `
        <svg viewBox="0 0 100 100" ${!this.accessibilityText ? 'role="decorative"' : ''}>
          <title>${this.accessibilityText}</title>
          <use href="#${this.use}"></use>
        </svg>`;
    }
  }

  render() {
    return (
      <Host innerHTML={this.svgUse}>
        <slot />
      </Host>
    );
  }

}
