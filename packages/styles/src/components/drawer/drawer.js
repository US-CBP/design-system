/**
 * Notes:
 * 1. For focus trapping, display: "none"/"inherit" is set when closing/opening so that
 *    tabbing while the drawer is closed/open puts the focus order on the page correctly.
 *
 * Bugs:
 * 1. When closed, the drawer should be out of the focus order of the page. Try changing styled css for this.
 *
 */

class Drawer {
  #selector = '[data-drawer-align]';
  #hamburger = '[data-drawer]';

  constructor() {
    this.drawer = document.querySelector(this.#selector);
    this.drawerHeader = this.drawer.querySelector('.cbp-drawer__header');
    this.closeBtn = this.drawerHeader.querySelector('button');
    this.openBtn = document.querySelector(this.#hamburger);
    this.direction = this.drawer.dataset.drawerAlign;
    this.drawer.setAttribute('hidden', '');
    this.addListeners(this.openBtn, this.closeBtn);
  }

  addListeners(openBtn, closeBtn) {
    openBtn.addEventListener('click', (e) => {
      if (e.button === 0) {
        this.open(this.drawer);
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Escape' && e.key === 'Escape') {
        this.close(this.drawer);
      }
    });

    closeBtn.addEventListener('click', () => this.close(this.drawer));
  }

  /**
   * Drawer is open by adding .active to .cbp-drawer classList
   * @param {obj} drawer
   */
  open(drawer) {
    drawer.removeAttribute('hidden');
    setTimeout(() => {
      drawer.classList.add('active');
    }, 1);
    this.addBackdrop();
    this.handleBackdrop();
    setTimeout(() => {
      this.setFocus();
    }, 10);
  }

  /**
   * Drawer is closed by removing .active class from .cbp-drawer classList
   * @param {obj} drawer
   */
  close(drawer) {
    const isActive = drawer.classList.contains('active');

    if (isActive) {
      drawer.classList.remove('active');
      this.removeBackdrop(drawer);
      setTimeout(() => {
        drawer.setAttribute('hidden', '');
      }, 500);
    }
  }

  addBackdrop() {
    const backdropEl = document.createElement('div');
    const parentEl = this.drawer.parentNode;
    backdropEl.classList.add('cbp-backdrop', 'active');
    parentEl.insertBefore(backdropEl, this.drawer);
  }

  /**
   * Send focus to the second focusable element ideally, else the first, which is the close button
   * @param {obj} drawer
   */
  setFocus(drawer) {
    const focusableEls = this.drawer.querySelectorAll(
      'button',
      'a',
      '[tabindex]'
    );
    if (focusableEls.length > 1) {
      focusableEls[1].focus();
    } else {
      focusableEls[0].focus();
    }
  }

  /**
   * Remove event listener from backdrop and remove the backdrop element from the DOM
   * @param {obj} drawer
   */
  removeBackdrop(drawer) {
    document.querySelector('.cbp-backdrop').remove();
    drawer.removeEventListener('click', this.handleBackdrop, true);
  }

  /**
   * Apply event listener 'click' on the backdrop to close the drawer
   */
  handleBackdrop() {
    const backdrop = document.querySelector('.cbp-backdrop');

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.close(this.drawer);
      });
    }
  }
}

export default Drawer;
