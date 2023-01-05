/**
 * Notes:
 * 1. For focus trapping, display: "none"/"inherit" is set when closing/opening so that
 *    tabbing while the drawer is closed/open puts the focus order on the page correctly.
 *
 * Bugs:
 * 
 * 1. When closed, the drawer should be out of the focus order of the page
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
    
    this.addListeners(this.openBtn, this.closeBtn)
  }

  addListeners(openBtn, closeBtn) {
    openBtn.addEventListener('click', () => this.open(this.drawer))
    closeBtn.addEventListener('click', () => this.close(this.drawer))
  }

  /**
   * Drawer is open by adding .active to .cbp-drawer classList
   * @param {obj} drawer 
   */
  open(drawer) {
    drawer.style.display = "inherit";
    drawer.classList.toggle('active')
    drawer.style.boxShadow = '5px 0px 25px 5px rgba(0, 0, 0, 0.5)';
    this.addBackdrop()
    this.handleBackdrop();
  }
  
  /**
   * Drawer is closed by removing .active class from .cbp-drawer classList
   * @param {obj} drawer 
   */
  close(drawer) {
    const isActive = drawer.classList.contains('active');

    if (isActive) {
      drawer.classList.remove('active')
      drawer.style.boxShadow = 'unset';
      this.removeBackdrop(drawer);
      drawer.style.display = "none";
    }
  }
  
  addBackdrop () {
    const backdropEl = document.createElement('div');
    const parentEl = this.drawer.parentNode;
    backdropEl.classList.add('cbp-backdrop', 'active');
    parentEl.insertBefore(backdropEl, this.drawer);
  }


  /**
   * Remove event listener from backdrop and remove the backdrop element from the DOM
   * @param {obj} drawer 
   */
  removeBackdrop(drawer) {
    drawer.removeEventListener('click', this.handleBackdrop, true);
    document.querySelector('.cbp-backdrop').remove();
  }

  /**
   * Apply event listener 'click' on the backdrop to close the drawer
   */
  handleBackdrop() {
    const backdrop = document.querySelector('.cbp-backdrop');
    
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.close(this.drawer)
      })
    }
  }
}

export default Drawer;
