# Modal (Dialog)

### Purpose

- A Modal disables page content and focuses the user’s attention on a single task or message. (*Only the content in the modal can be interacted with.*)

- Modal vs. Dialog - The key difference between a modal and a dialog is that modals will render the background `inert` meaning no elements "behind" the modal are interactive. 

- *Non-modal dialogs allow interaction with content outside of the dialog*

### Functional Requirements

- The control to open the Modal should have a `data-modal` attribute with a value of the `id` of the `<dialog>` element.
- The control in the Modal to close the Modal should have a `data-close-modal` attribute without a value to indicate that it closes the modal

- Users **cannot** interact with content outside an active Modal window. (_default_)
- The `<dialog>` element has two methods to open the Modal:
  1. `show()`: displays the dialog as a non-modal, i.e. still allowing interaction with content outside the dialog
  2. `showModal()`: displays the dialog as a modal along with the `::backdrop` pseudo-element. Interaction outside the dialog is blocked and the content outside it is rendered inert. 
  3. The `close()` method is used to close the modal 

- Forms in `<dialog>`
  1. `formmethod="dialog"` attribute in a `<button>` overrides the `<form>`'s default GET method.
  2. When a `<form>` method is `dialog`, the state of the form is saved, not submitted, and the dialog get's closed. 

### Accessibility 

- `<dialog>` opened by the `showModal()` method will have an implicit `aria-modal="true"`
- `role="alertdialog"` is used on modal alert dialogs that interrupt a user's workflow to communicate an important message and require a response. This helps assistive technology identify the content as being grouped and separated from the rest of the page content.
- Modal titles/headings should have an `id` attribute whose value is referenced by the `aria-labelledby` attribute in the `<dialog>` element.
- Modal description or detail text should have the `aria-describedby` data attribute with the value of the `id` of the element that describes the Modal. 

### References

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [web.dev](https://web.dev/learn/html/dialog/)
- [Github Issue](https://github.com/w3c/html/issues/1514) - Focus Trap Issue Discussion
- [Github Issue](https://github.com/whatwg/html/issues/8339) - Focus Trap Issue Pt. 2 Discussion
- [Github Issue](https://github.com/whatwg/html/wiki/dialog--initial-focus,-a-proposal#initial-dialog-focus-logic) - Initial Dialog Focus Logic
