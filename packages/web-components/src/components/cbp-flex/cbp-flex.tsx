import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Flex component invokes a CSS Flexbox context, acting as the flex parent and implementing 
 * CSS Flexbox as a component API. Immediate child nodes are automatically considered flex items.
 * 
 * @slot - DOM nodes placed in the default slot automatically become flex children. The use of `cbp-flex-item` is only required for granular control of individual flex item properties.
 */
@Component({
  tag: 'cbp-flex',
  styleUrl: 'cbp-flex.scss',
})
export class CbpFlex {
  @Element() host: HTMLElement;

  /** Specifies the display mode. Defaults to "flex" */
  @Prop({ reflect: true }) display: 'flex' | 'inline-flex' = 'flex';
  
  /** Specifies the wrapping behavior of the flex children. Browser default behavior is "nowrap". */
  @Prop() wrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  
  /** Specifies how flex items are placed in the flex container by setting the direction of the flex container’s main axis. Defaults to "row" for a horizontal flex context. */
  @Prop() direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
  
  /** Specifies the alignment for all of the flex container’s items along the cross-axis. Defaults to "stretch". */
  @Prop() alignItems: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' = 'stretch';
  
  /** Specifies the alignment of a flex container's items within the flex container (only when there is extra space in the cross-axis). */
  @Prop() alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch' = 'stretch';
  
  /** Specifies the alignment of flex items along the main axis (of the current line) of the flex container. */
  @Prop() justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
  
  /** Specifies the gap between items in CSS units (preferably relative units such as rem). Accepts a single value for horizontal and vertical gap or two values representing column gap and row gap, respectively. */
  @Prop() gap: string;

  /** Specifies the size at which the flex children are linearized, specified in CSS units (preferably relative units such as rem). */
  @Prop() breakpoint: string;

  /** Not yet implemented */
  @Prop() contentBreakpoint: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  // Callback function for the media query event listener
  handleBreakpointChange(mql) {
    mql.matches ? this.host.classList.add('cbp-flex-linearized') : this.host.classList.remove('cbp-flex-linearized');
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
      '--cbp-flex-linearized-margin': this.gap != undefined ? this.gap.split(' ')?.[0] : undefined,
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
