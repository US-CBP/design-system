export const createNamespaceKey = (prefix?: string): string => (prefix ? prefix + '-' : '') + (Math.random() + 1).toString(26).slice(2, 7);

export const setCSSProps = <T extends { [key: string]: any }>(host: HTMLElement, { ...props }: T): void => {
  
    Object.entries(props).forEach(([key, value]): void => {
    try {
      typeof value == 'string' ? host.style.setProperty(key, value) : host.style.setProperty(key, `${value}`);
    }
    catch(e) {
      console.log('Error in setCSSProps: ', {host}, {key}, {value}, {e});
    }
  });
};
