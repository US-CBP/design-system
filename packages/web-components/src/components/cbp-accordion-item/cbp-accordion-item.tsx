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

  /**
   * Specifies an optional `id` for the accordion item heading, also used to generate an `id` for 
   * the accordion item content wrapper. If this property is not specified, a unique string will 
   * automatically be generated. 
   */
  @Prop() headingId: string = createNamespaceKey('cbp-accordion-item');
  
  /** Specifies whether the accordion is open. */
  @Prop({ reflect: true }) open: boolean;
  
  /** The accordion control label. */
  @Prop() label: string;

  /** The heading level of the accordion item control. Defaults to h3. */
  @Prop() headingLevel: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3';
  
  /** Specifies an optional color variant of the accordion item. */
  @Prop({reflect:true}) color: 'danger';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** A custom event emitted when the accordion item control is activated. */
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
              <cbp-icon name="chevron-right"></cbp-icon>
            </cbp-button>
          </cbp-flex-item>

          <cbp-flex-item id={this.headingId} flex-grow="1">
            { this.host.querySelector('[slot="cbp-accordion-label"]')
              ? <slot name="cbp-accordion-label" />
              : <cbp-typography tag={this.headingLevel} variant="heading-sm">{this.label}</cbp-typography>
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
