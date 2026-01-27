import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/** 
 * The Grid component invokes a CSS Grid context, acting as the grid parent and implementing 
 * CSS Grid as a component API. Immediate child nodes are automatically considered grid items.
 * 
 * @slot - The default slot accepts grid items. These should be `cbp-grid-item` components or DOM nodes; inserting plain text nodes as a direct descendant of the grid may yield unexpected results. 
 */
@Component({
  tag: 'cbp-grid',
  styleUrl: 'cbp-grid.scss',
})
export class CbpGrid {

  @Element() private host: HTMLElement;

  /** Specifies the grid display. Defaults to "grid". */
  @Prop({ reflect: true }) display: 'grid' | 'inline-grid' = 'grid';

  /** Defines the grid via named grid areas (providing a visualization of the structure of the grid), which are not associated with any particular grid item, but can be referenced from the grid-placement properties. */
  @Prop() gridTemplateAreas: string;

  /** Specifies the track sizing functions (and optionally line names) of the grid columns as a space-separated track list. */
  @Prop() gridTemplateColumns: 'none' | string;
  
  /** Specifies the track sizing functions (and optionally line names) of the grid rows as a space-separated track list. */
  @Prop() gridTemplateRows: 'none' | string;

  /** Specifies how auto-placed items get flowed into the grid. */
  @Prop() gridAutoFlow: 'row' | 'column' | 'row dense' | 'column dense';
  
  /** Specifies the size (in CSS units) of implicitly-created columns using the auto-placement algorithm. */
  @Prop() gridAutoColumns: string;
  
  /** Specifies the size (in CSS units) of implicitly-created rows using the auto-placement algorithm. */
  @Prop() gridAutoRows: string;

  /** Aligns grid items in the vertical/column axis, perpendicular to the inline axis.  */
  @Prop() alignItems: 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'baseline' | 'first baseline' | 'last baseline';
  
  /** Justifies grid content horizontally, along the inline/row axis. */
  @Prop() justifyItems: 'legacy' | 'normal' | 'stretch' | 'center' | 'safe center' | 'unsafe center' | 'start' | 'end' | 'self-start' | 'self-end' | 'left' | 'right' | 'baseline' | 'first baseline' | 'last baseline';

  /** Aligns grid content vertically when total grid size is smaller than container. */
  @Prop() alignContent: 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'space-around' | 'space-between' | 'space-evenly' | 'safe center' | 'unsafe center';
  
  /** Justifies grid content horizontally when total grid size is smaller than container. */
  @Prop() justifyContent: 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'left' | 'right' | 'space-around' | 'space-between' | 'space-evenly' | 'safe center' | 'unsafe center';
  
  /** Specifies the spacing between grid items in the form of a single value or space-separated row-gap and column-gap values (in CSS units). */
  @Prop() gap: string;
  
  /** The size (in CSS units; preferably relative units such as `rem`) below which the grid items linearize. */
  @Prop() breakpoint: string;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  // Callback function for the media query event listener
  handleBreakpointChange(mql) {
    mql.matches ? this.host.classList.add('cbp-grid-linearized') : this.host.classList.remove('cbp-grid-linearized');
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
      '--cbp-grid-linearized-margin': this.gap != undefined ? this.gap.split(' ')?.[0] : undefined,
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
