import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-skip-nav',
  styleUrl: 'cbp-skip-nav.scss'
})
export class CbpSkipNav {

  private link: HTMLAnchorElement;

  @Element() host: HTMLElement;

  @Prop() targetId: string = "main";
  @Prop() shortcutKey: string;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    const target = document.querySelector(`#${this.targetId}`);
    if (!target) console.warn(`Configuration Error (cbp-skip-nav): The specified targetId of "${this.targetId}" cannot be found in the current page.`);

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.link, {
      ...this.sx,
    });
  }

  render() {
    return (
      <Host>
        <a 
          href={this.targetId ? `#${this.targetId}` : null}
          accessKey={this.shortcutKey}
          ref={(el) => this.link = el} 
        >
          <slot>Skip to main content</slot>
        </a>
      </Host>
    );
  }

}
