module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@whitespace/storybook-addon-html",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
        docs: false,
        measure: false,
        outline: false,
      }
    },
    'storybook-addon-dark-mode-toggle',
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  "staticDirs": [
    "../dist",
    "../assets",
  ],
  "framework": "@storybook/html",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  }
}