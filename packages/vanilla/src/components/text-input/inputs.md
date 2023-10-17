# Text Inputs

## Purpose

The Input component can accept a variety of data, relatively short in length, including text, number, password, etc.

## Functional Requirements

* The input component renders an `input` tag with accompanying descriptive text in a predictable pattern supporting accessibility.
* The input component accepts user input and supports an error state, but does not handle validation itself.
* All input patterns shall have a common structure:

```
<div class="cbp-input-pattern">
  <label class="cbp-input__label"></label>
  <div class="cbp-input__description"></div>
  <input />
</div>
```

Input groups follow a similar pattern, reusing as many of the same pieces as possible:

```
<fieldset class="cbp-fieldset">
  <legend class="cbp-legend"></legend>
  <div class="cbp-input__description"></div>
  {...inputs}
</fieldset>
```


## Technical Specifications

### User Interactions

* The native `input` shows visible styling for hover and focus states, except when in a disabled state.

### Responsiveness

* Inputs default to a `width` of 100% of their container, which may be overridden by custom CSS or the `size` attribute.
* Inputs also have a `max-width` of 100% so that they do not overflow their container or small viewports.

### Accessibility

* A `label` associated to the input should always be provided, even if hidden. A visible label should be the standard, however.
* `aria-required` 
* `aria-readonly`
* `aria-invalid`
* `aria-hidden` (Error Message?)
* `aria-errormessage` (Error Message?)

### Usage Notes and Additional Considerations
