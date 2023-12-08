import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-grid',
  styleUrl: 'cbp-grid.scss',
})
export class CbpGrid {
  @Element() host: HTMLElement;

  @Prop({ reflect: true }) display: 'grid' | 'inline-grid' = 'grid';

  @Prop() gridTemplateAreas: string;
  @Prop() gridTemplateColumns: 'none' | string;
  @Prop() gridTemplateRows: 'none' | string;

  @Prop() gridAutoFlow: 'row' | 'column';
  @Prop() gridAutoColumns: string;
  @Prop() gridAutoRows: string;

  @Prop() alignContent: string;
  @Prop() justifyContent: string;

  @Prop() alignItems: string;
  @Prop() justifyItems: string;

  @Prop() gap: string;
  @Prop() breakpoint: string;

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
      'grid-template-areas': this.gridTemplateAreas,
      'grid-template-columns': this.gridTemplateColumns,
      'grid-template-rows': this.gridTemplateRows,
      'grid-auto-flow': this.gridAutoFlow,
      'grid-auto-columns': this.gridAutoColumns,
      'grid-auto-rows': this.gridAutoRows,
      'align-content': this.alignContent,
      'justify-content': this.justifyContent,
      'align-items': this.alignItems,
      'justify-items': this.justifyItems,
      'grid-gap': this.gap,
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
