# Banner

## Purpose

The Banner is a container spanning the entire viewport meant to highlight urgent or important content.

## Functional Requirements

* The "USA Banner" pattern is similar to the pattern created by the U.S. Web Design System.
  * This pattern should be used as-is (not customized) in order to maintain consistency across government websites.
  * This banner has built-in expandable functionality.
  * This banner is required to be placed at the top of the page for all public-facing websites.
* The other two variations of banners are Informational and Security banners.
  * These banners contain an icon as well as a heading followed by descriptive text.
  * These banners contain a button to dismiss the banner.

## Technical Specifications

### User Interactions

* Pressing the "Dismiss" button will hide banner from view (but not remove it from the DOM).
* Clicking the backdrop or the designated close button will close (hide) the drawer.

### Responsiveness

* The banners are responsive and content will wrap and reflow down to phone viewport sizes.

### Accessibility

* Within your banner, use the appropriate heading level according to your document structure.
* Ideally, only one banner should be present at a time.
* In the event that more than one banner is present, the "dismiss" buttons will need to be uniquely labelled. Adding an `id` to the heading element and referencing the respective heading `id` as the value of an `aria-describedby` attribute on the dismiss button is recommended.

### Additional Notes and Considerations

* A dismissed banner may be brought back into view by removing the `hidden` attribute from its outer wrapping element.
