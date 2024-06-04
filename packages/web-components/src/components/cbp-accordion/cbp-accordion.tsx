import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-accordion',
  styleUrl: 'cbp-accordion.scss',
})

/**
 * @slot - Accordion Items shall be slotted in the default slot. While other content may be included within the default slot, it is not recommended.
 */
export class CbpAccordion {
  private items: HTMLCbpAccordionItemElement[];

  @Element() host: HTMLElement;

  /** Specifies whether multiple accordion items can be open at the same time. Defaults to false. */
  @Prop() multiple: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  init() {
    this.items = Array.from(this.host.querySelectorAll('cbp-accordion-item'));
    this.items.forEach(item => {
      item.addEventListener('accordionItemClick', (e:any) => {
        this.accordionActionHandler(e);
      });
    });
  }

  accordionActionHandler({ detail: { host, open } }) {
    // if we're not allowing multiple items to remain open and one was just opened, then close the rest
    if (!this.multiple && open) {
      this.host.querySelectorAll('cbp-accordion-item').forEach((item: HTMLCbpAccordionItemElement) => {
        if (item !== host) {
          item.open = false;
        }
      });
    }
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
    this.init();
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
