import { Component, Prop, State, Element, Event, EventEmitter, Method, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Table component is a wrapper component encapsulating design system styles for semantic HTML 
 * tables as well as applying progressive enhancements to the contained table.
 * 
 * @slot - The semantic table HTML is placed within the default slot.
 */
@Component({
  tag: 'cbp-table',
  styleUrl: 'cbp-table.scss',
})
export class CbpTable {

  private table: HTMLTableElement;
  private caption: HTMLTableCaptionElement;
  private columnHeadings: HTMLTableCellElement[];
  private sortableColumns: HTMLTableCellElement[] = [];
  
  @Element() private host: HTMLElement;


  /** Specifies whether the table is striped, designating whether the colored rows are the odd or even rows (CBP DS standard is even when used). */
  @Prop({ reflect: true }) striped: "odd" | "even";

  /** Specifies whether the mouse cursor highlights the table row or cell on hover. Defaults to "row". */
  @Prop({ reflect: true }) hover: 'row' | 'cell' = 'row';

  /** Specifies whether a hover effect is applied to columns when the column header is hovered. This feature is opt-in. */
  @Prop({ reflect: true }) columnHover: boolean;
  
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

  addScope(){
    const columnHeadings = Array.from(this.host.querySelectorAll('thead th'));
    const rowHeadings = Array.from(this.host.querySelectorAll('tbody th'));

    columnHeadings.forEach( item => {
      item.setAttribute('scope','col');
    });

    rowHeadings.forEach( item => {
      item.setAttribute('scope','row');
    });
  }

  makeSortable(){
    this.columnHeadings = Array.from(this.host.querySelectorAll('thead th'));
    
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
      direction: direction,
      nativeEvent: e
    })
  }

  componentWillLoad() {
    this.table = this.host.querySelector('table');
    this.caption = this.table?.querySelector('caption');
    if (!this.caption) console.warn(`cbp-table: A caption tag is required for accessibility. If you don't want a visible caption, add a 'hidden' attribute to it.`);
    this.columnHeadings=Array.from(this.host.querySelectorAll('thead > th'));

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
  }

  render() {
    return (
      <Host>
        <slot name="cbp-table-toolbar" />
        <slot />
      </Host>
    );
  }
}
