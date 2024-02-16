import { Component, Element, Prop, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-tab',
  styleUrl: 'cbp-tab.scss'
})
export class CbpTab {
  
  private button: HTMLButtonElement;
  private parent: HTMLCbpTabsElement;

  @Element() host: HTMLElement;

  /** An `ID`-conformant unique name of the tab; This value should match the corresponding cbp-tab-panel name and links the two together. */
  @Prop() name!: string;

  /** Specifies whether this is the selected tab. Only one tab per tabset should be marked as selected.*/
  @Prop({ reflect: true }) selected: boolean;

  /** For tabs without a visible text label (e.g., icon tabs) or a label that is insufficiently unique/descriptive, you may provide accessibility text, which is rendered as an `aria-label` on the tab control (button element). */
  @Prop() accessibilityText: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** Emits an event when the tab has been fully loaded for registration with the parent tabset. */
  @Event() tabLoaded: EventEmitter;
  
  /** Emits a custom even containing an object that describes the tab that was activated. */
  @Event() tabClicked: EventEmitter;
  handleTabClick() {
    this.selected=true;
    this.tabClicked.emit({
      host: this.host,
      tab: this.button,
      name: this.name,
    });
  }

  componentWillLoad() {
    if (typeof this.sx == "string") {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, Object.assign({}, this.sx));
  
    // If the tab is marked selected on initial load, treat it as a tabClick and emit the event for the parent to act on.
    this.selected && this.handleTabClick();
  }

  componentDidLoad() {
    this.tabLoaded.emit({
      host: this.host,
      tab: this.button,
      parent: this.parent
    });
    console.log('Tab loaded:', this.host, this.tabLoaded);
  }

  render() {
    return (
      <Host>
        <button
          type="button"
          role="tab"
          id={`${this.name}_tab`}
          aria-label={this.accessibilityText}
          aria-selected={this.selected ? "true" : "false"}
          aria-controls={this.name}
          tabindex={this.selected ? 0 : -1} // is this safe?
          ref={(el) => this.button = el} 
          onClick={() => this.handleTabClick()}
      >
          <slot />
        </button>
      </Host>
    );
  }

}
