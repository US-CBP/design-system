// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/web-components-vite';
//import type { StorybookConfig } from '@stencil/storybook-plugin'; // for testing
import path from 'path';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (packageName: string): any =>
  path.dirname(require.resolve(path.join(packageName, 'package.json')));

const config: StorybookConfig  = {
  framework: {
    //name: "@stencil/storybook-plugin" // TODO: try out the stencil plugin to see what it has to offer
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    "@whitespace/storybook-addon-html",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "storybook-addon-tag-badges",
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest"
  ],
  staticDirs: [
    { from: '../dist', to: '/dist' },
    { from: '../assets', to: '/assets' },
    { from: '../llms', to: '/llms' },
    { from: '../llms.txt', to: '/' },
  ],
  core: {
    disableTelemetry: true
  },
  features: {
    backgrounds: false, // 👈 disable the backgrounds feature
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');
 
    if (configType === 'DEVELOPMENT') {
      // Your development configuration goes here
    }
    if (configType === 'PRODUCTION') {
      // Your production configuration goes here.
    }
    return mergeConfig(config, {
      // Your environment configuration here
    });
  },

};
export default config;