# Expand Pattern

## Purpose

The Expand patterns are simple interface patterns that allow the user to expand and collapse content. This component is similiar to the Accordion pattern but used for much simpler hide/show elements and may be nested within Accordion pattterns to show hierarchy.

## Functional Requirements

* Focus on the title will be set to the <button> element that is in the `.cbp-expand__title` <div> element

## Technical Specifications

### User Interactions

* Click on the title will collapse/uncollapse the content of the expand component
* Tab will focus on the button element of the Expand title but the actual title will *not* receive focus. 

### Responsiveness

* Long titles will wrap and be spaced correctly so that wrapped text will fall under the text and not the button.

### Accessibility

* `aria-controls` is placed on the <button> of the Expand title and the value is set to the ID of the Expand content ID attribute.
* `aria-expanded="true/false"` is placed on the button and changed with JS during open/close
* Interactive elements must have an accessible name, `aria-labelledby` can be used to reference a different element to define it's accessible name. Since the button in the Expand title is a <button> with only an icon (svg), `aria-labelledby="expand-title"` is placed on the <span> element indicating the element ID that describes the button 
* `aria-hidden` is used to hide non-interactive content from the accessibility API and hides content from assistive techology but doesn't visually hide anything. 

### Additional Notes and Considerations