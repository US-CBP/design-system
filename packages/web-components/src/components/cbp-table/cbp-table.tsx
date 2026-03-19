import { Component, Prop, State, Element, Event, EventEmitter, Method, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

/**
 * The Table component is a wrapper component encapsulating design system styles for semantic HTML 
 * tables as well as applying progressive enhancements to the contained table.
 * 
 * @slot - The semantic table HTML is placed within the default slot.
 * @slot cbp-table-live-toolbar - Any sort of filters or table controls may be slotted within this named slot.
 * @slot cbp-table-live-region - For complex tables with many controls and/or pagination, the state of the data may be quantified and described accessibly via an `aria-live` region, which is hidden from view. E.g., Filtered by the term "test", ordered by Column 1 ascending, displaying records 100-200 of 1234.
 */
@Component({
  tag: 'cbp-table',
  styleUrl: 'cbp-table.scss',
})
export class CbpTable {

  private table: HTMLTableElement;
  private columnHeadings: HTMLTableCellElement[];
  private sortableColumns: HTMLTableCellElement[] = [];
  private wrapper: HTMLElement;

  private tableWidth;
  private tableBreakpoint;

  private liveRegionId=createNamespaceKey('cbp-table-live-region');


  @Element() private host: HTMLElement;

  /** Specifies whether the table is striped, designating whether the colored rows are the odd or even rows (CBP DS standard is even when used). */
  @Prop({ reflect: true }) striped: 'odd' | 'even';

  /** Specifies whether the mouse cursor highlights the table row or cell on hover. Defaults to "row". */
  @Prop({ reflect: true }) hover: 'row' | 'cell' = 'row';

  /** Specifies whether a hover effect is applied to columns when the column header is hovered. This feature is opt-in. */
  @Prop({ reflect: true }) columnHover: boolean;
  
  /** Specifies whether the table is striped, designating whether the colored rows are the odd or even rows (CBP DS standard is even when used). */
  @Prop() overflow: 'scroll' | 'linearize' = 'scroll';

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  @State() private sort: {
    columnHeading: HTMLTableCellElement, 
    direction: string
  }

  /** An event emitted when the table is sorted via user interaction activating a table header control. */
  @Event() tableSort: EventEmitter;

  private addScope() {
    const columnHeadings = Array.from(this.host.querySelectorAll('thead th'));
    const rowHeadings = Array.from(this.host.querySelectorAll('tbody th'));

    columnHeadings.forEach( item => {
      item.setAttribute('scope','col');
    });

    rowHeadings.forEach( item => {
      item.setAttribute('scope','row');
    });
  }

  // TechDebt: how to make this reactive?
  private addHeaderDataAttrs() {
    //const columnHeadings: HTMLElement[] = Array.from(this.host.querySelectorAll('thead th'));
    //const tableCells: HTMLTableCellElement[] = Array.from(this.table?.querySelectorAll('tbody th,tbody td'));
    const tableBodyRows: HTMLTableRowElement[] = Array.from(this.table?.querySelectorAll('tbody tr'));
    
    // loop over each body row, adding header data to each cell
    tableBodyRows.forEach( ( row ) => {
      const tableRowCells: HTMLTableCellElement[] = Array.from(row?.querySelectorAll('th,td'));
      // We can only add the heading data if the number of headings match the number of cells per row
      if (this.columnHeadings.length == tableRowCells.length) {
        tableRowCells.forEach( ( cell, index ) => {
          if(!!this.columnHeadings[index]?.textContent.trim()){
            cell.setAttribute('data-column-header', `${this.columnHeadings[index].textContent.trim()}: `);
          }
        });
      }
    });
  }


  private makeSortable() {
    //this.columnHeadings = Array.from(this.host.querySelectorAll('thead th'));
    
    this.columnHeadings.forEach( item => {
      const control = item.querySelector('cbp-button');
      if(control) {
        this.sortableColumns = [...this.sortableColumns, item];
        
        // Update the icon for any initial sort
        const icon = control.querySelector('button cbp-icon') as HTMLCbpIconElement;
        
        if (item.getAttribute('aria-sort') == "ascending") icon.rotate = 270;
        if (item.getAttribute('aria-sort') == "descending") icon.rotate = 90;
        // Set aria-sort to none last
        if (!item.getAttribute('aria-sort')) {
          item.setAttribute("aria-sort","none");
          icon.setAttribute('hidden','');
          control.pressed="false";
        }
        else {
          icon.name="arrow-right";
          control.pressed="true";
        }

        control.addEventListener( "buttonClick", e => {
          this.doSort(this.columnHeadings.indexOf(item), e);
        });
      }
    });

    // Set initial sort state
    const sortedColumn: HTMLTableCellElement = this.host.querySelector('th[aria-sort]');
    if (sortedColumn) {
      this.sort = {
        columnHeading: sortedColumn,
        direction: sortedColumn.getAttribute('aria-sort')
      }
    }
  }

  /** 
   * Updates the UI statefullness (`aria-pressed`, `aria-sort`, and visual arrow icon) and 
   * emits a custom event to hook up to application logic for the actual sorting 
   */
  @Method()
  async doSort(column: number, e=undefined) {
    const ColumnHeading: HTMLTableCellElement = this.columnHeadings[column];
    const CbpButton = ColumnHeading.querySelector('cbp-button') as HTMLCbpButtonElement ;
    const Icon = ColumnHeading.querySelector('button cbp-icon') as HTMLCbpIconElement;
    let direction = "ascending";

    // Manage statefulness of the sorted column vs the others (add/remove sort attrs and pressed state)
    if (ColumnHeading == this.sort.columnHeading) {
      // If the current sort column is the same as the previously sorted column, just toggle the direction
      ColumnHeading.getAttribute('aria-sort') == "ascending" 
        ? direction = "descending"
        : direction = "ascending";
    }
    else {
      // If a new header was pressed, reset the previous sort state
      this.sort.columnHeading.setAttribute('aria-sort','none');
      this.sort.columnHeading.querySelector('cbp-button').pressed="false";
      (this.sort.columnHeading.querySelector('button cbp-icon') as HTMLCbpIconElement).name=undefined;
      (this.sort.columnHeading.querySelector('button cbp-icon')).setAttribute('hidden','');
  
      // Set the new sort state
      CbpButton.pressed="true";
    }
    // Update the statefulness of the sorted header
    Icon.removeAttribute('hidden');
    Icon.rotate = (direction == 'descending') ? 90 : 270;
    Icon.name="arrow-right";
    ColumnHeading.setAttribute('aria-sort', direction);

    // Update the sort state
    let newSort = {
      columnHeading: ColumnHeading, 
      direction: direction
    }
    this.sort=newSort;

    // Emit an event for the app logic to handle the actual sorting of data
    this.tableSort.emit({
      host: this.host,
      column: column, 
      name: ColumnHeading.textContent.trim(),
      direction: direction,
      nativeEvent: e
    })
  }


  // TechDebt: linearized starting at small size doesn't work to expand at larger size.
  // Called by the resize observer; also fires on initial render.
  private handleResize(width) {
    // Get the width of the content (and update the this.tableWidth) before doing responsive adjustments. (tables reflow, so we need to get this each comparison)
    this.tableWidth = this.table.getBoundingClientRect().width;
    
    // If the emitted size is less than the current mode's width, do responsive behavior (use a +5 different to account for table-reflow anomalies)
    if (width + 5 < this.tableWidth) {
      this.host.classList.add(`cbp-table-${this.overflow}`);
    }
    // Return to full view (potentially)
    else if(this.overflow=='linearize') {
      // For linearization, update the table breakpoint to the closest possible value (could vary slightly each time based on debouncing)
      if( (this.tableBreakpoint == undefined || width < this.tableBreakpoint) && !this.host.classList.contains(`cbp-table-${this.overflow}`)) {
        this.tableBreakpoint = width;
      }
      // Only remove responsive mode if the width is larger than the breakpoint, or else it removing linearization will bounce between states
      if(width >= this.tableBreakpoint) {
        this.host.classList.remove(`cbp-table-${this.overflow}`);
      }
    }
    else {
      this.host.classList.remove(`cbp-table-${this.overflow}`);
    }
  }

  // Do horizontal scroll via the button controls (recalculates every time in case something has changed such as scrolling or resize)
  private doHorizontalScroll(dir) {
    let columns: Object[] = [];
    const wrapperWidth = this.wrapper.getBoundingClientRect().width;
    const wrapperScrollWidth = this.wrapper.scrollWidth;
    const wrapperScroll = this.wrapper.scrollLeft;
    const wrapperLeftBoundary = wrapperScroll;
    const wrapperRightBoundary = wrapperWidth + wrapperScroll;
    let firstVisible: number;
    let lastVisible: number;

    // Loop over the column headings and get their positions
    this.columnHeadings.forEach( (item, index) => {
      const width = item.getBoundingClientRect().width;
      const left = item.offsetLeft - this.wrapper.offsetLeft;
      const right = item.offsetLeft - this.wrapper.offsetLeft + width;
      let visible = ( left < wrapperLeftBoundary || right > wrapperRightBoundary) ? false : true; // Check if the column heading is fully visible
      // Set the first and last visible items in the collection (by index)
      if (visible) {
        firstVisible == undefined ? firstVisible = index : null;
        lastVisible = index;
      }
      columns = [...columns, { 'header': item, 'visible': visible, 'width': width, 'left': left, 'right': right }];
    });

    // The amount of scrolling is relative to the ratio of the scroll size and visible width of the wrapper
    if(dir==1) {
      this.wrapper.scrollLeft = ( (columns?.[lastVisible+1]?.['right'] || wrapperScrollWidth) - wrapperWidth);
    }
    else {
      this.wrapper.scrollLeft = columns?.[firstVisible-1]?.['left'] || 0;
    }
  }

  private handleSlotChange(e) {
    console.log('cbp-table contents changed: ', e);
  }


  componentWillLoad() {
    this.table = this.host.querySelector('table');
    this.columnHeadings=Array.from(this.table?.querySelectorAll('thead th'));

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    this.addScope();
    this.makeSortable();
    if(this.overflow == 'linearize') this.addHeaderDataAttrs();

    // Hook up live regions and associate to the table, if they exist
    // TechDebt: needs testing and also should be more reactive - this component has no insight into slotted content changes right now
    const liveRegions = Array.from(this.host.querySelectorAll('[slot=cbp-table-live-region]'))
    if (liveRegions) {
      liveRegions.forEach( (item) => {
        item.setAttribute('aria-live','polite');
      });
      this.table.setAttribute('aria-describedby',this.liveRegionId);
    }
  }

  render() {
    return (
      <Host>
        <div class="cbp-table-toolbar">
          <slot name="cbp-table-toolbar" />
          { this.overflow == 'scroll' &&
            <div class="cbp-table-toolbar-scroll">
              <cbp-button
                color="secondary"
                fill="outline"
                variant="square"
                accessibilityText="View table columns to the left"
                context={this.context}
                onClick={ () => this.doHorizontalScroll('-1')}
              >
                <cbp-icon name="chevron-right" size="var(--cbp-space-5x)" rotate={180}></cbp-icon>
              </cbp-button>
              <cbp-button
                color="secondary"
                fill="outline"
                variant="square"
                accessibilityText="View table columns to the right"
                context={this.context}
                onClick={ () => this.doHorizontalScroll('1')}
              >
                <cbp-icon name="chevron-right" size="var(--cbp-space-5x)"></cbp-icon>
              </cbp-button>
            </div>
          }
        </div>
        
        <div hidden 
          id={this.liveRegionId}
        >
          <slot name="cbp-table-live-region" />
        </div>

        <div 
          class="cbp-table-wrapper"
          ref={ el => this.wrapper = el}
        >
          <cbp-resize-observer
            debounce={10}
            onResized={ (e) => this.handleResize(e.detail.width) }
          >
            <slot onSlotchange={(e) => this.handleSlotChange(e)}/>
          </cbp-resize-observer>
        </div>
      </Host>
    );
  }
}
