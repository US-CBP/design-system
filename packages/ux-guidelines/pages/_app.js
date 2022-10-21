import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'styles/dist/styles.min.css';

config.autoAddCss = false

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  // javascript needs to be available on client-side hence the use of useEffect()
  useEffect(() => {
    import('styles/dist/bundle')
  }, [])

  return (
    <Component {...pageProps} />
  )
}