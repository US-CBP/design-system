module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
        measure: false,
        outline: false,
      }
    },
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          implementation: require("sass"),
        },
      },
    },
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@whitespace/storybook-addon-html",
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