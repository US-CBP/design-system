# Panel

## Purpose

A panel is a styled container for displaying information within the main page content area or to either side.

## Functional Requirements

* In addition to providing visual styles, panels may provide semantic meaning to the content areas they define.
* Panels shall contain a heading tag (`h2-h6`) appropriate to the document outline.
* The panel heading shall be styled in a consistent manner regardless of heading level.

## Technical Specifications

### User Interactions

* All user interactions are governed by the content placed within the panel.

### Responsiveness

* Panels should not be given a fixed width larger than the smallest supported screen size.
* In most cases, a panel's size is defined by its parent and/or a parent-level CSS Grid or Flexbox structure.

### Accessibility

* Panels should use appropriate HTML5 landmark tags for better accessibility rather than generic `div` tags. E.g., `aside` or  `section`.
* A `section` remains generic unless given an `aria-label` or `aria-labelledby`, which then reads the section as a document landmark.
* Panels shall contain a heading tag (`h2-h6`) appropriate to the document outline, which may be used to label the landmark.
* Alternatively, if the visible text of the heading is not sufficiently descriptive or unique, an `aria-label` may be used directly on the landmark tag.

### Usage Notes and Additional Considerations

* Panels should not be confused with cards. If an interface uses multiple similarly formatted items, consider cards.