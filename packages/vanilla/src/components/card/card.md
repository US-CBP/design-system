# Card

## Purpose

A card is a design pattern that groups related information in a flexible-size container visually resembling a playing card.

## Functional Requirements

* A Card is a pattern, made up of text and optionally multimedia and links/buttons.
* The Card pattern contains some optional CSS classes to apply structure to the contents.
* Decision cards are a variation on this pattern containing links and/or buttons as actions.
* Cards may be given a size, but this is usually inherited from a wrapping CSS Grid or Flexbox context.

## Technical Specifications

### User Interactions

* Cards are primarily a wrapper and all user interactions are defined by the content and controls placed therein.

### Responsiveness

* Cards should not have a fixed width larger than small device sizes.
* Not specifying a width and inheriting it from a parent CSS Grid or Flexbox context provides a more robust responsive behavior.

### Accessibility

* Cards should always have a heading.
* Decision cards should reference this heading's `id` in the action links/buttons `aria-describedby` attribute for better context.
* Placing repeating cards in an a list provides contextual cues for screen readers.

### Usage Notes and Additional Considerations

* TBD