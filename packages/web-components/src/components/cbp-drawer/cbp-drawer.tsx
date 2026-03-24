import { Component, Prop, Element, Event, EventEmitter, Method, Watch, Host, h, State } from '@stencil/core';
import { setCSSProps, getFocusableElements, getInvertedContext } from '../../utils/utils';

/**
 * The Drawer is a container that may be hidden and revealed, sliding in from either side of the viewport, 
 * containing application-defined contents. The Drawer may optionally be rendered in the flow of the page 
 * at larger screen sizes.
 * 
 * @slot - The Drawer contents go in the default slot.
 */
@Component({
  tag: 'cbp-drawer',
  styleUrl: 'cbp-drawer.scss',
})
export class CbpDrawer {
  private drawer: HTMLElement;
  private focusableElements: any[];

  @Element() private host: HTMLElement;

  /** Specifies the position of the drawer (left or right) */
  @Prop({ reflect: true }) position: 'left' | 'right' = 'left';

  /** When set, specifies that the drawer is open */
  @Prop({ reflect: true }) open: boolean;

  /** Specifies a unique `ID` for the drawer, used to wire up the controls and accessibility features. */
  @Prop() uid: string;

  /** Creates an accessible label for the drawer (dialog). */
  @Prop() accessibilityText: string;

  /** Specifies a valid CSS media query (preferably using relative units), when met will hide the wrapped content using display: none. E.g., `min-width:64em` */
  @Prop() persistAt: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @State() persistent: boolean = false;

  /** Custom event fired when the drawer is opened. */
  @Event() drawerOpen!: EventEmitter;
  /** Custom event fired when the drawer is closed. */
  @Event() drawerClose!: EventEmitter;

  @Watch('open')
  watchOpenHandler(newValue: boolean) {
    newValue == true ?  this.setFocus() :
    this.drawerClose.emit({
      host: this.host,
      open: this.open,
    });
  }

  /** A public method for opening the drawer. */
  @Method()
  async openDrawer() {
    this.open = true;
  }

  /** A public method for closing the drawer. */
  @Method()
  async closeDrawer() {
    this.open = false;
  }

  setFocus() {
    setTimeout(() => {
      if (!this.focusableElements) {
        this.focusableElements = getFocusableElements(this.host);
      }
      this.focusableElements[0]?.focus();
    }, 100);
  }

  handleBackdropClick(e) {
    const { target } = e;
    !target.closest('.cbp-drawer__content') && this.closeDrawer();
  }

  handleKeyUp(e) {
    e.key == 'Escape' && this.closeDrawer();
  }


  // Callback functions for the media query event listeners
  doPersistAt(mql) {
    if (mql.matches) {
      this.persistent = true;
    }
    else {  
      this.persistent = false;
    }
  }


  componentDidLoad() {
    if (this.persistAt) {
      const MQ = window?.matchMedia(`(${this.persistAt})`);
      if (MQ) {
        MQ.addEventListener('change', mql => this.doPersistAt(mql)); // Add an event listener to the media query
        this.doPersistAt(MQ); // Run the breakpoint change handler once on load
      }
    }

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.drawer, {
      ...this.sx,
    });
    // If the drawer is open on initial load, set focus
    this.open && this.setFocus();
  }

  componentDidRender() {
    // Support animation by doing it this way
    setTimeout(() => {
      this.open ? this.drawer.classList.add('cbp-drawer--open') : this.drawer.classList.remove('cbp-drawer--open');
    }, 10);
  }


  render() {
    return (
      <Host 
        class={ (this.persistent && !this.open) ? "cbp-drawer--persistent" : ""}
        onClick={e => this.handleBackdropClick(e)} 
        onKeyUp={e => this.handleKeyUp(e)}
        id={this.uid}
      >
        <div
          ref={el => (this.drawer = el)}
          role={this.persistent ? "region" : "dialog"}
          aria-modal={!this.persistent ? "true" : false}
          class="cbp-drawer__content"
          aria-label={this.accessibilityText}
          tabindex="-1"
        >
          {(!this.persistent || this.open) && 
            <cbp-button
              class="cbp-drawer__close-button"
              variant="square"
              type="button"
              color="secondary"
              fill="ghost"
              accessibilityText="Close"
              targetProp="open"
              controls={this.uid}
              context={getInvertedContext(this.context)}
            >
              <cbp-icon name="circle-xmark" size="var(--cbp-space-5x)"></cbp-icon>
            </cbp-button>
          }

          <slot />
        </div>
      </Host>
    );
  }
}
