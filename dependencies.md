# Dependencies

The follow major dependencies are used in this repo and devops pipeline:

## StencilJS

StencilJS is the library used to build the web components. This library should be upgraded periodically to obtain the latest bugfixes and other improvements.

## React Output Target

The React Output Target creates React wrapper components (via npm run build-all ), which are published as a separate npm package from our mono-repo.

## Storybook

Storybook is a rapidly moving target, releasing roughly twice a year. Upgrading is easier since deprecating our Vanilla package, but care should be taken that the Storybook plugins being used work with the latest releases before upgrading.

### Storybook Tag Badges Add-on

Allows adding status badges to the left navigation in Storybook, such as "beta" or "new". [https://github.com/Sidnioulz/storybook-addon-tag-badges]

### Storybook HTML Add-on

Shows compiled HTML (that updates with control values) in a tab in Storybook. [https://github.com/whitespace-se/storybook-addon-html]

## Vite

Vite is a bundler (replacing webpack and using esbuild under the hood) being used by both Stencil and Storybook.

## Lerna

Lerna manages the mono-repo, working with npm workspaces and allowing multiple packages under a single repository to share dependencies.

## GitHub Actions

* Checkout - [https://github.com/actions/checkout/]
* Setup-Node - [https://github.com/actions/setup-node]
* Storybook to Github Pages - [https://github.com/bitovi/github-actions-storybook-to-github-pages/]

## Node.js

The nodejs ecosystem continues to move forward and we need to update and re-test periodically. When upgrading node.js version, be sure to update them in the GitHub actions as well for releases and deployments.
