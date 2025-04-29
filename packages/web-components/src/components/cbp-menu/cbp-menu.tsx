import { Component, Element, Prop, Method, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey, clickAwayListener } from '../../utils/utils';

/**
 * @slot - Both the menu control and the menu items are slotted in the default slot. (The menu items are auto-slotting into their proper place).
 */
@Component({
  tag: 'cbp-menu',
  styleUrl: 'cbp-menu.scss'
})
export class CbpMenu {

  private menu: HTMLElement;
  private menuItems: HTMLCbpMenuItemElement[];
  private CBPButton: HTMLCbpButtonElement;
  private control: HTMLElement;

  @Element() host: HTMLElement;

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
      this.menuItems = Array.from(this.host.querySelectorAll('cbp-menu-item')); // Get and set this array whenever the menu is opened
      console.log(this.menu,this.menuItems);
      
      // Set up a clickaway listener to close the menu
      clickAwayListener(this.host, _ => {
        this.open = false;
      });
    }
  }

  // Clicking outside of the component closes the menu
  clickAwayHandler({ target }) {
    if (!target.closest(this.host)) this.open=false;
  }

  // ESC closes the menu and returns focus to the control
  handleKeyPress(e) {
    if(e.key == 'Escape') this.closeMenu();
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
    if (!this.control) this.control = this.host.querySelector('button');
    if (this.control) {
      this.CBPButton.controls=this.uid;
      this.control.setAttribute('aria-controls',`${this.uid}-menu`);
      this.control.setAttribute("aria-haspopup","menu");
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
          <cbp-menu-item class="cbp-menu__close-btn">
            <cbp-button 
              fill="solid"
              color="primary"
              context="dark-inverts"
              onButtonClick={ () => this.closeMenu()}
              onKeyDown={ (e) => this.handleKeyPressCloseButton(e)}
            >
              <cbp-icon name="times" size="1rem"></cbp-icon>
              Close
            </cbp-button>
          </cbp-menu-item>
        </div>
      </Host>
    );
  }
}


/* From vanilla code

class Menu {
  constructor(menu) {
    this.menuComponent = menu;
    this.control = this.menuComponent.querySelector('button');
    this.menu = this.control.hasAttribute('aria-controls')
      ? this.menuComponent.querySelector(
          '#' + this.control.getAttribute('aria-controls')
        )
      : this.menuComponent.querySelector('.cbp-menu__menu');

    this.menuItems = this.menu.querySelectorAll('a,button');
    this.closeButton = this.menu.querySelector('.cbp-menu__close-btn');

    // Default all buttons to aria-pressed='false' and menu to hidden
    this.control.setAttribute('aria-expanded', 'false');

    // Default the tabindex for all menu items to -1, so that they are not in the tab order but programmatically focusable
    this.menuItems.forEach((item) => {
      item.setAttribute('tabindex', '-1');
    });

    // Listen for control activation
    this.control.addEventListener('click', (e) => {
      this.toggleMenu(e);
    });

    // Listen for the close button activation
    this.closeButton &&
      this.closeButton.addEventListener('click', (e) => {
        this.closeMenu(e);
      });

    // Listen for ESC keypress anywhere
    document.addEventListener('keydown', (e) => {
      this.handleKeyPress(e);
    });

    // Listen for arrow keys within the menu
    this.menu.addEventListener('keydown', (e) => {
      this.handleMenuNavigation(e);
    });

    // Listen for clicks outside of the menu to close it
    document.addEventListener('click', (e) => {
      this.clickAwayHandler(e);
    });
  }

  toggleMenu(e) {
    this.control.hasAttribute('aria-expanded') &&
    this.control.getAttribute('aria-expanded') === 'false'
      ? this.openMenu(e)
      : this.closeMenu(e);
  }

  openMenu(e) {
    this.control.setAttribute('aria-expanded', 'true');
    this.setCurrentMenuItem(0);
    this.emitCustomEvent(true);
  }

  closeMenu(e, focusControl = true) {
    if (this.control.getAttribute('aria-expanded') == 'true') {
      this.control.setAttribute('aria-expanded', 'false');
      this.emitCustomEvent(false, e);
      focusControl && this.control.focus();
    }
  }

  emitCustomEvent(open, e) {
    const toggleEvent = new CustomEvent('menuToggle', {
      detail: {
        button: this.control,
        expanded: open,
        nativeEvent: e,
      },
    });
    this.menuComponent.dispatchEvent(toggleEvent);
  }

  handleKeyPress(e) {
    e.key == 'Escape' && this.closeMenu(e);
    e.key == 'Tab' && this.checkFocus(e);
  }

  handleMenuNavigation(e) {
    e.key == 'ArrowDown' && this.keyboardNavigateForward(e);
    e.key == 'ArrowUp' && this.keyboardNavigateBackward(e);
    e.key == 'Home' && this.setCurrentMenuItem(0);
    e.key == 'End' && this.setCurrentMenuItem(this.menuItems.length - 1);
    //e.key == 'Tab' && this.checkFocus(e);
  }

  keyboardNavigateForward(e) {
    this.currentMenuItem == this.menuItems.length - 1
      ? this.setCurrentMenuItem(0)
      : this.setCurrentMenuItem(this.currentMenuItem + 1);
  }

  keyboardNavigateBackward(e) {
    this.currentMenuItem == 0
      ? this.setCurrentMenuItem(this.menuItems.length - 1)
      : this.setCurrentMenuItem(this.currentMenuItem - 1);
  }

  setCurrentMenuItem(i) {
    this.currentMenuItem = i;
    this.menuItems[i].focus();
  }

  clickAwayHandler(e) {
    !this.menuComponent.contains(e.target) && this.closeMenu(e);
  }

  checkFocus(e) {
    setTimeout(() => {
      !(
        document.activeElement != null &&
        this.menuComponent.contains(document.activeElement)
      ) && this.closeMenu(e, false);
    }, 50);
  }
}

export default Menu;


*/