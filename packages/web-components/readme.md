# Using the CBP Design System Web Components

## Including the Web Components in Your Application

There are a couple strategies for including the CBP Design System web components in your site or application, detailed below.

### Node Modules

The CBP Design System [web components](https://www.npmjs.com/package/@cbpds/web-components) (and [React wrappers](https://www.npmjs.com/package/@cbpds/react-components)) are published to npm.

In modern JavaScript frameworks, you can use the native web components, which are framework-agnostic. To add the CBP Design System web components to your project, do the following:

- Add the package to your `package.json` under "devDependencies" (e.g., `"@cbpds/web-components": "latest",`) and run `npm install` or
- Run `npm install @cbpds/web-components --save-dev`
- Import the web components loader in your framework's top-level file such as `App.js|jsx|tsx` or `main.js|jsx|tsx`.
- Call `defineCustomElements()` to initialize the loader and register the web components (to be lazy loaded when used).

```
import { defineCustomElements } from '@cbpds/web-components/dist/esm/loader.js';

defineCustomElements();
```

### Script tag

For sites not running in a node.js environment or requiring a build step, the web components may be included via script tag:

- Put a script tag referencing the loader module in the head of your index.html or template file.
  - This file is a loader, which registers all of the design system components and lazy-loads individual components as needed.
  - Note: ESM modules must be delivered over SSL/https.
  - Then you can use the web components (custom elements) anywhere in your template, JSX, html, etc.

You can use UNPKG (an open source global content delivery network that mirrors npm) for testing, but it should never be used for production apps.

Referencing the latest version:

```
<script type="module" src="https://unpkg.com/@cbpds/web-components/dist/cbp-web-components/cbp-web-components.esm.js"></script>
```

Referencing a specific version:

```
<script type="module" src="https://unpkg.com/@cbpds/web-components@0.0.1-develop.20/dist/cbp-web-components/cbp-web-components.esm.js"></script>
```

Ideally, your application should reference a central, organization-hosted copy of the files or pull the package's  `dist/cbp-web-components` directory into your application's "assets" directory and reference them as such:

```
<script type="module" src="./assets/cbp-web-components/cbp-web-components.esm.js"></script>
```

## Using the Web Components

Once the CBP Design System web components have been included in your site or application, they may be used in HTML, JSX, etc.

It is recommended that the [`cbp-app` web component](https://us-cbp.github.io/design-system/?path=/docs/components-app-specifications--docs) is used to wrap the entire contents of your application or site template to include the global CSS variables (design tokens) that are used throughout the design system for styling the components.

To get started quickly, you may copy the markup from one of our ["template" stories](https://us-cbp.github.io/design-system/?path=/story/patterns-page-templates--internal) to wrap your application or site content.

Here's an example of a button component:

```
<cbp-button
  fill="solid"
  color="primary"
>
  Default
</cbp-button>
```

## Fonts and Assets

Regardless of how you include the web components (either method above), you'll still need some assets that are part of the CBP Design System package but are not encapsulated in the `cbp-app` web component or any others:

Copy the files in `node_modules/@cbpds/web-components/dist/assets/` to your application /assets directory. (This may be automated with a "copy" command in your application). This directory includes the Roboto font files, their CSS font face definitions, and the CBP Seal, which is used in multiple places and may be referenced as a favicon.

The Roboto font family is part of the CBP Design System standards, but must be linked manually in your application's `<head>` as well.

Copy and paste the following into your index.html or template file:

```
<link rel="icon" type="image/svg+xml" href="assets/images/cbp-seal.svg">
<link rel="stylesheet" type="text/css" href="./assets/css/roboto.css">
<link rel="stylesheet" type="text/css" href="./assets/css/roboto_mono.css">
```

These CSS files assume a directory structure of:

- webroot
  - assets
    - css
    - fonts
      - roboto
      - roboto-mono
    - images

Any deviations from this structure may require editing of the linked CSS files and paths to the fonts.

If the path to your application's assets folder is different than `"./assets"`, you may also need to provide the paths as properties of the `cbp-universal-header` component as part of your site/application template.
