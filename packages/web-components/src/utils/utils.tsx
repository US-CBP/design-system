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

// Active listeners tracked per host element to allow removal and prevent duplicate listeners
const activeListeners = new WeakMap<HTMLElement, {
  eventHandler: (e: Event) => void;
  events: string[];
}>();

/**
 * Attaches or removes a clickaway listener for the given host element.
 * 
 * - When callback is provided: listens for clicks or touches outside of `host` (using `event.composedPath()`).
 *   If a clickaway occurs, the listener is removed and callback is invoked.
 * - When callback is null/undefined/falsy: removes any active clickaway listener for `host`.
 * - If called multiple times on the same host, existing listeners are removed before registering new ones.
 * - Returns a cleanup function that can be called to remove the listener manually.
 */
export const clickAwayListener = (host: HTMLElement, callback?: any): (() => void) => {
  if (!host || typeof document === 'undefined') {
    return () => {};
  }

  const events = ['click', 'touchend'];

  // Remove any previously registered listener for this host element
  const existing = activeListeners.get(host);
  if (existing) {
    existing.events.forEach(e => {
      document.removeEventListener(e, existing.eventHandler, false);
    });
    activeListeners.delete(host);
  }

  // If no callback is provided, we only needed to remove the existing listener
  if (!callback) {
    return () => {};
  }

  const cancelEvents = () => {
    events.forEach(e => {
      console.log('Removing clickaway listener for event: ', e);
      document.removeEventListener(e, eventHandler, false);
    });
    activeListeners.delete(host);
  };

  const eventHandler = (e: Event) => {
    // If the host element was disconnected from the DOM, clean up and return
    if (typeof host.isConnected === 'boolean' && !host.isConnected) {
      cancelEvents();
      return;
    }

    const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
    const target = (e.target || (path.length > 0 ? path[0] : null)) as Node | null;

    // Check if the event target or any element in the event path is within host
    const isInside = path.includes(host) || (target ? (target === host || (typeof host.contains === 'function' && host.contains(target))) : false);

    if (!isInside) {
      cancelEvents();
      callback({
        flag: false,
        event: e,
      });
    }
  };

  activeListeners.set(host, {
    eventHandler,
    events,
  });

  events.forEach(e => {
    console.log('Adding clickaway listener for event: ', e);
    document.addEventListener(e, eventHandler, false);
  });

  return cancelEvents;
};