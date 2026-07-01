# Migration Guide

This is a running list of manual migration steps to upgrade from older development or BETA releases to the (not-yet-released) production release.

Many (but not all) of these issues may be flagged when used within a strongly typed framework/language. Referring to this migration guide may give context to those issues, however.

## From BETA Versions

* TBD

## From Development Versions

### Prior to BETA release (June 29, 2026)

* Due to updates to standard drawers, the Universal Header, and App Header, all Template code should be refreshed from the latest story.
* Updated the `cbp-app-header` to make sticky behavior opt-in. The `sticky` attribute should be added to all current applications using the design system to preserve this functionality.
* Removed "masthead" font size tokens and corresponding `cbp-typography` variants. These can now be replicated with new, more granular "size" tokens.
* Fixed the color of the buttons in `cbp-toast` - most use an inverted context. This property should be added or updated code copied from Storybook. You may also want to use the `cbp-toast-container`, which was added in the v0.9.0-beta.1 release.
* Universal Header slotted list markup should be replaced with what is in the current story file, which uses slotted cbp-flex and cbp-flex-item tags around the buttons instead.
* Font Awesome 7 should be imported into your application (for extra icons not included in `cbp-icon`) to match the design system icons. Font Awesome 6 was used in Development versions previously.

### Prior to v0.0.1-develop.34 (April 24, 2026)

* The `cbp-card` "decision" variant was removed. It is not needed (there is no loss of functionality), so remove if specified.
* The `striped` property on `cbp-structured-list` accepts "odd" or "even" values (defaults to undefined/none) - it was previously a Boolean and should be updated if it has not been.
* The `selected` property on `cbp-structured-list` was removed, matching the implementation of the Table component.
* For `cbp-dropdown` comboboxes, the "filterKeypress" and "populateCombobox" event emitters no longer pass the keys: "key", "altKey", "ctrlKey", or "metaKey" because these are not present in the input event. They pass the current value including the triggering keypress instead.
* The `cbp-loader` default error and success messaging were removed from the component. This messaging should be contextual and provided by the application.
* Some code copied from Storybook may have contained invalid `id`s (with the word "undefined") referenced in `aria-describedby` because a Storybook control specifying an `id` was not populated. Accessibility testing your application should find these instances.

### Prior to v0.0.1-develop.31 (February 13, 2026)

* Templates prior to 2026 may not have included responsive navigation (hamburger control and drawer) and User Preferences drawer in addition to:
  * Added `role="banner"` to `cbp-universal-header` and removed the `header` tag from all template/archetype stories.
  * Verify that all links and controls (for navigation with children) within the `cbp-app-header` use `cbp-nav-item`s.
  * Verify that the "home" (application name) link is slotted into the `slot="cbp-home"` named slot to inherit the proper styling within the `cbp-app-header`.
  * Updated the underlying Story code for the User Preferences Drawer, including changing the "dark mode toggle" to a segmented button group. Code should be re-copied or updated manually.
  * Updated Footer story code to remove the `h6` tag to address accessibility concerns about skipping heading levels. Code should be re-copied or updated manually.
  * All Template code should be refreshed from the latest story.
* The `cbp-button` properties of `expanded` and `pressed` were once Boolean, but were changed to a string union of `"true" | "false"` for easier conversion to their `aria-` attributes. This could also affect story code copied for `cbp-segmented-button-group`, which may need to be updated.
* Any instances of applying margins to the icon or text in a button or link component (via sx or custom CSS) will need to be removed as a default gap was added to the contents of those components.
* Icons not rendering at the default of `1rem` (sized for placement next to body text) must specify a size since the default was changed from `1em` to `1rem`.
* Verify that `cbp-nav-item` is using the `current` property rather than `selected`, which was deprecated.
* Verify that `cbp-subnav` uses `accessibilityText` rather than `accessibilitytext`.
