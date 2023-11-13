import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'cbp-web-components',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@cbpds/web-components',
      //proxiesFile: '../cbp-web-components-react/src/components.ts',
      proxiesFile: '../react-components/components/stencil-generated/index.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: 'loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
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
