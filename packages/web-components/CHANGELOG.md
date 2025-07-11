# CHANGELOG

This CHANGELOG.md tracks the updates to the web components package of the CBP design system, which is currently in active development/beta state. As such, not all changes will be logged; only new components and breaking changes. As a beta release, there WILL be breaking changes. Upon official release, this log may be wiped clean and started fresh and [semantic versioning](https://semver.org/) will be followed.

The React components are wrappers generated from this package and will share the same changes. Projects using React 19 may use the native web components without React wrappers.

## [unreleased] TBD

* BREAKING: Updated the `cbp-button` properties of `expanded` and `pressed` to a string union of `"true" | "false"` rather than a true Boolean value.
  * This is due to the fact that JSX does not render the `aria-expanded` or `aria-pressed` at all with a false value.
  * When `aria-expanded="false"` is not rendered, the statefulness of the control is not conveyed to screen readers and updates to the state are only spoken when the value is true.
  * These properties are primarily used internally and this change is unlikely to cause significant problems.
  * Components updated to work with this change include: Accordion Item, Expand, Menu, Code Snippet, Subnav Item, and Segmented Button Group.
  * Story code was updated and may need to be copied fresh for: 
    * Segmented Button Group (only if Button "pressed" values were explicitly set as a boolean HTML attribute).
    * Button (only if `pressed` or `expanded` props were used).

## [0.0.1-develop.22] 07-02-2025

* First cut of the `cbp-resize-observer` component.
* Updated `cbp-app-header` with responsive functionality using the Resize Observer and Drawer components.
  * BREAKING: This functionality relies on a loose integration with Drawer, as it is part of the Story and not rendered by the component directly. You may need to update your code from the latest Storybook story accordingly.
  * If your Application Header has no Navigation Items other than the Home link, there is no update needed.
* Updated `cbp-breadcrumb` with responsive functionality using the Resize Observer and Menu components.
* Updated `cbp-dropdown` to accept Space as a filter character (just not as the first character).
* Minor bugfixes/updates to `cbp-menu`.
* Add a vscode output target to Stencil config, which will add it to the npm package.
  * Added component descriptions to JSDocs for code insight.
  * Added missing slots to JSDocs.

## [0.0.1-develop.21] 06-05-2025

* A number of visually breaking changes were introduced in this release. These changes were undertaken with much consideration. However, we felt that the changes streamline using the Button, Link, and Icon components - some of the most-used components in the design system - enough to warrant the changes at this early stage in the design system development.
  * Updated the way icons are spaced apart from text within `cbp-button`, `cbp-link`, and `cbp-tag` components, now using a CSS property for the `gap`. Any instances of applying margins to the icon or text (via `sx` or custom CSS) will need to be removed to avoid doubling up the spacing. The following stories were updated and may need to have copied code updated in consuming applications: Cards (action buttons icon in title), Table (sortable headers), Universal Header and the universal header content in all templates and archetype pages.
  * Updated the ghost button hover states (colors) to avoid some scenarios where the hover state is too low contrast on different backgrounds.
  * Additionally, the horizontal padding on `cbp-button` was slightly reduced from .75rem to .5rem, allowing icon buttons to be square without specifying the `variant="square"` explicitly.
  * Updated the default `cbp-icon` size from "1em" to "1rem". This is because most icons alongside plain text (14px) are designed to be 16px (1rem). Any other sized icon should be explicitly specified via the `size` property using relative units or design tokens. Also updated the `cbp-icon` component to more easily allow overriding its size via its CSS API (`--cbp-icon-size`).
* BREAKING: renamed the `cbp-nav-item` `selected` property to `current` for consistency and clarity.
* BREAKING: renamed the `cbp-subnav` `accessibilitytext` property to `accessibilityText` for consistency.
* Updated the Application Header to support Navigation Items that have children:
  * Navigation Items with children are represented by a button control that opens a drawer containing sub-navigation.
  * The Application Header and Sub-navigation now contain a shared state, allowing user interaction with either component to update the state of the other.
  * Updated the `cbp-nav-item` component to style any slotted links and buttons (not just `cbp-button`), including component-based routers.
  * BREAKING: The "home" (application name) link must now be slotted into the `slot="cbp-home"` named slot to inherit the proper styling. This is less opinionated/more flexible than always styling the first nav-item in a special way.
* First cut of the `cbp-menu` component.
* Updated `cbp-drawer` to add the ability to persist its contents in the flow of the page at a certain breakpoint, mobilizing to an overlay below that breakpoint.
  * With the addition of a persistent drawer, the drawer component should match the user's preferences for light or dark mode rather than using "light-always" and "dark-always" contexts.
  * Implemented an official dark mode for the Drawer component.
  * Updated the "User Preferences" story to work with the new dark theme and component implementation. This pattern still uses `context="dark-always"`, but represents a custom pattern rather than the default dark mode.
  * Updated the Passenger List archetype to demonstrate the persistent drawer functionality.
* Updated the `cbp-dropdown` to fix a number of issues:
  * Now works as a multi-select when its dropdown items are passed in via JSON.
  * Fixed the issue of setting a value property on multi-selects to populate the initial state.
  * Updated the faux button so that the chevron can be rotated when opened.
* Minor bugfixes/updates to `cbp-universal-header`, `cbp-tooltip`, `cbp-toast`, and `cbp-panel`.
* Updated web components readme and included it Storybook under "Using the web components."

## [0.0.1-develop.20] 04-18-2025

* First cut of the `cbp-slider` component for selecting a single value from a range.
* First cut of the `cbp-code-snippet` component, which is used to display code samples.
* Updates to the `cbp-dropdown` component to:
  * Pass in items as JSON via the `items` property (rather than slotted).
  * Specify that a dropdown's items are asynchronously updated via the `async` property.
  * Specify a minimum input length (`minimumInputLength`) to emit an event (to asynchronously update a filtered list of items via JSON from the application code).
  * Close the dropdown when tabbing out of it.
* Minor bugfixes/updates to `cbp-subnav`, `cbp-nav-item`, `cbp-toggle` and `cbp-toast`.
* Cleaned up the monorepo:
  * Removed vanilla package.
  * Created design-tokens package and updated Style Dictionary to the latest version, 4.3.3.
* Updated Storybook to v8.6.3.
* Added tag badges (beta, new, etc.) to stories via plugin.

## [0.0.1-develop.19] 02-12-2025

* First cut of the `cbp-subnav` and `cbp-subnav-item` components.
* First cut of the `cbp-file-input` component, supporting only the native web functionality with enhancements to come later.
* First cut of the `cbp-loader` component.
* Updates to the `cbp-table` component supporting a column sort control in the table header as well as cell and column highlighting.
* Fixed a bug in `cbp-dropdown` combobox functionality causing erroneous form submission.
* Fixed a bug in `cbp-link` causing the visited color to override other states in links, breadcrumbs, etc.
* Added the ability to specify a `cbp-form-field` group (fieldset) as `disabled`.
* Minor bugfixes/updates to `cbp-radio` and `cbp-checkbox`.

## [0.0.1-develop.18] 01-14-2025

* First cut of the `cbp-toggle` component, which acts like a visual treatment for a checkbox.
* First cut of the `cbp-multicol` component, a component-based implementation of multi-column layout used in checklist and radiolist stories.
* Created stories for horizontal checklists and radio lists using `cbp-flex`.
* Decoupled fonts from `cbp-app` for performance testing. They are now included in the package as assets and should be loaded as external resources from the /assets/css files.
* Minor bugfixes/updates to `cbp-dropdown` and `cbp-checkbox`.

## [0.0.1-develop.17] 12-12-2024

* First cut of the `cbp-nav-item` component for including navigation links in the Application Header.
* BREAKING: updated the `cbp-app-header` implementation. The pattern now uses the new `cbp-nav-item` component for the first "Application Name" link. Code should be updated from Storybook for the latest implementation.
* First cut of the `cbp-table` component.
* First cut of the `cbp-breadcrumb` component.
* First cut of the `cbp-tooltip` component.
* Major refactor of `cbp-dropdown`, to include:
  * Cycling through options based on alphanumeric keypress by default, like a native `select`.
  * Combobox functionality for filtering by search string, enabled with the `filter` property.
  * Revamped the accessibility model using `aria-activedescendant` rather than sending focus to the dropdown items. Focus remains on the combobox control (button).
* Published the Change log to Storybook.
* Published Stencil-generated component API docs to Storybook. We will continually revisit these for completion.

## [0.0.1-develop.16] 10-28-2024

* First cut of `cbp-checkbox`.
* First cut of `cbp-radio`.
* First cut of `cbp-toast`.
* Updated `cbp-form-field` with the ability to handle input groups (e.g., checklist, radio list, compound inputs) with more than a single input.
* Updated Structured list with selectable functionality.
* Fixed the issue with slotted Accordion Item title being hidden (the slot name was also updated to `cbp-accordion-item-title` to follow our naming conventions).

## [0.0.1-develop.15] 10-07-2024

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
* First cut of `cbp-hide`, a component that allows content to be programmatically hidden (or visually hidden) based on property or media query.
* Updated designs of `cbp-badge`, `cbp-chip`, and `cbp-tag` to use the correct design tokens.
* Updated the `cbp-chip` component by adding `name` and `value` properties and updating the custom event.
* Updated Template and Universal Header stories to use `cbp-hide` for responsiveness.
* Updated the Template to wrap the Universal Header and Application Header in an HTML5 `header` landmark tag.

## [0.0.1-develop.5] 02-29-2024

* First cut of tabs with responsive behavior: `cbp-tabs`, `cbp-tab`, `cbp-tab-panel`.
* Updates to `cbp-button` to support responsive tabs controls.
* Fixed `cbp-drawer` close control.
* Upgraded Stencil to v4.12.3 and enabled new `slot` fixes.

## [0.0.1-develop.4] 01-08-2024

* Created CHANGELOG.md to start tracking changes during beta for pilot projects.
* Added cbp-drawer backdrop.