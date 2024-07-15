import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - Content in the default slot to be conditionally hidden.
 */
@Component({
  tag: 'cbp-hide',
  styleUrl: 'cbp-hide.scss'
})
export class CbpHide {
  
  private hidden=false;

  @Element() host: HTMLElement;

  /** Specifies the host's display when visible. The default is `inline`, which is the default display of a custom element. */
  @Prop() display: string = 'inline';

  /** When set to true, the host is hidden. Allows for toggling via property binding rather than media query. */
  @Prop({reflect:true}) hide: boolean;
  /** When set to true, the host is visually hidden in an accessible manner. Allows for toggling via property binding rather than media query. */
  @Prop({reflect:true}) visuallyHide: boolean;

  /** Specifies a valid CSS media query (preferably using relative units), when met will hide the wrapped content using display: none. E.g., `max-width: 64em` */
  @Prop() hideAt: string;
  /** Specifies a valid CSS media query (preferably using relative units), when met will visually hide the wrapped content in a way that is it still accessible as a label. E.g., `max-width: 64em` */
  @Prop() visuallyHideAt: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the accordion item control is activated. */
  @Event({
    eventName: 'hideToggle',
    cancelable: true,
    bubbles: true,
  }) hideToggle: EventEmitter;

  // Callback functions for the media query event listeners
  doHideAt(mql) {
    if (mql.matches) {
      this.host.style.setProperty('display', 'none')
      this.hidden=true;
    }
    else {
      this.host.style.setProperty('display', this.display);
      this.hidden=false;
    }

    this.hideToggle.emit({
      host: this.host,
      hidden: this.hidden,
    });
  }

  doVisuallyHideAt(mql) {
    if (mql.matches) {
      this.host.classList.add('cbp-visually-hidden')
      this.hidden=true;
    }
    else {
      this.host.classList.remove('cbp-visually-hidden');
      this.hidden=false;
    }

    this.hideToggle.emit({
      host: this.host,
      hidden: this.hidden,
    });
  }


  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      'display': this.display,
      ...this.sx,
    });
  }

  componentDidLoad() {
    if (this.hideAt) {
      const hideAtMQ = window?.matchMedia(`(${this.hideAt})`);
      if (hideAtMQ) {
        hideAtMQ.addEventListener('change', mql => this.doHideAt(mql)); // Add an event listener to the media query
        this.doHideAt(hideAtMQ); // Run the breakpoint change handler once on load
      }
    }

    if (this.visuallyHideAt) {
      const visuallyHideAtMQ = window?.matchMedia(`(${this.visuallyHideAt})`);
      if (visuallyHideAtMQ) {
        visuallyHideAtMQ.addEventListener('change', mql => this.doVisuallyHideAt(mql)); // Add an event listener to the media query
        this.doVisuallyHideAt(visuallyHideAtMQ); // Run the breakpoint change handler once on load
      }

    }
  }

  render() {
    return (
      <Host>
        <slot/>
      </Host>
    );
  }

}
