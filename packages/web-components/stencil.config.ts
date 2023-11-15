import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'cbp-web-components',
  globalStyle: 'src/global/styles/index.scss',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@cbpds/web-components',
      //proxiesFile: '../cbp-web-components-react/src/components.ts',
      proxiesFile: '../react-components/components/stencil-generated/index.ts',
    }),
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
