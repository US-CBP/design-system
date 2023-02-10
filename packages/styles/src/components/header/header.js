export const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector('[data-header="flow"]');
let previousScrollPosition = 0;
let throttleWait;

const isScrollingDown = () => {
  let currentScrolledPosition = window.scrollY || window.pageYOffset;
  let scrollingDown;

  if (currentScrolledPosition > previousScrollPosition) {
    scrollingDown = true;
  } else {
    scrollingDown = false;
  }

  previousScrollPosition = currentScrolledPosition;
  return scrollingDown;
}

export const handleHeaderScroll = () => {
  if (isScrollingDown() && !header.contains(document.activeElement)) {
    header.classList.add('scroll-down');
    header.classList.remove('scroll-up');
  } else {
    header.classList.add('scroll-up');
    header.classList.remove('scroll-down');
  }
}

export const throttle = (callback, time) => {
  if (throttleWait) return;

  throttleWait = true;

  setTimeout(() => {
    callback();

    throttleWait = false;
  }, time)
}