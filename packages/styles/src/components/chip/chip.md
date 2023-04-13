# Chip

## Purpose

A Chip acts like an interactive Tag and can be used to select or unselect items from a list of options.

## Functional Requirements

* Because the Chip is interactive, it should be semantically represented by a `button` element.
* Chips may have visible "active" or "inactive" states or be removed from the page by application logic.


## Technical Specifications

### User Interactions

* Activating the button within the chip will toggle the `active` class and emit a custom event in addition to the native button's `click` event.

### Responsiveness

* Chips should not contain long text and are not intended to wrap.

### Accessibility

* Because the Chip is interactive, it should be semantically represented by a `button` element per the provided pattern. Adding the `cbp-chip` class to any other element will result in accessibility defects.
* The `aria-pressed` attribute on the button is set to `true` to indicate the active state of a Chip.
* Chips/buttons without accessibile label text, such as icons, should use the `aria-label` attribute on the button to specify an accessible label.

### Usage Notes and Additional Considerations

* A custom event of `chipToggle` is emitted from the parent component tag. The custom event's `details` contain the following keys:
  * `chip`: a DOM reference to the button element activated
  * `nativeEvent`: the full native `click` event from the activated button
  * `active`: a Boolean representing the active state of the button resulting from the user interaction
  * `label`: the text label of the Chip/button activated, if one exists
  * `value`: the value of the Chip/button activated, if specified
* Applications may tie custom functionality to this event to hide or remove deactivated Chips if desired.