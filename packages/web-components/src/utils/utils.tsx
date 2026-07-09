export const createNamespaceKey = (prefix?: string): string => (prefix ? prefix + '-' : '') + (Math.random() + 1).toString(26).slice(2, 7);

/**
 * Generates a valid HTML ID from a string by slugifying it.
 * @param {string} str The input string.
 * @returns {string} A valid HTML ID string.
 */
export const createValidId = (str: string): string => {
  return str
    .normalize('NFKD')                // Split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '')  // Remove all the accents
    .trim()                           // Trim leading or trailing whitespace
    .toLowerCase()                    // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, '')      // Remove non-alphanumeric characters except hyphens and spaces
    .replace(/\s+/g, '-')             // Replace spaces with a single hyphen
    .replace(/-+/g, '-')              // Collapse multiple hyphens into a single hyphen
    .replace(/^-|-$/g, '');           // Remove leading or trailing hyphens
}

export const setCSSProps = <T extends { [key: string]: any }>(host: HTMLElement, { ...props }: T): void => {
  Object.entries(props).forEach(([key, value]): void => {
    try {
      // Still testing: Anything undefined should be skipped. Any other value is coerced into a string?
      if (value != undefined) {
        //console.log('setCSSProps: ', host, key, value, typeof value);
        host.style.setProperty(key, value);
      }

    } catch (e) {
      console.log('Error in setCSSProps: ', { host }, { key }, { value }, { e });
    }
  });
};


// For determining context of nested items when the parent context is inverted (e.g., renders dark context in light mode)
export const getInvertedContext = ( context : undefined | 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always'): 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always' => {
  switch (context) {
    case 'light-inverts':
      return 'dark-inverts';
    case 'dark-inverts':
      return 'light-inverts';
    case 'light-always':
      return 'dark-always';
    case 'dark-always':
      return 'light-always';
    default: 
      return 'dark-inverts' // if context is undefined, it acts like 'light-inverts', so return 'dark-inverts'
  }
}


export const getFocusableElements = (scope: HTMLElement) => {
  const not = {
    inert: ':not([inert]):not([inert] *)',
    negTabIndex: ':not([tabindex^="-"])',
    disabled: ':not(:disabled)',
  };
  const selectors = [
    `a[href]${not.inert}${not.negTabIndex}`,
    `area[href]${not.inert}${not.negTabIndex}`,
    `input:not([type="hidden"]):not([type="radio"])${not.inert}${not.negTabIndex}${not.disabled}`,
    `input[type="radio"]${not.inert}${not.negTabIndex}${not.disabled}`,
    `select${not.inert}${not.negTabIndex}${not.disabled}`,
    `textarea${not.inert}${not.negTabIndex}${not.disabled}`,
    `button${not.inert}${not.negTabIndex}${not.disabled}`,
    `details${not.inert} > summary:first-of-type${not.negTabIndex}`,
    `iframe${not.inert}${not.negTabIndex}`,
    `audio[controls]${not.inert}${not.negTabIndex}`,
    `video[controls]${not.inert}${not.negTabIndex}`,
    `[contenteditable]${not.inert}${not.negTabIndex}`,
    `[tabindex]${not.inert}${not.negTabIndex}`,
  ];
  //console.log(Array.from(scope.querySelectorAll(selectors.join(','))));
  return Array.from(scope.querySelectorAll(selectors.join(',')));
  //return Array.from(scope.querySelectorAll('[tabindex="0"],a[href],button,input,textarea,select'));
};

export const debounce = (callback, wait, prevent=false) => {
  let timer: ReturnType<typeof setTimeout> = null;;
  return (...args) => {
    if (prevent) {
      const e = args[0];
      e.preventDefault();
      e.stopPropagation();
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export const getElementAttrs = (el: HTMLElement): { [key: string]: any } => {
  let attrs = {};
  Array.from(el?.attributes || []).forEach(({ name, value }) => {
    attrs = {
      ...attrs,
      [name]: value,
    };
  });
  return attrs;
};

export const clamp = (min: number, n: number, max: number) : number => {
  return Math.max(min, Math.min(n, max));
};


// Handle common menu keyboard navigation within a collection of items
export const doKeyboardNav = (collection: any[], key, focusIndex: number = 0) : number => {
  const i = focusIndex;
  const l = collection?.length - 1 || 0;
  const n = {
    Home: 0,
    ArrowUp: -1 < i + -1 ? i + -1 : l,
    ArrowLeft: -1 < i + -1 ? i + -1 : l,
    ArrowDown: l + 1 > i + 1 ? i + 1 : 0,
    ArrowRight: l + 1 > i + 1 ? i + 1 : 0,
    End: l,
  }[key];
  if (n !== undefined) {
    focusIndex = n;
  }
  return focusIndex;
}

// TechDebt: Can this be simplified by leveraging e.composedPath() ?
export const clickAwayListener = (host: HTMLElement, callback: any) => {
  const tagName = host === null || host === void 0 ? void 0 : host.tagName.toLowerCase();
  if (!tagName) return;
  
  const events = ['click', 'touchend'];
  const eventHandler = ({ target }) => {
    const parentElement = target.closest(tagName);
    if (!parentElement) {
      callback({
        flag: false
      });
      cancelEvents();
    }
    else if (!parentElement.contains(host)) {
      if (!(parentElement === null || parentElement === void 0 ? void 0 : parentElement.parentElement.closest(tagName))) {
        callback({
          flag: true
        });
      }
    }
    else {
      if (parentElement.closest(tagName) != host) {
        callback({
          flag: true
        });
      }
    }
  };

  const cancelEvents = () => {
    events.forEach(e => {
      document.removeEventListener(e, eventHandler, false);
    });
  };
  events.forEach(e => {
    document.addEventListener(e, eventHandler);
  });
};

import {computePosition, flip, offset, shift} from '../../../../node_modules/@floating-ui/dom'; //Using Float UI, external documentation: https://floating-ui.com/

export interface floatUIProps {
  placement: 'top' | 'left' | 'bottom' | 'right',
  offset: number,
  flip: boolean,
  shift: boolean,
}

export const floatUI = (props: floatUIProps, referenceEl: HTMLElement, floatingEl: HTMLElement) => {
  
   let middleware = [];

    props.offset ? middleware.push(offset(props.offset)) : ``;
    props.flip ? middleware.push(flip()) : ``;
    props.shift ? middleware.push(shift()) : ``;

  computePosition(referenceEl, floatingEl, {
      placement: props.placement,
      middleware: middleware
    }).then(({x, y}) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
  });
}