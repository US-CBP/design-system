import { Component, Element, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-menu',
  styleUrl: 'cbp-menu.scss'
})
export class CbpMenu {

  //private menu: HTMLElement;
  //private control: any[];

  @Element() host: HTMLElement;

  /** Specifies the position of the drawer (left or right) */
  @Prop({ reflect: true }) position: 'left' | 'right' = 'left';

  /** When set, specifies that the drawer is open. */
  @Prop({ reflect: true }) open: boolean=false;

  /** Specifies a unique `ID` for the menus, used to wire up the controls and accessibility features. */
  @Prop() uid: string;

  /** Creates an accessible label for the menu control. */
  @Prop() accessibilityText: string;
  
  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  render() {
    return (
      <Host>
        <cbp-button
          type="button"
          fill="ghost"
          aria-haspopup="menu"
          aria-controls="menu1"
          aria-label={this.accessibilityText}
          id="menubutton1"
          class="cbp-menu__control cbp-btn-square cbp-btn__secondary-ghost"
          aria-expanded={this.open.toString()}
        >
          Menu
        </cbp-button>

        <div
          id={`${this.uid}-menu`}
          role="menu"
          aria-labelledby={this.uid}
        >
          <slot />
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