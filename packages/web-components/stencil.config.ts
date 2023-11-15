import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'cbp-web-components',
  globalStyle: 'src/global/styles/index.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: 'loader',
      copy: [
        { src: '../assets', dest: 'dist/assets' }
       ],
    },
    {
      type: 'dist-custom-elements',
      copy: [
        { src: '../assets', dest: 'dist/assets' }
      ],
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: '../assets', dest: './assets' }
      ],
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass()
  ],
  testing: {
    browserHeadless: "new",
  },
};
