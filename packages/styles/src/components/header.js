export const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector('header');
const appHeader = document.querySelector('.cbp-application-header');
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
    appHeader.classList.add('scroll-down');
  } else {
    header.classList.add('scroll-up');
    header.classList.remove('scroll-down');
    appHeader.classList.add('scroll-up');
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