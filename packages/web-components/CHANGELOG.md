# CHANGELOG

This CHANGELOG.md tracks the updates to the web components package of the CBP design system, which is currently in active development/pre-release alpha state. As such, not all changes will be logged; only new components and breaking changes. As a pre-release, there WILL be breaking changes. Upon official release, this log may be wiped clean and started fresh.

The React components are wrappers generated from this package and will share the same changes.

## [unpublished] TBD

* Implemented dark mode for buttons, links, typography, accordion, drawer, and panel comprised of additional CSS and a `context` property to trigger a specific design contextually and specify whether it inverts or remains constant.
* Updated stories for footer, universal header, segmented list (footer/action bar), drawer, and template with dark mode-related changes.

## [0.0.1-develop.9] 05-13-2024

* First cut of `cbp-expand`.
* First cut of `cbp-structured-list` and `cbp-structured-list-item`.
* Updates to `cbp-icon` and `cbp-button` in support of Expand and Accordion components.
* Renamed `data-container-theme` to `data-cbp-container-context` to convey that a specific container/DOM node is being displayed light or dark.

## [0.0.1-develop.8] 04-29-2024

* First cut of `cbp-accordion` and `cbp-accordion-item` components.
* Fixed reactivity of the `rotate` property on `cbp-icon`.
* Updates to `cbp-button` in support of the Accordion.

## [0.0.1-develop.7] 04-16-2024

* Add props to `cbp-universal-header` to specify locations of images.
* Fixed rounded corners on anchors in decision cards.
* Upgraded web component package to Stencil 4.15.0 and Storybook 8.x.
* Added Custom Element Component Analyzer and Web Component Storybook helpers to the web components package.
* Added design token documentation to Storybook.
* Fixed auto-deployment of Web Components Storybook to GitHub pages.

## [0.0.1-develop.6] 03-20-2024

* Set the Stencil config setting `enableImportInjection: true` to support projects using Vite as a bundler and allow lazy loading of components.
* Breaking: Deprecated/removed `cbp-visuallyhidden` since its functionality was included in cbp-hide.
* First cut of cbp-hide, a component that allows content to be programatically hidden (or visually hidden) based on property or media query.
* Updated designs of `cbp-badge`, `cbp-chip`, and `cbp-tag` to use the correct design tokens.
* Updated the cbp-chip component by adding `name` and `value` properties and updating the custom event.
* Updated Template and Universal Header stories to use `cbp-hide` for responsiveness.
* Updated the Template to wrap the Universal Header and Application Header in an HTML5 `header` landmark tag.

## [0.0.1-develop.5] 02-29-2024

* First cut of tabs with responsive behavior: cbp-tabs, cbp-tab, cbp-tab-panel.
* Updates to cbp-button to support responsive tabs controls.
* Fixed cbp-drawer close control.
* Upgraded Stencil to v4.12.3 and enabled new `slot` fixes.

## [0.0.1-develop.4] 01-08-2024

* Added cbp-drawer backdrop.