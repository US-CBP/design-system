# CHANGELOG

This CHANGELOG.md tracks the updates to the web components package of the CBP design system, which is currently in active development/pre-release alpha state. As such, not all changes will be logged; only new components and breaking changes. As a pre-release, there WILL be breaking changes. Upon official release, this log may be wiped clean and started fresh.

The React components are wrappers generated from this package and will share the same changes.

## [0.0.1-develop.15] TBD

* First cut of `cbp-pagination`.
* First cut of `cbp-usa-banner`.
* Added multi-select support to `cbp-dropdown`.
* Added the ability to set Dropdown selections based on `value` (supports pagination).
* Added the ability to slot a custom icon into the `cbp-chip` component.
* Added interactive card variants and functionality.
* Additional bug fixes per design review.

## [0.0.1-develop.14] 09-16-2024

* First cut of `cbp-notice`.
* First cut of `cbp-dropdown`.
* First cut of `cbp-checkbox`.
* Additional bug fixes per design review.

## [0.0.1-develop.13] 09-03-2024

* Added variants to the `cbp-list` component.
* Fixed a JavaScript error in Tabs when one tab is marked selected.
* Updated `cbp-icon` with additional icons and assuring that all icons are rendered as square. This fixes numerous sizing and alignment issues with lists and buttons using icons.
* Added `--cbp-responsive-spacing-gap` token/variable to core.css in `cbp-app`.
* Audited and improved accessibility of patterns built with `cbp-form-field` and optionally `cbp-form-field-wrapper` components.
* Additional bug fixes per design review.

## [0.0.1-develop.12] 08-07-2024

* First cut of `cbp-form-field-wrapper`, a child component to wrap text inputs, supporting overlays and attached buttons required for numerous input patterns.
* First cut of `cbp-list`, encapsulating design system styles for lists.
* Implement dark mode for `cbp-expand` and `cbp-segmented-button-group`.
* Refactored `cbp-button` CSS API to expose dark mode variables, needed for dark mode updates in segmented button groups, tabs, expand, and accordion.
* Additional bug fixes per design review.

## [0.0.1-develop.11] 07-19-2024

* First cut of `cbp-form-field`, a wrapper for form controls.
* First cut of `cbp-banner`, implementing the informational variant.
* First cut of `cbp-dialog` (may be renamed to `cbp-modal`).
* Updated `cbp-hide` to emit an event when its state is toggled.
* Fixed `cbp-app` so that its dark mode detection is reactive to changes of the user's preferences.
* Implemented dark mode for tabs, structured list, cards, badges, chips, and tags.
* Additional bug fixes per design review.
* Storybook upgrade and updates.

## [0.0.1-develop.10] 06-10-2024

* Implemented dark mode for buttons, links, typography, accordion, drawer, and panel comprised of additional CSS and a `context` property to trigger a specific design contextually and specify whether it inverts or remains constant.
* Updated stories for footer, universal header, structured list (footer/action bar), drawer, and template with dark mode-related changes.

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