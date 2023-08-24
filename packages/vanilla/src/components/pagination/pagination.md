# Panel

## Purpose

Pagination is used for splitting up content or data into several pages with a control for navigating to the next or previous page. 

Two select elements within the pagination component allows the user to select the desired page of results and the amount of items to be displayed.

A text element provides the current set of paged data being displayed over the total number of items. 

## Functional Requirements

When the page dropdown is selected on a value that does not have a previous/next option to navigate to, the corresponding previous/next button will be disabled. 

## Technical Specifications


### User Interactions

Clicking on the previous button changes the value of the page dropdown to the previous page of results and clicking on the next button changes the value of the page dropdown to the next page of results. 

Selecting from the page dropdown will display the set of corresponding paged data.

Selecting from the result dropdown will change the amount of paged data displayed on the page. 

### Responsiveness

The results dropdown is used along side the pagination component to select the amount of results displayed on the page. This results dropdown is hidden in the SM breakpoints and only the pagination component is shown.

### Accessibility

"Previous" and "Next" buttons have no discerning text and only contain icons so they should have an `aria-label` attribute.

The `<select>` element does not have an associated `<label>` element and will need an `aria-label` attribute.

### Usage Notes and Additional Considerations
