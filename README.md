# [ALPHA] U.S. Customs and Border Protection (CBP) Design System

[![Build Status](https://travis-ci.org/US-CBP/cbp-theme.svg?branch=design-system)](https://travis-ci.org/US-CBP/cbp-theme)

[![npm version](https://badge.fury.io/js/cbp-ds.svg)](https://badge.fury.io/js/cbp-ds)

The CBP Design System (1.0) exists to provide a unifying user experience and reduce redundant front-end code within the US Customs and Border Protection enterprise suite of applications and websites. This is the next evolution of our first effort, the [CBP Theme (1.X)](https://us-cbp.github.io/cbp-style-guide).

> **⚠️ The CBP Design System (1.0) is still in a stage of very active development.** As such, much of the code base is still somewhat fragile and may break at any time. While we encourage you to explore our offerings, please do so with the knowledge that the codebase in these repositories will change rapidly and with little warning. Use at your own risk. We will communicate when a stable release will be made available.

<!-- ## Installation -->

<!-- The recommended way to get the latest CBP Design System package is by saving it as a dependency via [npm](https://docs.npmjs.com/getting-started/what-is-npm).

From your npm project, simply run:

`npm install cbp-ds --save` -->

## Development

> **This is an NPM Workspace and commands need to be run in their respective workspaces**

```bash
$ npm install
$ npm run styles-build    # build the styles package
$ npm run styles-dev      # run the styles dev server
$ npm run start-sb        # run storybook instance
```

## Contents

**Styles**

The `styles` package is where the Design System codebase for building websites and applications is stored. This repo only holds the Design System codebase, all UX guidance will be in the [UX Guidelines](https://us-cbp.github.io/cbp-theme/design-system/).

**Components**

The `components` package houses the React components in Storybook that also provides a visual showcase of UI components from the CBP Design System. The static site allows frontend developers to play around with components in an isolated environment to document and test UI components.


<!-- 
The [UX Guidelines](https://us-cbp.github.io/cbp-theme/design-system/) site offers robust examples, user experience guidance, code instruction and best practices for using the CBP Design System that follow its core principles. You can find the source code for the site in [ds-ux-guidelines](https://github.com/US-CBP/cbp-theme/tree/master/ds-ux-guidelines). This repo is strictly for housing the codebase for the style guide site. -->

### License
Please refer to [CBP Open Source License](https://github.com/US-CBP/open-source-policy/blob/master/LICENSE.md)