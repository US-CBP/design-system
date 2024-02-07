export const createNamespaceKey = (prefix?: string): string => (prefix ? prefix + '-' : '') + (Math.random() + 1).toString(26).slice(2, 7);

export const getFocusableElements = (scope: HTMLElement) => {
  return Array.from(scope.querySelectorAll('[tabindex=0],a[href],button,input,textarea,select'));
}

export const setCSSProps = <T extends { [key: string]: any }>(host: HTMLElement, { ...props }: T): void => {
  
    Object.entries(props).forEach(([key, value]): void => {
    try {
      //console.log('setCSSProps: ',{host},{key},{value}, typeof value);
      // Any value other than undefined is coerced into a string?
      //host.style.setProperty(key, value != undefined ? value : '');
    
      (typeof value == 'string')
        ? host.style.setProperty(key, value) 
        : host.style.setProperty(key, value != undefined ? `${value}` : '');
    }
    catch(e) {
      console.log('Error in setCSSProps: ', {host}, {key}, {value}, {e});
    }
  });
};

