import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-flex',
  styleUrl: 'cbp-flex.scss',
})
export class CbpFlex {
  @Element() host: HTMLElement;

  @Prop({ reflect: true }) display: 'flex' | 'inline-flex' = 'flex';
  @Prop() wrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  @Prop() direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
  @Prop() alignItems: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' = 'stretch';
  @Prop() alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch' = 'stretch';
  @Prop() justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
  @Prop() gap: string;
  @Prop() breakpoint: string;
  @Prop() contentBreakpoint: string;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  // Callback function for the media query event listener
  handleBreakpointChange(mql) {
    mql.matches ? this.host.style.setProperty('display', 'block') : this.host.style.setProperty('display', this.display);
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      'display': this.display,
      'flex-wrap': this.wrap,
      'flex-direction': this.direction,
      'align-items': this.alignItems,
      'align-content': this.alignContent,
      'justify-content': this.justifyContent,
      'gap': this.gap,
      ...this.sx,
    });
  }

  componentDidLoad() {
    if (this.breakpoint) {
      const mediaQueryList = window?.matchMedia(`(max-width: ${this.breakpoint})`);
      if (mediaQueryList) {
        mediaQueryList.addEventListener('change', mql => this.handleBreakpointChange(mql)); // Add an event listener to the media query
        this.handleBreakpointChange(mediaQueryList); // Run the breakpoint change handler once on load
      }
    }
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
