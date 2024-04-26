import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';


/**
 * @slot - Accordion Item content is placed in the default slot.
 * @slot cbp-accordion-label - Optionally, an Accordion Item heading with markup may be placed in this slot rather than via the labal property.
 */
@Component({
  tag: 'cbp-accordion-item',
  styleUrl: 'cbp-accordion-item.scss',
})
export class CbpAccordionItem {
  private control: HTMLElement;
  private button: HTMLButtonElement;

  @Element() host: HTMLElement;

  @Prop() headingId: string = createNamespaceKey('cbp-accordion-item');
  @Prop({ reflect: true }) open: boolean;
  @Prop() label: string;
  @Prop() headingLevel: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() accordionItemClick: EventEmitter;

  handleClick() {
    this.open = !this.open;
    this.accordionItemClick.emit({
      host: this.host,
      button: this.button,
      open: this.open,
    });
    this.button.focus();
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    this.button = this.control.querySelector('button');
  }

  render() {
    return (
      <Host>
        <cbp-flex
          class="cbp-accordion-item--control"
          align-items="center"
          onClick={() => this.handleClick()}
        >
          <cbp-flex-item>
            <cbp-button
              type="button"
              class="cbp-accordion-item--toggle"
              fill="ghost"
              color="secondary"
              controls={`${this.headingId}-content`}
              expanded={this.open}
              accessibilityText="Toggle Accordion Item"
              aria-describedby={this.headingId}
              ref={el => (this.control = el)}
            >
              <cbp-icon name="chevron-right" color="currentColor" class="hydrated"></cbp-icon>
            </cbp-button>
          </cbp-flex-item>

          <cbp-flex-item id={this.headingId} flex-grow="1">
            { this.host.querySelector('[slot="cbp-accordion-label"]')
              ? <slot name="cbp-accordion-label" />
              : this.label
            }
          </cbp-flex-item>
        </cbp-flex>

        <div id={`${this.headingId}-content`} class="cbp-accordion-item--content">
          <slot />
        </div>
      </Host>
    );
  }
}
