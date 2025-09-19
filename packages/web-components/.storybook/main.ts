// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/web-components-vite';

import path from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (packageName: string): any =>
  path.dirname(require.resolve(path.join(packageName, 'package.json')));
 
const config: StorybookConfig  = {
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
  stories: [
    '../src/**/*.mdx',
    //'../src**/*.md',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    getAbsolutePath('@storybook/addon-themes'), 
    getAbsolutePath('@storybook/addon-a11y'), 
    getAbsolutePath("@chromatic-com/storybook"), 
    "@whitespace/storybook-addon-html",
    getAbsolutePath("storybook-addon-tag-badges"), 
    getAbsolutePath("@storybook/addon-docs")
  ],
  staticDirs: [
    '../dist',
    '../assets'
  ],
  core: {
    disableTelemetry: true
  },
};
export default config;