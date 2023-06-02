# Segmented Button Group

## Purpose

A Segmented Button Group represent a group of stateful buttons that can be toggled on or off.

## Functional Requirements

* Buttons within a Segmented Button Group maintain a pressed state and styling.
* The component may be configured to allow multiple selections or only a single selection at a time.
* Segmented Button Groups shall be used for enabling or toggling application functionality but should not be used as form controls (such as a submit button).

## Technical Specifications

### User Interactions

* Activating any button within the group will toggle the `aria-pressed` attribute and related styling and emit a custom event in addition to the native button's `click` event.
* For single-selection groups, activating any button within the group will render the other buttons as un-pressed.

### Responsiveness

* TBD

### Accessibility

* `aria-pressed` is automatically set to `false` on each button if it does not exist when the component is loaded.
* `aria-pressed` is toggled when a button is activated.
* Buttons without accessible label text, such as icon buttons, should use the `aria-label` attribute on the button to specify an accessible label.

### Usage Notes and Additional Considerations

* Segmented Button Groups default to multiple selection unless specified as single via `data-segmented-button-group="single"`.
* A custom event of `buttonToggle` is emitted from the parent component tag, allowing applications to listen to the entire group rather than each individual button within it. The custom event's `details` contain the following keys:
  * `button`: a DOM reference to the button element activated
  * `nativeEvent`: the full native `click` event from the activated button
  * `pressed`: a Boolean representing the pressed state of the button resulting from the user interaction
  * `value`: the value of the button activated