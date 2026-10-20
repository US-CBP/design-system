# CHANGELOG

This CHANGELOG.md tracks the updates to the web components package of the CBP design system, which is currently in Beta release state. As a beta release, there WILL be breaking changes. See the Migration-guide.md for tips for upgrading from an older version of the design system. Upon official release, this log may be wiped clean and started fresh and [semantic versioning](https://semver.org/) will be followed.

The React components are wrappers generated from this package and will share the same changes. Projects using React 19 may use the native web components without React wrappers.

## [unpublished] TBD

* Initial version of the `cbp-datepicker` released. Breaking changes are likely since this is a new component, but also may need to be updated to work for date range use cases.
* Updated the `cbp-footer` component to include the CBP Seal and identifying text.
* Updated `cbp-typography` by adding a `fontStyle` property.
* Took inventory of all components with elevation above the page and updated all `z-index` values for better interoperability.
* Updated the "Logout" buttons in the User Preferences drawer in all template and archetype stories to render an anchor, consistent with application best practices.
* Added Grid and Flex recipes, demonstrating specific techniques using these layout components.

## [0.9.0-beta.4] 09-23-2026

* Fixed a console error when `cbp-flex` is unmounted and no breakpoint media query is specified.
* Fixed an issue where sortable table columns may hide the text when hovering the table cell but not the actual button.
* Upgraded Storybook to v10.6.

## [0.9.0-beta.3] 09-18-2026

* BREAKING: renamed the `cbp-tooltip`'s `fieldId` property to `uid` for accuracy and consistency. This property is optional and is automatically generated if not specified, so it only needs to be updated where set explicitly.
* Continued improving the Floating UI integration on `cbp-dropdown` and `cbp-menu`, enabling them to also resize vertically if there is insufficient space to display in its default placement or when flipped.
* Updated `cbp-listbox` with Floating UI integration to work the same as `cbp-dropdown`.
* Updated `cbp-dialog` and `cbp-drawer` with a proper focus trap for accessibility purposes, so that keyboard navigation cannot leave these components until closed.
* Updated `cbp-table` so the column sorting button controls take up the full width of their `th` cells.
* Updated `cbp-dropdown`, `cbp-menu`, `cbp-tabs`, and `cbp-treeview` to disable viewport scrolling when using keyboard navigation, including the arrows, `home`, and `end` keys.
* Additional improvements to `cbp-menu`:
  * Added a `menuItemClick` custom event to `cbp-menu-item`.
  * Normalize all menu items to activate with either `Space` or `Enter`, whether they are buttons or anchors.
  * Prevent page scrolling when `Space` is pressed.
* Updated `cbp-flex` so that the `breakpoint` property is reactive. Upon successful testing, this will be replicated in `cbp-grid` and `cbp-drawer`.
* Updated `cbp-button` to no longer emit a custom `buttonClick` event or enable the "controls" functionality (e.g., for drawers, dialogs, menus, etc.) when disabled.
* Updated `cbp-icon` by adding the `context` property, `--cbp-icon-color-dark` CSS custom property, and dark mode toggle.
  * The default color for both light and dark modes is still `currentColor`.
  * Specifying a single color via the `color` property applies to both light and dark modes and should work in both color schemes.
  * If the icon is shown in a default (light-inverts) context, the native `light-dark(lightColor, darkColor)` function may be used as the value to specify variants for light and dark modes.
* Updated `cbp-form-field` to ignore `cbp-treeview` and `cbp-listbox` events, as those components emit their own `valueChange` event already.
* Updated the `valueChange` event in `cbp-listbox` to fire for both text entry (on blur, like a native change event) and listbox selection.

## [0.9.0-beta.2] 08-05-2026

* BREAKING: Updated `cbp-icon` underlying CSS to fix vertical alignment inconsistencies across several patterns.
  * Some patterns, such as panel, drawer, and dialog were updated to use flexbox within the heading, which eliminates the need to apply a margin to the icon directly (when present).
  * All icons in components and stories have been confirmed, but this change could potentially result in misaligned icons in custom code.
* Imported and integrated the Floating-UI library into `cbp-menu`, `cbp-dropdown`, and `cbp-tooltip` to handle positioning and repositioning fallbacks when positioning goes off-screen.
* Updated `cbp-menu` as follows:
  * Repositioned the menu so that it does not cover the control that opened it.
  * Removed the default close button from the menu itself - it can be closed by clicking/tabbing out of it as well as pressing `ESC`.
* Updated `cbp-tooltip` as follows:
  * BREAKING: renamed `alignment` property to `position` and renamed its values to be consistent with `cbp-menu` and the Floating UI library.
  * Added `width` and `height` properties to override the defaults.
  * Tooltip opens on mouse hover (in addition to focus and click).
  * Tooltip dismisses when clicked/tabbed outside of it.
* Updated `cbp-form-field` with fixes for field groups:
  * Do not style all fields in error state when the group has the `error` property set.
  * In this case, the group's description should be styled in an error state, and the specific fields in error within the group should have their own `error` property set to true.
* Updated how `valueChange` events are emitted by `cbp-form-field`, resolving cases of multiple events being emitted on a single change:
  * When a `cbp-dropdown`, `cbp-slider`, or `cbp-file-input` are nested in a `cbp-form-field`, `cbp-form-field` will not emit its own `valueChange` event because those components emit one, which bubbles and can be listened to on the `cbp-form-field` element or the form itself, already.
  * Updated `cbp-slider` to emit `valueChange` events according to native `change` events. Some were firing based on `input` events previously, causing an excess of `valueChange` events to be emitted.
  * For checklists (including toggles) and radio lists, `cbp-form-field` (as a group) will listen for any `stateChanged` event from `cbp-checkbox` or `cbp-radio` and `toggleClick` from `cbp-toggle` and emit an appropriate `valueChange` event as follows:
    * For a checkbox or toggle, all checked values within named checkboxes will be emitted as an array of values.
    * For individually named checkboxes or toggles or an unnamed one (which cannot exist as part of a group), the value will be emitted if checked, otherwise the value will be reported as null.
    * For a radio list, only the value for the selected radio button is emitted.
  * Added the `name` key to all custom events emitted by form components.
* Updated `cbp-pagination` as follows:
  * Make `page`, `pageSize`, and `records` properties reactive to changes.
  * Reduce the number of `paginationChange` events emitted.
  * Improve performance by reducing component and dropdown re-renders.

## [0.9.0-beta.1] 06-29-2026

With significant foundational updates, including tokens and icons, this release marks the first official BETA release as we prepare for a full production-ready release.

* BREAKING: Updated design tokens as follows:
  * Updated "primary" and "secondary" "dark" and "darker" color values to be a shade darker for better contrast.
  * Added new, more granular font-size tokens numbered from 1 through 20. These are in addition to the named sizes and `cbp-typography` variants such as "heading-xxl".
  * Added new, more granular line-height tokens numbered from 1 through 18. These are in addition to the named sizes and are now exposed in `cbp-typography` directly.
  * Removed "masthead" font size tokens and corresponding `cbp-typography` variants. These can now be replicated with new, more granular "size" tokens.
  * These tokens are bundled as CSS custom properties (variables) by the `cbp-app` component to be made available to all other components and application code.
* BREAKING: Updated the `cbp-app-header` to make sticky behavior opt-in.
  * The `sticky` attribute should be added to all current applications using the design system to preserve this functionality.
  * The `sticky` attribute has been added to the `cbp-app-header` component by default in all applicable stories in this Storybook.
  * "Sticky" functionality may be disabled by toggling the corresponding control "off" in those stories or removing the attribute if present.
* BREAKING: Updated all icons in the `cbp-icon` component and stories to use Font Awesome 7 icons (upgraded from v6).
  * There were no breaking changes in icon names used by the `cbp-icon` component or in the design system.
  * However, there are SVG icons embedded in a few stories directly that should be updated manually if already in use, including:
    * `cbp-menu` (and the `cbp-table` with overflow menu story) - "trashcan" icon has been added to the `cbp-icon` component and the stories updated to use this.
    * The volume slider story of `cbp-slider` (the icons as well as the sizing were updated).
* Updated the `cbp-icon` component to work with the Angular Font Awesome package components, which adds another DOM node between the design system web component and the rendered SVG.
* BREAKING: Updates to Toast:
  * Fixed the color of the buttons in toasts - most use an inverted `context`. This property should be added or updated code copied from Storybook.
  * Changed the sizing to use a shorter width by default.
* Created the `cbp-toast-container` component to hold and position multiple toast notifications.
  * An individual toast may be used without the container, but it is always placed in the upper right of the viewport.
  * Code copied from Storybook's "multiple toast" story now includes this component.
* Added an `orientation` property to `cbp-tabs` to allow for vertical tabs (the default is horizontal and does not need to be specified explicitly).
* BREAKING: Updated the `cbp-universal-header` story code to use slotted `cbp-flex` and `cbp-flex-item` tags around the buttons.
  * This avoids needing arbitrary HTML that requires styling within the component.
  * The previous markup will continue to work until the official release, at which point the styling within the component will be removed.
* Fixed an issue with the slotting the label text via the `cbp-expand-label` named slot being inadvertently hidden.
* Added CSS API variables to `cbp-section` and `cbp-container` for changing color and background-color with dark mode/context support.
* Created a "Multi-select with Chips" (dropdown) story to demonstrate how to create this pattern with loosely coupled components (Chips are not part of the dropdown component).
* Created an "Overview" document about working with Form components.
