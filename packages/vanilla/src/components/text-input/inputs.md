# Text Inputs

## Purpose

The Input component can accept a variety of data, relatively short in length, including text, number, password, etc.

## Functional Requirements

* The input component renders an `input` tag with accompanying descriptive text in a predictable pattern supporting accessibility.
* The input component accepts user input and supports an error state, but does not handle validation itself.

## Technical Specifications

### User Interactions

* The native `input` shows visible styling for hover and focus states.

### Responsiveness

* Inputs default to a `width` of 100% of their container, which may be overridden by custom CSS or the `size` attribute.
* Inputs also have a `max-width` of 100%.

### Accessibility

* `aria-required` 
* `aria-readonly`
* `aria-invalid`
* `aria-hidden` (Error Message?)
* `aria-errormessage` (Error Message?)

### Usage Notes and Additional Considerations
