import { Component, Element, Prop, Method, Watch, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey, doKeyboardNav, clickAwayListener} from '../../utils/utils';
import { floatUI, floatUIProps } from '../../utils/floatingPlacement';

/**
 * A Menu contains additional actions in the form of links or buttons, which can be shown by activating a control.
 * 
 * @slot - Both the menu control and the menu items are slotted in the default slot. (The menu items are auto-slotting into their proper place).
 */
@Component({
  tag: 'cbp-menu',
  styleUrl: 'cbp-menu.scss'
})
export class CbpMenu {

  private CBPButton: HTMLCbpButtonElement;
  private control: HTMLElement;

  private menu: HTMLElement;
  private menuItems: any; //: HTMLButtonElement | HTMLAnchorElement; 
  private focusIndex: number;

  @Element() private host: HTMLElement;

  /** Specifies the position of the menu. Defaults to "bottom-start". */
  @Prop({ reflect: true }) position: 'bottom-start' | "bottom-end" | 'top-start' | "top-end" = 'bottom-start';

  /** When set, specifies that the menu is open. */
  @Prop({ reflect: true }) open: boolean=false;

  /** Specifies a unique `ID` for the menu, used to wire up the controls and accessibility features. */
  @Prop() uid: string = createNamespaceKey('cbp-menu');

  /** Creates an accessible label for the menu control. */
  @Prop() accessibilityText: string;
  
  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** A custom event fired when the menu is opened or closed. */
  @Event() toggleMenu: EventEmitter;

  /** A public method for opening the menu. */
  @Method()
  async openMenu() {
    this.open = true;
  }

  /** A public method for closing the menu. */
  @Method()
  async closeMenu() {
    this.open = false;
    this.control?.focus();
  }

  @Watch('open')
  watchOpen(newValue) {
    // If the menu was opened, give it time to render and set focus to the selected/first item


    if (newValue) {
      // TechDebt: this would be needed for reactivity, but not needed otherwise. How to make it smart/conditional?
      this.menuItems = Array.from(this.menu.querySelectorAll('button, a')); // Get and set this array whenever the menu is opened
      
      // Set up a clickaway listener to close the menu
      clickAwayListener(this.host, _ => {
        this.open = false;
      });

      this.toggleMenu.emit({
        host: this.host,
        control: this.control,
        open: this.open
      });

      setTimeout( () => 
        this.setCurrentMenuItem(),
        500
      );
    }

    // regardless of the new value, set the expanded value on the control
    this.CBPButton.expanded=`${this.open}`;
  }

  // Clicking outside of the component closes the menu
  clickAwayHandler({ target }) {
    if (!target.closest(this.host)) this.open=false;
  }


  // All keypresses within the menu itself
  handleKeyPress(e) {
    const { key, shiftKey} = e;

    const openKeys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft']; // all keys that will do the default open action (Enter and SPACE are omitted because they trigger the click event)
    const navKeys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End']; // all keys that will do the default open action (space and enter act as a click and do not need to be included)

    if(key == 'Escape') this.closeMenu();
    if(key == 'Tab' && !shiftKey) this.open=false; // close without sending focus back to the control

    // handle opening when closed
    if (openKeys.includes(key) && !this.open) {
      this.open = true;
      e.preventDefault(); // Stop these navigation keys from scrolling the page
      return;
    }

    // Handle standard menu nav keys
    if (navKeys.includes(key)) {
      this.focusIndex = doKeyboardNav(this.menuItems, key, this.focusIndex);
      this.setCurrentMenuItem(this.focusIndex);
      e.preventDefault(); // Stop these navigation keys from scrolling the page
    }
    return;
  }

  setCurrentMenuItem(i = 0) {
    this.menuItems[i].focus();
  }

  // if tabbing out of the menu from the close button, close the menu
  handleKeyPressCloseButton(e) {
    if(e.key == 'Tab' && !e.shiftKey) this.open=false;
  }

  componentWillLoad() {
    this.CBPButton = this.host.querySelector('cbp-button');
    this.control = this.host.querySelector('button');

    // Apply sx
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    this.menuItems = Array.from(this.menu.querySelectorAll('button,a'));

    if (!this.control) this.control = this.host.querySelector('button');
    if (this.control) {
      this.CBPButton.controls=this.uid;
      this.CBPButton.expanded=`${this.open}`;
      this.control.setAttribute('aria-controls',`${this.uid}-menu`);
      this.control.setAttribute("aria-haspopup","menu");
    }

    // set this as a proxy to read the computed value from
    this.host.style.minWidth = 'var(--cbp-menu-gap)';
  }

  componentDidRender(){
    if(this.open){

    const floatUiprops: floatUIProps= {
        placement: this.position,
        offset: {
          mainAxis: (parseFloat(window?.getComputedStyle(this.host).getPropertyValue('min-width')) || 0),
        },
        flip: true,
        size: {
          height: (parseFloat(window?.getComputedStyle(this.menu).getPropertyValue('height')))
        },
        shift: true,
      }

      floatUI(floatUiprops, this.control, this.menu);
    }
  }

  render() {
    return (
      <Host 
        id={this.uid}
        onKeyDown={(e) => this.handleKeyPress(e)}
      >
        <slot />

        <div
          ref={(el) => this.menu = el}
          id={`${this.uid}-menu`}
          class="cbp-menu__menu"
          role="menu"
          hidden={!this.open}
          aria-labelledby={this.control?.id}
        >
          <slot name="cbp-menu-items" />
        </div>
      </Host>
    );
  }
}