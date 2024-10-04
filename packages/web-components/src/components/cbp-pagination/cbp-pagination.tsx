import { Component, Prop, State, Element, Event, EventEmitter, Listen, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot
 * @slot cbp-pagination-items-per-page - Slot a `cbp-dropdown` here with numeric values (or "All") defining the options for 
 * @slot cbp-pagination-pages - 
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

  @Element() host: HTMLElement;

  /** Specifies the number of records in the entire data set (complete or filtered) to be paginated. */
  @Prop() records: number = 0;

  /** Specifies the number of items to show per page. Accepts any number or "all". Defaults to 10. */
  @Prop({mutable: true}) pageSize: number | "all" = 10;

  /** Specifies the current page being viewed. Defaults to 1. */
  @Prop({mutable: true}) page: number = 1;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  @State() pagesDropdownItems: HTMLCbpDropdownItemElement[];
  @State() showingText: string;

  
  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() paginationChange: EventEmitter;


  @Listen('buttonClick')
  handlePagesButtonNav( {detail: {value} }  ) {
    if (value == 'next') this.handlePageChange(this.page+1);
    if (value == 'previous') this.handlePageChange(this.page-1);
  }

  handlePageSizeChange( value ) {
    console.log('HandlePageSizeChange: ', value)
    this.page=1; // always reset the current page to 1 when changing the page size
    
    // Recalculate and populate the pages dropdown
    if (value == "all" ) {
      this.pageSize=value;
      this.pages=1;
      this.pagesDropdown.setAttribute('hidden',''); // if "All" is selected, hide the pages dropdown
      if (this.records > 500) console?.warn('cbp-pagination - Warning: the "show all" option should be disabled for large data sets. Pushing this amount of data to the user\'s browser is bad for performance, in addition to rendering a large number of DOM nodes to display it all at once.');
    }
    else {
      this.pageSize=parseInt(value); // coerce this into a number, since it also accepts a string and values sent from HTML will be strings
      this.pagesDropdown.value=0; // set to zero so that it will re-render/select after repopulation
      this.pages=Math.ceil(this.records/this.pageSize);
      this.pagesDropdown.removeAttribute('hidden');
    }


    // Generate a new array of dropdown-items and replace them in the pages dropdown
    this.pagesDropdownItems=[];
    for (let i=1; i <= this.pages; i++ ) {
      let newItem: HTMLCbpDropdownItemElement = document.createElement("cbp-dropdown-item");
      newItem.value=`${i}`;
      newItem.innerText=`${this.pages <100 ? 'Page' : ''} ${i} of ${this.pages}`;
      //if (i == 1) newItem.selected=true;
      this.pagesDropdownItems=[...this.pagesDropdownItems, newItem];
    }
    this.pagesDropdown.querySelector('[role=listbox]').replaceChildren(...this.pagesDropdownItems);
    
    setTimeout( () => {
      this.pagesDropdown.value=1;
      this.checkPageButtonStates();
    }, 100);
  }
  
  handlePageChange(value) {
    this.page = this.pagesDropdown.value = value; // updating this prop will cause a re-render, recalculating the pagination text

    this.paginationChange.emit({
      host: this.host,
      records: this.records,
      pageSize: this.pageSize,
      page: this.page,
      pages: this.pages
    });

    this.checkPageButtonStates();
  }

  checkPageButtonStates(){
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
    this.pageSizeDropdown.addEventListener('valueChange', ({detail: {value}}) => this.handlePageSizeChange(value));
    
    this.pagesDropdown=this.host.querySelector('[slot=cbp-pagination-pages]').querySelector('cbp-dropdown');
    this.pagesDropdown.addEventListener('valueChange', ({detail: {value}}) => this.handlePageChange(value));

    this.nextPageButton = this.host.querySelector('[slot=cbp-dropdown-attached-button-end] cbp-button');
    this.previousPageButton = this.host.querySelector('[slot=cbp-dropdown-attached-button-start] cbp-button');

    // Update their values based on pagination props
    this.pageSizeDropdown.value=this.pageSize;

    this.handlePageSizeChange(this.pageSize);

    // Setting the pagesDropdown value has no effect because it's not populated.
    //this.pagesDropdown.value=this.page;

    //console.log(this.pagesDropdown, this.pageSizeDropdown);
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
