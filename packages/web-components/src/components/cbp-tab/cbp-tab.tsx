import { Component, Element, Prop, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Tab component represents an individual tab control within a tab set.
 * 
 * @slot - The default slot holds the tab's label (rendered as a button label), which may include text as well as icons, badges, and tags.
 */
@Component({
  tag: 'cbp-tab',
  styleUrl: 'cbp-tab.scss'
})
export class CbpTab {
  
  private button: HTMLButtonElement;
  private parent: HTMLCbpTabsElement;

  @Element() private host: HTMLElement;

  /** An `ID`-conformant unique name of the tab; This value should match the corresponding cbp-tab-panel name and links the two together. */
  @Prop() name!: string;

  /** Specifies whether this is the selected tab. Only one tab per tabset should be marked as selected.*/
  @Prop({ reflect: true }) selected: boolean;

  /** An optional color variant. */
  @Prop({ reflect: true }) color: 'danger';

  /** For tabs without a visible text label (e.g., icon tabs) or a label that is insufficiently unique/descriptive, you may provide accessibility text, which is rendered as an `aria-label` on the tab control (button element). */
  @Prop() accessibilityText: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** Emits an event when the tab has been fully loaded for registration with the parent tabset. */
  @Event() tabLoaded: EventEmitter;
  
  /** Emits a custom even containing an object that describes the tab that was activated. */
  @Event() tabClicked: EventEmitter;
  handleTabClick(e=undefined) {
    this.selected=true;
    this.tabClicked.emit({
      host: this.host,
      tab: this.button,
      name: this.name,
      nativeEvent: e
    });
  }

  componentWillLoad() {
    if (typeof this.sx == "string") {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  
    // If the tab is marked selected on initial load, treat it as a tabClick and emit the event for the parent to act on.
    this.selected && this.handleTabClick();
  }

  componentDidLoad() {
    this.tabLoaded.emit({
      host: this.host,
      tab: this.button,
      parent: this.parent
    });
  }

  render() {
    return (
      <Host role="presentation">
        <button
          type="button"
          role="tab"
          id={`${this.name}_tab`}
          aria-label={this.accessibilityText}
          aria-selected={this.selected ? "true" : "false"}
          aria-controls={this.name}
          tabindex={this.selected ? 0 : -1} // is this safe?
          ref={(el) => this.button = el} 
          onClick={e => this.handleTabClick(e)}
      >
          <slot />
        </button>
      </Host>
    );
  }
}
