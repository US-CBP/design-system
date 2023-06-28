# Menu

## Purpose

A Menu contains additional actions in the form of links or buttons, which can be shown by activating a control.

## Functional Requirements

* A menu is an container that, when opened, overlays the contents of the site/application.
* The menu's control should always be a button.
* A menu typically contains links and optionally other content.
* The menu's width is determined by the length of the menu items.
* The menu may be positioned above or below the control, aligned to the right or left edges, to accommodate different placements on a page.
* Menu items may indicate a danger state for options such as deletion.
* The menu may optionally contain a "close" button as the last option.
* A Menu may be closed by pressing `ESC` or clicking outside of the menu.

## Technical Specifications

### User Interactions

* Activating the menu control (button) will toggle the menu visibility and emit a custom `menuToggle` event in addition to the native button's `click` event.
* Clicking or tabbing outside of the menu will close the menu.
* Pressing `ESC` will also close the menu.

### Responsiveness

* At the smallest breakpoint, the menu shall be displayed at the bottom of the viewport.

### Accessibility

* The menu control shall always be a `<button>` with `type="button"`.
* The menu control shall have `aria-haspopup="menu"` applied to it.
* The menu control shall have a unique `id`, which is referenced by the semantic menu's (containing `role="menu"`) `aria-labelledby` attribute.
* Buttons without accessible label text, such as icon buttons, should use the `aria-label` attribute to specify an accessible label that uniquely identifies the control.
* Activating the menu control (button) will toggle `aria-expanded` attribute, which is managed by the component, and send focus to the first item in the menu.
* Menu items should be represented by semantically valid links or buttons, depending on their functionality.
* Once open, the menu items can be navigated via keyboard using the arrow keys (rather than tab).
* Additionally, the `Home` key shall jump to the first menu item and the `End` key shall jump to the last menu item.
* Clicking on the menu control or anywhere outside of the menu itself will close the menu.
* Tabbing outside of the menu or menu control will close the menu.
* Pressing `ESC` at any time will close an open menu.
* If the menu is closed by pressing `ESC`, focus will be returned to the menu's control.

### Usage Notes and Additional Considerations

* A custom event of `menuToggle` is emitted from the parent component tag. The custom event's `details` contain the following keys:
  * `button`: a DOM reference to the button element activated
  * `nativeEvent`: the full native `click` event from the activated button
  * `open`: a Boolean representing the opened/expanded state of the menu resulting from the user interaction
