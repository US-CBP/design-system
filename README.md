# [ALPHA] U.S. Customs and Border Protection (CBP) Design System

The CBP Design System (1.0) exists to provide a unifying user experience and reduce redundant front-end code within the US Customs and Border Protection enterprise suite of applications and websites. This is the next evolution of our first effort, the [CBP Theme (1.X)](https://us-cbp.github.io/cbp-style-guide).

> **⚠️ The CBP Design System (1.0) is still in a stage of very active development.** As such, much of the code base is still somewhat fragile and may break at any time. While we encourage you to explore our offerings, please do so with the knowledge that the codebase in these repositories will change rapidly and with little warning. Use at your own risk. We will communicate when a stable release will be made available.

<!-- ## Installation -->

<!-- The recommended way to get the latest CBP Design System package is by saving it as a dependency via [npm](https://docs.npmjs.com/getting-started/what-is-npm).

From your npm project, simply run:

`npm install cbp-ds --save` -->

## Development

> **This is an `npm` workspace and commands need to run with the `--workspace` flag if you are not using the scripts in the `package.json`**

```bash
$ cd design-system
$ npm install
$ npm run styles-dev      # run the styles dev server
$ npm run styles-build      # runs vite build
```

After running `npm install` you can start the `styles` package dev server by running `npm run styles-dev` and the page should
load locally through `port 8000`.

After running `npm run styles-build`, you will have a `dist` folder in the `packages/styles` folder that contains the `CSS` and `JavaScript` files for distribution. 

## Contents

**Styles**

The `styles` package is where the Design System codebase for building websites and applications is stored. This repo only holds the Design System codebase, all UX guidance will be in the [UX Guidelines](https://us-cbp.github.io/cbp-theme/design-system/).

**Components**

The `components` package houses the React components in Storybook that also provides a visual showcase of UI components from the CBP Design System. The static site allows frontend developers to play around with components in an isolated environment to document and test UI components.


<!-- 
The [UX Guidelines](https://us-cbp.github.io/cbp-theme/design-system/) site offers robust examples, user experience guidance, code instruction and best practices for using the CBP Design System that follow its core principles. You can find the source code for the site in [ds-ux-guidelines](https://github.com/US-CBP/cbp-theme/tree/master/ds-ux-guidelines). This repo is strictly for housing the codebase for the style guide site. -->

### Contributing

We welcome contributions, please see our [Contribution Policy](https://github.com/US-CBP/open-source-policy/blob/master/CONTRIBUTING.md)

### License
Please refer to [CBP Open Source License](https://github.com/US-CBP/open-source-policy/blob/master/LICENSE.md)