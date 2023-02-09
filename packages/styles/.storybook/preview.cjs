export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
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