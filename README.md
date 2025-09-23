<p align="center">
  <img src="packages/web-components/assets/images/cbp-seal.svg" height="200" width="200" />
</p>

<h1 align="center">[BETA] U.S. Customs and Border Protection (CBP) Design System</h1>

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](/LICENSE)
[![Open-Source: Policy](https://img.shields.io/badge/Open--Source-Policy-f39f37)](https://github.com/US-CBP/open-source-policy/blob/master/policy.md)

The CBP Design System (1.0) exists to provide a unifying user experience and reduce redundant front-end code within the US Customs and Border Protection enterprise suite of applications and websites. This is the next evolution of our first effort, the [CBP Theme (1.X)](https://us-cbp.github.io/cbp-style-guide).

> **⚠️ The CBP Design System (1.0) is still in active development.** As such, breaking changes may be introduced but will be documented as such. While we encourage you to explore our offerings, please do so with the knowledge that the codebase in these repositories may change. Use at your own risk. We will communicate when a stable release will be made available.

## Contents

This project is set up as a monorepo, containing multiple packages. Current efforts are focused on the web components package as the single source of truth from which the React components are generated during the build process.

`npm install` should be run within each of the packages subdirectories you wish to run locally.

| Package Name                    | Description                                         |
|---------------------------------|-----------------------------------------------------|
| design-tokens (_WIP_)           | Design Tokens                                       |
| @cbpds/web-components (_WIP_)   | Web components library                              |
| @cbpds/react-components (_WIP_) | React components library (for React 18 and lower)   |
| ux-guidelines  (_WIP_)          | Guidance for patterns, components and design tokens |

## Contributing

We welcome contributions, please see our [Contribution Policy](https://github.com/US-CBP/open-source-policy/blob/master/CONTRIBUTING.md)

Read and follow the steps in the [Project Setup Wiki](https://github.com/US-CBP/design-system/wiki/Project-Setup) to fork the repo and start contributing!