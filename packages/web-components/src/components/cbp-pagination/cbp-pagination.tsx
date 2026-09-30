import { Component, Prop, Element, Event, EventEmitter, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Pagination component presents a common UI pattern for displaying data sets broken up into smaller, 
 * more consumable (and performant) chunks or "pages."
 * 
 * @slot - The default slot positions specified content between the "showing items" text and page controls. This slot should rarely be used.
 * @slot cbp-pagination-items-per-page - Slot a `cbp-dropdown` here with numeric values (or "All") defining the options for page size.
 * @slot cbp-pagination-pages - Slot an empty `cbp-dropdown` here with next/previous controls for the page selection. The Pagination component will manage the items within this dropdown.
 */
@Component({
  tag: 'cbp-pagination',
  styleUrl: 'cbp-pagination.scss'
})
export class CbpPagination {


  private pageSizeDropdown: HTMLCbpDropdownElement;
  private pagesDropdown: HTMLCbpDropdownElement;
  private pages: number = 1;

  private nextPageButton: HTMLCbpButtonElement;
  private previousPageButton: HTMLCbpButtonElement;

  private pagesDropdownItems: HTMLCbpDropdownItemElement[];
  private showingText: string;

  private emit: boolean = false; // track when to emit a paginationChange event

  @Element() private host: HTMLElement;

  /** Specifies the number of records in the entire data set (complete or filtered) to be paginated. */
  @Prop() records: number = 0;

  /** Specifies the number of items to show per page. Accepts any number or "all". Defaults to 10. */
  @Prop({mutable: true}) pageSize: number | "all" = 10;

  /** Specifies the current page being viewed. Defaults to 1. */
  @Prop({mutable: true}) page: number = 1;

  /** 
   * Specifies the current maximum number of pages allowed. This property should be used for extremely large data sets 
   * that have the potential to returns hundreds or thousands of pages.
  */
  @Prop() maxPages: number | undefined;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

 
  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() paginationChange: EventEmitter;


  // Handle next/prev page buttons
  @Listen('buttonClick')
  handlePagesButtonNav( {detail: {value} } ) {
    if (value == 'next page') this.page++;
    if (value == 'previous page') this.page--;
    this.emit=true;
  }

  @Watch('page')
  pageHandler(newValue) {
    // Update the pages dropdown value to trigger it to re-render (no harm if updated more than once to the same value)
    this.pagesDropdown.value = newValue;
    // do additional logic for page change
    this.checkPageButtonStates();
  }

  @Watch('pageSize')
  pageSizeHandler(newValue) {
    // Update the page size dropdown value to trigger it to re-render (no harm if updated more than once to the same value)
    this.pageSizeDropdown.value = newValue;
    // Do additional logic for page size change
    this.handlePageSizeChange(newValue);
  }

  @Watch('records')
  recordsHandler() {
    this.pagesDropdown.value=0; // set to zero so that it will re-render/select after repopulation
    // Update the pages dropdown
    this.updatePages();
  }

  private handlePagesDropdownChange(value){
    this.page=parseInt(value); // let the watch do the heavy lifting
    this.emit=true;
  }

  private handlePageSizeDropdownChange(value){
    this.pageSize = value == "all" ? "all" : parseInt(value); // let the watch do the heavy lifting
    this.page=1; // always reset the current page to 1 when changing the page size - do this before re-render to prevent another
    this.emit=true;
  }


  // handles changing the page size via the dropdown, which is how it should be normally updated.
  private handlePageSizeChange( value ) {
    this.page=1; // always reset the current page to 1 when changing the page size
    
    // Recalculate and populate the pages dropdown
    if (value == "all" ) {
      this.pagesDropdown.setAttribute('hidden',''); // if "All" is selected, hide the pages dropdown
      if (this.records > 500) console?.warn(`cbp-pagination - Warning: the "show all" option should be disabled for large data sets. Pushing this amount of data to the user's browser is bad for performance, in addition to rendering a large number of DOM nodes to display it all at once.`);
    }
    else {
      this.pageSize=parseInt(value); // coerce this into a number, since it also accepts a string and values sent from HTML will be strings
      this.pagesDropdown.value=0; // set to zero so that it will re-render/select after repopulation
      this.pages=Math.ceil(this.records/this.pageSize);
      this.pagesDropdown.removeAttribute('hidden');
    }

    // Update the pages dropdown
    this.updatePages();
  }
  
  // Updates the pages dropdown when the pageSize or records are changed
  // TechDebt: This can be improved by making the dropdown act like a dial. (calculate pages to render based on this.page and this.maxPages, taking into account proximity to both ends.)
  private updatePages() {
    this.pages = this.pageSize == "all" ? 1 : Math.ceil(this.records/this.pageSize);

    this.pagesDropdownItems=[];
    let max: number = (this.maxPages && this.maxPages < this.pages) ? this.maxPages : this.pages;
    // Generate a new array of dropdown-items and replace them in the pages dropdown
    for (let i=1; i <= max; i++ ) {
      let newItem: HTMLCbpDropdownItemElement = document.createElement("cbp-dropdown-item");
      newItem.value=`${i}`;
      newItem.innerText=`${this.pages <100 ? 'Page' : ''} ${i} of ${this.pages}`;
      this.pagesDropdownItems=[...this.pagesDropdownItems, newItem];
    }
    // Replace the pages dropdown items
    this.pagesDropdown.querySelector('[role=listbox]').replaceChildren(...this.pagesDropdownItems);

    // Update the current page to page 1 and the button states after it's had time to update
    setTimeout( () => {
      this.pagesDropdown.value=1;
      this.checkPageButtonStates();
    }, 10);
  }

  private checkPageButtonStates(){
    if (this.nextPageButton) this.nextPageButton.disabled = this.page == this.pagesDropdownItems?.length || !this.pagesDropdownItems?.length;
    if (this.previousPageButton) this.previousPageButton.disabled = this.page == 1 || !this.pagesDropdownItems?.length;
  }


  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    // Find the slotted dropdown controls and listen for changes to them
    this.pageSizeDropdown=this.host.querySelector('[slot=cbp-pagination-items-per-page]').querySelector('cbp-dropdown');
    this.pageSizeDropdown.addEventListener('valueChange', ({detail: {value}}) => this.handlePageSizeDropdownChange(value));
    
    this.pagesDropdown=this.host.querySelector('[slot=cbp-pagination-pages]').querySelector('cbp-dropdown');
    this.pagesDropdown.addEventListener('valueChange', ({detail: {value}}) => this.handlePagesDropdownChange(value));

    this.nextPageButton = this.host.querySelector('[slot=cbp-dropdown-attached-button-end] cbp-button');
    this.previousPageButton = this.host.querySelector('[slot=cbp-dropdown-attached-button-start] cbp-button');

    // Update their values based on pagination props
    this.pageSizeDropdown.value=this.pageSize;
    this.handlePageSizeChange(this.pageSize);
  }

  componentDidRender(){
    // Only emit the custom event once after user interaction (not reactivity or internal updates)
    if(this.emit) {
      // Emit the custom event
      this.paginationChange.emit({
        host: this.host,
        records: this.records,
        pageSize: this.pageSize,
        page: this.page,
        pages: this.pages
      });
    }
    this.emit=false;
  }


  render() {
    // Set the pagination text
    if (this.records == 0 || this.pageSize == "all") {
      this.showingText=` Showing ${this.records} items`;
    }
    else {
      this.showingText=`${ (this.page * this.pageSize) - (this.pageSize - 1)}-${(this.page * this.pageSize < this.records) ? this.page * this.pageSize : this.records} of ${this.records} items`;
    }

    return (
      <Host>
        <slot name="cbp-pagination-items-per-page" />
        <div class="cbp-pagination-showing-text">
          {this.showingText}
        </div>
        <slot />
        <slot name="cbp-pagination-pages" />
      </Host>
    );
  }
}
