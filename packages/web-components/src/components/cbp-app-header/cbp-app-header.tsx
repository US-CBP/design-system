import { Component, Element, Event, EventEmitter, Listen, Host, h, Prop, Method } from '@stencil/core';
import { debounce } from '../../utils/utils';
import state from '../cbp-app-header/store';
/**
 * @slot - The default slot usually contains only `cbp-nav-item` tags, but other content may also be included.
 * @slot - cbp-home - The link to the home page containing the Application Name as link text should be placed within this named slot for the intended visual treatment.
 * @slot - cbp-app-header-extras - Optional extra buttons/links that are right-aligned may be slotted within the app header but outside of the `nav` landmark.
 */

@Component({
  tag: 'cbp-app-header',
  styleUrl: 'cbp-app-header.scss',
})
export class CbpAppHeader {
  private navItems: HTMLCbpNavItemElement[] = [];
  private currentItem: HTMLCbpNavItemElement;

  private drawerButton: HTMLCbpButtonElement;
  private nav: HTMLElement;
  private children: HTMLElement[] = [];
  private navWidth;

  private searchForm:HTMLElement;
  private searchControl:HTMLCbpButtonElement;
  private searchField:HTMLInputElement;

  @Element() private host: HTMLCbpAppHeaderElement;
  
  /** Specifies the id of the drawer to be launched*/
  @Prop() subnavDrawerId: string;

  /** Specifies if there will be a slotted input for global search */
  @Prop() search: boolean;

  /** Specifies the method attribute for the search form  */
  @Prop() searchMethod: string;

  /** Specifies the action attribute for the search form  */
  @Prop() searchAction: string;

  
  @Listen('drawerClose', { target: 'body' })
  handleNavDrawerClose(e) {
    const Subnav = e.target.querySelector('cbp-subnav');
    // Only update focus and current states if the drawer holds a subnav using state store.
    if (Subnav?.store == true) {
      let active = this.host.querySelector(`[name="${state.activeItemName}"] cbp-button > button `) as HTMLButtonElement;
      active?.focus(); // TechDebt: this needs to be revisited for navigation events that may auto-close the drawer.
      //this.setActiveNav(this.host.querySelector(`[name="${state.currentParent}"]`))
    }
  }

  /** A custom event emitted in accordance with the native input's onInput event. */
  @Event() searchInput: EventEmitter;
  handleSearchInput(e) {
    this.searchInput.emit({
      host: this.host,
      nativeInput: this.searchField,
      value: this.searchField.value,
      nativeEvent: e
    });
  }

  /** A custom event emitted in accordance with the native search form's submit event. */
  @Event() searchSubmit: EventEmitter;
  handleSearchSubmit(e) {
    this.searchSubmit.emit({
      host: this.host,
      nativeInput: this.searchField,
      value: this.searchField.value,
      nativeEvent: e
    });
  }


  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if(this.search) {
      const searchVisible = document.getElementById('cbp-app-header-search').hidden == false;
      if (ev.key === 'Escape' && this.search && searchVisible) {
        this.closeSearch();
      }
    }
  }

  // TechDebt: try to use clickAwayListener - but verify it's not loading multiple event listeners each time it's toggled.
  @Listen('click', { target: 'body' })
  handleClick(event: MouseEvent) {
    if(this.search) {
      const searchVisible = document.getElementById('cbp-app-header-search')?.hidden == false;
      if (!this.host.contains(event.target as Node) && this.search && searchVisible) {
        this.closeSearch();
      }
    }
  }

  /** A public method to show the search form in the application header. */
  @Method()
  async openSearch() {
    if(this.search) {
      this.searchForm.hidden = false;
      this.searchControl.expanded = 'true';
      this.searchField.focus();
    }
  }

  /** A public method to close/hide the search form in the application header. */
  @Method()
  async closeSearch() {
    if(this.search) {
      this.searchForm.hidden = true;
      this.searchField.value = ''; // Reset the search value when closed
      this.searchControl.expanded = 'false';
      this.searchControl.querySelector('button')?.focus();
    }
  }

  // When navigating out of the search area, close the search
  handleTabFocusOut({ key, shiftKey }) {
    if (key == 'Tab' && !shiftKey) this.closeSearch();
  }
  handleShiftTabFocusOut({ key, shiftKey }) {
    if (key == 'Tab' && shiftKey) this.closeSearch();
  }

  updateCurrentItem(newValue) {
    const CurrentItem = this.host.querySelector(`cbp-nav-item[name="${newValue}"]`) as HTMLCbpNavItemElement;
    this.setCurrentNav(CurrentItem);
  }

  // Called from navItem click as well as state updates.
  setCurrentNav(activatedNav) {
    this.currentItem = activatedNav;
    this.navItems.forEach((navItem: HTMLCbpNavItemElement) => {
      if (activatedNav == navItem) navItem.current = true;
      else navItem.current = false;
    });
  }

  updateActiveItem(newValue) {
    const ActiveItem = this.host.querySelector(`cbp-nav-item[name="${newValue}"] button`) as HTMLCbpNavItemElement;
    setTimeout(() => {
      ActiveItem?.focus();
    }, 101); // Note: Time 101 is set due to cbp-drawer setting @ 100
  }

  // Called by the resize observer; also fires on initial render.
  handleResize(width) {
    // Get the width of the content (and update the this.navWidth) before doing responsive adjustments.
    if (this.navWidth == undefined) {
      this.navWidth = this.nav.getBoundingClientRect().width;
    }

    // If the emitted size is less than the current mode's width, do responsive behavior
    if (width <= this.navWidth) {
      this.doResponsive();
    } 
    else {
      this.doFullSize();
    }
  }

  // If nav items can't fit, hide all nav items and show the hamburger control
  doResponsive() {
    this.children.forEach((item, index) => {
      if (index > 0 && item.id != 'global-search-toggle') {
        item.setAttribute('hidden', '');
      }
    });
    this.drawerButton?.parentElement?.classList.add('cbp-app-header-responsive');
    this.drawerButton?.removeAttribute('hidden');
  }

  // If nav items fit, reveal them and hide the hamburger control
  doFullSize() {
    this.children.forEach((item, index) => {
      if (index > 0) {
        item.removeAttribute('hidden');
      }
    });
    this.drawerButton?.parentElement?.classList.remove('cbp-app-header-responsive');
    this.drawerButton?.setAttribute('hidden', '');
  }


  componentWillLoad() {
    this.navItems = Array.from(this.host.querySelectorAll('cbp-nav-item'));
    this.currentItem = this.host.querySelector('cbp-nav-item[current]');

    // Set the shared states as well
    state.currentPage = state.currentParent = this.currentItem?.name;

    // Attach event listeners to the child navItem
    this.navItems.forEach(navItem => {
      navItem.addEventListener('navItemClick', e => this.setCurrentNav(e.detail.host));
    });
  }

  componentDidLoad() {
    // Get the immediate children to toggle hidden
    this.children = Array.from(this.nav.querySelectorAll(':scope > *'));
  }

  render() {
    if (this.currentItem?.name != state.currentParent) {
      this.updateCurrentItem(state.currentParent);
    }

    return (
      <Host>
        <cbp-resize-observer
          onResized={debounce(e => {
            this.handleResize(e.detail.width);
          }, 10)}
        >
          <nav aria-label="Primary Navigation" ref={el => (this.nav = el)}>
            <slot name="cbp-home" />
            <slot />

            {this.navItems.length > 1 && (
              <cbp-button
                hidden
                ref={el => (this.drawerButton = el)}
                fill="outline"
                color="secondary"
                target-prop="open"
                controls={this.subnavDrawerId}
                accessibilityText="Navigation Menu"
                expanded="false"
              >
                <cbp-icon name="bars" />
              </cbp-button>
            )}
          </nav>
        </cbp-resize-observer>

        <slot name="cbp-app-header-extras" />

        {this.search && (
          <search>
            <cbp-button
              id="global-search-toggle"
              type="button"
              fill="outline"
              color="secondary"
              variant="square"
              onClick={() => this.openSearch()}
              expanded="false"
              accessibilityText="Global Search"
              ref={el => (this.searchControl = el)}
            >
              <cbp-icon name="magnifying-glass"></cbp-icon>
            </cbp-button>

            <form hidden
              id="cbp-app-header-search" 
              method={this.searchMethod} 
              action={this.searchAction}
              onSubmit={ (e) => this.handleSearchSubmit(e)}
              ref={el => (this.searchForm = el)}
            >
              <input
                type="text"
                name="globalSearch"
                aria-label="Search"
                placeholder="Start Typing - Press ESC to Close"
                onKeyDown={e => this.handleShiftTabFocusOut(e)}
                onInput={ e => this.handleSearchInput(e)}
                ref={el => (this.searchField = el)}
              />
              <div>
                <cbp-button type="submit" fill="solid" color="primary" variant="square" accessibilityText="Search">
                  <cbp-icon name="magnifying-glass"></cbp-icon>
                </cbp-button>
                <cbp-button
                  type="button"
                  fill="ghost"
                  color="secondary"
                  variant="square"
                  accessibilityText="Close Search"
                  onKeyDown={e => this.handleTabFocusOut(e)}
                  onClick={() => this.closeSearch()}
                >
                  <cbp-icon name="circle-xmark" size="var(--cbp-space-5x)" />
                </cbp-button>
              </div>
            </form>
          </search>
        )}
      </Host>
    );
  }
}
