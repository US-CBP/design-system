import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

/**
 * @slot - Hidden/revealed content is placed in the default slot.
 * @slot cbp-expand-label - Optionally the component label/heading may be slotted via named slot if it contains markup rather than plain text.
 */
@Component({
  tag: 'cbp-expand',
  styleUrl: 'cbp-expand.scss'
})
export class CbpExpand {
  private control: HTMLElement;
  private button: HTMLButtonElement;

  @Element() host: HTMLElement;

  /**
   * Specifies an optional `id` for the component item heading, also used to generate an `id` for 
   * the content wrapper. If this property is not specified, a unique string will 
   * automatically be generated. 
   */
  @Prop() headingId: string = createNamespaceKey('cbp-expand');
  
  /** Specifies whether the content is expanded and visible. */
  @Prop({ reflect: true }) open: boolean;
  
  /** The component control label. */
  @Prop() label: string;

  /** The heading level of the accordion item control. Defaults to h3. */
  @Prop() headingLevel: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h4';
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the accordion item control is activated. */
  @Event() expandClick: EventEmitter;
  handleClick() {
    this.open = !this.open;
    this.expandClick.emit({
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
          class="cbp-expand--control"
          align-items="start"
          gap="var(--cbp-space-1x)"
          onClick={() => this.handleClick()}
        >
          <cbp-flex-item>
            <cbp-button
              type="button"
              class="cbp-expand--toggle"
              fill="ghost"
              color="secondary"
              width="var(--cbp-space-6x)"
              height="var(--cbp-space-6x)"
              controls={`${this.headingId}-content`}
              expanded={this.open}
              accessibilityText="Expand/collapse"
              aria-describedby={this.headingId}
              ref={el => (this.control = el)}
            >
              <cbp-icon name="caret-down" color="currentColor"></cbp-icon>
            </cbp-button>
          </cbp-flex-item>

          <cbp-flex-item id={this.headingId} flex-grow="1">
            { this.host.querySelector('[slot="cbp-expand-label"]')
              ? <slot name="cbp-expand-label" />
              : <cbp-typography 
                  tag={this.headingLevel} 
                  variant="heading-xs"
                  sx='{"line-height":"var(--cbp-space-6x)"}'
                >
                  {this.label}
                </cbp-typography>
            }
          </cbp-flex-item>
        </cbp-flex>

        <div id={`${this.headingId}-content`} class="cbp-expand--content">
          <slot />
        </div>
      </Host>

    );
  }

}
