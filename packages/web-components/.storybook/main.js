import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    //getAbsolutePath('@storybook/addon-essentials'), 
    {
      name: getAbsolutePath('@storybook/addon-essentials'),
      options: {
        actions: false,
      },
    },
    //getAbsolutePath('@chromatic-com/storybook'),
    {
      name: '@whitespace/storybook-addon-html', 
      title: 'Code',
    },
    //getAbsolutePath('@storybook/addon-themes'), 
    //getAbsolutePath('@storybook/addon-interactions'), 
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    '@chromatic-com/storybook'
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  docs: {},
  staticDirs: [
    '../dist',
    '../assets'
  ],
  core: {
    disableTelemetry: true
  },
};
export default config;
