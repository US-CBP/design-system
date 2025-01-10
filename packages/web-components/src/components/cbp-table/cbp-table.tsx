import { Component, Prop, State, Element, Event, EventEmitter, Method, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-table',
  styleUrl: 'cbp-table.scss',
})
export class CbpTable {

  private table: HTMLTableElement;
  private caption: HTMLTableCaptionElement;
  private columnHeadings: HTMLTableCellElement[];
  private sortableColumns: HTMLTableCellElement[] = [];
  
  @Element() host: HTMLElement;

  @Prop({ reflect: true }) striped: "odd" | "even";
  @Prop({ reflect: true }) sortable: boolean;
  @Prop({ reflect: true }) hover: 'row' | 'cell' = 'row';
  @Prop({ reflect: true }) columnHover: boolean;
  
  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  @State() sort: {
    columnHeading: HTMLTableCellElement, 
    direction: string
  }

  @Event() tablesorted: EventEmitter;

  /*
  @Listen('buttonClick')
  handleHeadingClick(e) {
    console.log('buttonClick Listener: ', e);
    const columnHeading: HTMLTableCellElement = e.detail.host.closest('th');
    console.log({columnHeading})
    this.doSort(this.columnHeadings.indexOf(columnHeading));
  }
  */

  addScope(){
    const columnHeadings = Array.from(this.host.querySelectorAll('thead th'));
    const rowHeadings = Array.from(this.host.querySelectorAll('tbody th'));
    //console.log({columnHeadings},{rowHeadings});

    columnHeadings.forEach( item => {
      item.setAttribute('scope','col');
    });

    rowHeadings.forEach( item => {
      item.setAttribute('scope','row');
    });
  }

  makeSortable(){
    this.columnHeadings = Array.from(this.host.querySelectorAll('thead th'));
    console.log('Making sortable: ',this.columnHeadings);

    this.columnHeadings.forEach( item => {
      const control = item.querySelector('cbp-button');
      if(control) {
        console.log('Wiring up column header: ', item, control);
        this.sortableColumns = [...this.sortableColumns, item];
        if (item.getAttribute('aria-sort') == undefined) item.setAttribute("aria-sort","none");

        // ({detail: { host, nativeElement, value }})
        control.addEventListener( "buttonClick", () => {
          //const { host, nativeElement, value } = detail;
          //console.log('Clicked: ', e); //host, nativeElement, value
          this.doSort(this.columnHeadings.indexOf(item));
          //const th = host.closest('th');
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
  async doSort(column: number) {
    console.log('Sorting column ', column);
    let columnHeading: HTMLTableCellElement = this.columnHeadings[column];
    let direction = "ascending";
      //column: number, 
      //direction: string;

    // Manage statefulness of the sorted column vs the others (add/remove sort attrs and pressed state)
    if (columnHeading == this.sort.columnHeading) {
      // If the current sort column is the same as the previously sorted column, just toggle the direction
      columnHeading.getAttribute('aria-sort') == "ascending" 
        ? direction = "descending"
        : direction = "ascending";;
    }
    else {
      // Reset the previous sort state
      this.sort.columnHeading.removeAttribute('aria-sort');
      this.sort.columnHeading.querySelector('cbp-button').pressed=false;
      // Set the new sort state
      //columnHeading.setAttribute('aria-sort','ascending');
      columnHeading.querySelector('cbp-button').pressed=true;
    }
    columnHeading.setAttribute('aria-sort', direction);

    let newSort = {
      columnHeading: columnHeading, 
      direction: direction
    }
    this.sort=newSort;

    // Emit an event for the app logic to handle the actual sorting of data
    this.tablesorted.emit({
      column: 1, 
      direction: 'ascending'
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
    setCSSProps(this.host, Object.assign({}, this.sx));
  }

  componentDidLoad() {
    this.addScope();
    this.makeSortable();
  }

  // These need to be reactive, not just occur on load
  componentWillRender(){
    //this.addScope();
    //if (this.sortable) this.makeSortable();
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
