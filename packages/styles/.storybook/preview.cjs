export const CUSTOM_VIEWPORTS = {
  small: {
    name: "Small Grid",
    styles: {
      width: "599px",
      height: "100%"
    },
    type: 'desktop'
  },
  medium: {
    name: "Medium Grid",
    styles: {
      width: "1023px",
      height: "100%"
    },
    type: 'desktop'
  },
  large: {
    name: "Large Grid",
    styles: {
      width: "1439px",
      height: "100%"
    },
    type: 'desktop'
  },
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    grid: {
      disable: true
    }
  },
  'data-theme-toggle': {
    querySelector: "html",
    "data-target": "cbp-theme",
    default: "light",
    values: {
      dark: "dark",
      light: "light",
    },
    lightFill: "#e5a000",
    darkFill: "#2e2e2e",
  },
  viewport: {
    viewports: CUSTOM_VIEWPORTS
  },
  html: {
    prettier: {
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: "strict",
      removeEmptyComments: true,
      removeComments: /^\s*remove me\s*$/,
    },
    highlighter: {
      showLineNumbers: true,
      wrapLines: true,
    },
    transform: (code) => {
      // DEG: keeping this as an example because it may solve other issues I've encountered
      // Remove attributes `_nghost` and `ng-reflect` injected by Angular:
      return code.replace(/(?:_nghost|ng-reflect).*?="[\S\s]*?"/g, "");
    },
  },
};