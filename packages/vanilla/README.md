# @cbpds/vanilla

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](/LICENSE)

> Vanilla UI pattern library for the U.S. Customs & Border Protection

## Getting Started

To install `@cbpds/vanilla` in your project, run the following command using npm:

`npm install --save-dev @cbpds/vanilla`

If you prefer Yarn, use the following command instead:

`yarn add @cbpds/vanilla --dev`

### CSS

The compiled and minified styles of the `@cbpds/vanilla` package are located in:

```
/node_modules/@cbpds/vanilla/dist/style.css
```

### JavaScript

The compiled and minified styles of the `@cbpds/vanilla` package are located in:

```
/node_modules/@cbpds/vanilla/dist/bundle.js
```

### SCSS

`@cbpds/vanilla` uses [Sass](https://www.npmjs.com/package/sass) to compile the projects styles. If your project requires the use of Sass, you can bring in all styles from the `@cbpds/vanilla` by including `/dist/sass/main.scss` in your Sass files.

```scss
@use '@cbpds/vanilla/dist/sass/main.scss'
```

## Package Contents

```
@cbpds/vanilla/
|-- dist/
|   |-- style.css
|   |-- bundle.js
|   |-- sass/
|       |-- main.scss
|       |-- tokens/
|       |-- components/
|   |-- assets/
```

## Contributing

We welcome contributions, please see our [Contribution Policy](https://github.com/US-CBP/open-source-policy/blob/master/CONTRIBUTING.md)

Read and follow the steps in the [Project Setup Wiki](https://github.com/US-CBP/design-system/wiki/Project-Setup) to fork the repo and start contributing!