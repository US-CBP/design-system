module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@whitespace/storybook-addon-html',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        measure: false,
        outline: false,
      },
    },
    '@storybook/addon-styling',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  staticDirs: ['../dist', '../assets'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
};
