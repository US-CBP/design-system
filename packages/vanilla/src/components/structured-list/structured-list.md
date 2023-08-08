# Structured List

## Purpose

Displays a list with a considerable amount of similar or related content.

## Functional Requirements

* Has an overall wrapper `<div>` which contains the structured list header, structured list.
* Structured list header is a required part of the structured list pattern and the text inside describes the number of results, any filters applied and time stamp of when the list was updated. 
* The structured list is a `<ul>` element for the list and `<li>` for the list items.
* Developers can add a `.cbp-structured-list--striped` to the `<ul>` element to stripe the list. 
* More complex structured lists have more features:
  - pagination
  - filters
  - sorting
  - action bar
  - refresh

## Technical Specifications


### User Interactions


### Responsiveness


### Accessibility

* Structured list header can contain status information that may update and should have the `role="status"` and `aria-live` attributes.


### Usage Notes and Additional Considerations
