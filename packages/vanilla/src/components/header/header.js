export class UniversalHeader {
  constructor (univHeader) {
    this.univHeader = univHeader;
    this.mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.previousScrollPosition = 0;
    this.throttleWait;

    window.addEventListener('scroll', () => {
      this.handleHeaderScroll();
    })
  }

  isScrollingDown() {
    let currentScrolledPosition = window.scrollY || window.pageYOffset;
    let scrollingDown;
  
    if (currentScrolledPosition > this.previousScrollPosition) {
      scrollingDown = true;
    } else {
      scrollingDown = false;
    }
  
    this.previousScrollPosition = currentScrolledPosition;
    return scrollingDown;
  }

  handleHeaderScroll = () => {
    if (this.isScrollingDown() && !this.univHeader.contains(document.activeElement)) {
      this.univHeader.classList.add('scroll-down');
      this.univHeader.classList.remove('scroll-up');
    } else {
      this.univHeader.classList.add('scroll-up');
      this.univHeader.classList.remove('scroll-down');
    }
  }
}