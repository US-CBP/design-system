import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - The default slot accepts custom link text, which is only needed if multiple skip links are present. Otherwise, it is advised to use the default "Skip to main content", which has been validated for clarity and pronunciation.
 */
@Component({
  tag: 'cbp-skip-nav',
  styleUrl: 'cbp-skip-nav.scss'
})
export class CbpSkipNav {

  private link: HTMLAnchorElement;

  @Element() host: HTMLElement;

  /** Specifies the target `id` where focus is sent when the "skip nav" link is activated. Defaults to "main". */
  @Prop() targetId: string = "main";

  /** Specifies a shortcut key, which is applied as an `accessKey` attribute. */
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
