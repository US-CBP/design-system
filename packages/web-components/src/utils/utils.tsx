export const createNamespaceKey = (prefix?: string): string => (prefix ? prefix + '-' : '') + (Math.random() + 1).toString(26).slice(2, 7);

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

export const setCSSProps = <T extends { [key: string]: any }>(host: HTMLElement, { ...props }: T): void => {
  Object.entries(props).forEach(([key, value]): void => {
    try {
      //console.log('setCSSProps: ',{host},{key},{value}, typeof value);
      // Any value other than undefined is coerced into a string?
      //host.style.setProperty(key, value != undefined ? value : '');

      typeof value == 'string' ? host.style.setProperty(key, value) : host.style.setProperty(key, value != undefined ? `${value}` : '');
    } catch (e) {
      console.log('Error in setCSSProps: ', { host }, { key }, { value }, { e });
    }
  });
};

export const debounce = <T extends { [key: string]: any }>({ callback, ms, prevent }: T) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    if (prevent) {
      const e = args[0];
      e.preventDefault();
      e.stopPropagation();
    }
    clearTimeout(timer);
    timer = setTimeout(callback, ms, ...args);
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

export const clamp = (min: number, n: number, max: number) => {
  return Math.max(min, Math.min(n, max));
};


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
