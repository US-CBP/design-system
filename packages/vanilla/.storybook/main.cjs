const { dirname, join } = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@whitespace/storybook-addon-html'),
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        measure: false,
        outline: false,
      },
    },
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  staticDirs: ['../dist', '../assets'],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {},
  },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },

  features: {
    //storyStoreV7: true,
  },
};
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
