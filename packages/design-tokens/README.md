# @cbpds/vdesign-tokens

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](/LICENSE)

> Design Tokens for the U.S. Customs & Border Protection Design System.

## Getting Started

Design Tokens may be used outside of the design system components to assure consistency in colors, branding, and other tokenized aspects of visual design.

If using the CBP Design System web components, the design tokens are already packaged within the `cbp-app` component and exposed as root-level CSS variables for use by the web components and the entire application.

The design token package builds both SASS (SCSS) and CSS distributable files under the packages/design-tokens/dist folder by running the following command at the project level:

`npm run build-tokens`

Or the following command at the package level:

`npm run sd`

### CSS

The compiled and minified CSS is located in:

```
/packages/design-tokens/dist/css/cbp-design-tokens.css
```

### SCSS

The compiled and minified CSS is located in:

```
/packages/design-tokens/dist/sass/
```
