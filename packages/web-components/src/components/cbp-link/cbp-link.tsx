import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The cbp-link component is used to render an anchor or provide consistent styling for a slotted anchor.
 * 
 * @slot - the default slot represents the linked content, which may include markup, for the rendered anchor tag.
 * @slot cbp-link-custom - Custom anchors may be slotted via named-slot, which prevents the web component from rendering its own anchor tag.
 */

@Component({
  tag: 'cbp-link',
  styleUrl: 'cbp-link.scss',
})
export class CbpLink {
  private anchor: HTMLAnchorElement;

  @Element() host: HTMLElement;

  @Prop() href: string;
  @Prop() rel: string;
  @Prop() target: string;
  @Prop() download: boolean;
  //@Prop({ reflect: true }) variant: 'definition';

  @Prop() language: string;
  @Prop() shortcutKey: string;
  @Prop() accessibilityText: string;
  @Prop({ reflect: true }) disabled: boolean;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() linkClick!: EventEmitter;

  handleClick = () => {
    this.linkClick.emit({
      host: this.host,
      nativeElement: this.anchor,
      href: this.href,
    });
  };

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    // If the anchor was not defined by ref in the render lifecycle, query the DOM for one that may have been slotted and attach an event listener to it
    if (!this.anchor) {
      const slottedAnchor = (this.anchor = this.host.querySelector('a'));
      if (slottedAnchor) {
        this.anchor = slottedAnchor;
        this.anchor.addEventListener('click', this.handleClick);
      }
    }
  }

  render() {
    return (
      <Host>
        {this.host.querySelector('[slot=cbp-link-custom]') ? (
          <slot name="cbp-link-custom" />
        ) : (
          <a
            href={this.href}
            lang={this.language}
            target={this.target}
            download={this.download && this.href}
            rel={this.target == '_blank' ? ' noopener noreferrer' : ''}
            aria-label={this.accessibilityText}
            aria-disabled={this.disabled ? 'true' : false}
            role={this.disabled ? 'link' : null}
            accessKey={this.shortcutKey}
            onClick={() => this.handleClick()}
            ref={el => (this.anchor = el)}
          >
            <slot />
          </a>
        )}
      </Host>
    );
  }
}
