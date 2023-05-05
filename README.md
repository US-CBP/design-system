# [ALPHA] U.S. Customs and Border Protection (CBP) Design System

The CBP Design System (1.0) exists to provide a unifying user experience and reduce redundant front-end code within the US Customs and Border Protection enterprise suite of applications and websites. This is the next evolution of our first effort, the [CBP Theme (1.X)](https://us-cbp.github.io/cbp-style-guide).

> **⚠️ The CBP Design System (1.0) is still in a stage of very active development.** As such, much of the code base is still somewhat fragile and may break at any time. While we encourage you to explore our offerings, please do so with the knowledge that the codebase in these repositories will change rapidly and with little warning. Use at your own risk. We will communicate when a stable release will be made available.

## Development

> **This is an `npm` workspace and commands need to run with the `--workspace` flag if you are not using the scripts in the `package.json`**

```bash
$ cd design-system
$ npm install
$ npm run vanilla-build    # runs vite build to build out css and js in vanilla package
$ npm run vanilla-sb       # runs storybook for the vanilla package
$ npm run vanilla-dev      # run the vanilla dev server
```

The CBP Design System repo is set up as a monorepo that uses the "workspaces" feature from `npm` for managing multiple packages from a singular top-level, root package. [[NPM Workspaces]](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

After running `npm install` from the root-level you can start the `vanilla` package dev server by running `npm run vanilla-dev` and visiting `localhost:8000`.

Running `npm run vanilla-build` will create the distribution package that contains the bundled JavaScript and CSS files that will be deployed to a registry when a release is ready to be deployed. 

## Contents

**Vanilla**

The `vanilla` package is the `HTML` Storybook using JavaScript, HTML & SCSS. The package holds the codebase for the Vanilla JS, HTML & CSS/SCSS styles of the overall brand and theme. This package includes design tokens, assets, HTML patterns and SCSS code as well as the configs to manage the design tokens using `style-dictionary`. 

### Contributing

We welcome contributions, please see our [Contribution Policy](https://github.com/US-CBP/open-source-policy/blob/master/CONTRIBUTING.md)

### License
Please refer to [CBP Open Source License](https://github.com/US-CBP/open-source-policy/blob/master/LICENSE.md)