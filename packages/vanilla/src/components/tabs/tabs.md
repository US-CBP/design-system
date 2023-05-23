# Tabs

## Purpose

Tabs are a paradigm of organizing multiple panels of content in a shared space, toggling one panel visible/active at a time.

## Functional Requirements

* Only one tab may be active at a time.
* If no tab is explicitly set to selected, the first tab will default to active/selected.
* Only the tab panel corresponding to the active/selected tab will be shown; all other tab panels are hidden.

## Technical Specifications

### User Interactions

* Setting a tab to be active by default is achieved by setting `aria-selected="true"` on its tab control (button element).
* If no tab is explicitly set to selected, the first tab will default to active/selected.
* Activating any tab control will toggle the `aria-selected` attribute and related styling and emit a custom event in addition to the native button's `click` event.

### Responsiveness

* TBD

### Accessibility

* Each tab control (button) has a `role="tab"`.
* Buttons without accessible label text, such as icon buttons, should use the `aria-label` attribute on the button to specify an accessible label.
* Each tab control (button) has an `aria-controls` attribute referencing the corresponding tab panel's `id`.
* Each tab control has an `aria-selected` attribute, which is automatically set to `false` except for the active tab control.
* The `aria-selected` attribute is updated for all tabs in the tabset when a tab is activated.
* Each content panel corresponding to a tab control has a `role="tabpanel"`.
* Each tab panel has a unique `id` that is referenced by the corresponding tab control's `aria-controls` attribute.
* While the tab set and tab panels are decoupled (not within the same wrapper), allowing for more flexible layouts, tab panels should be adjacent and next in code order to the tab set so that screen reader users can easily find the content that is activated.
* TBD: roving tabindex.

### Usage Notes and Additional Considerations

* The use of `aria-controls` on the tab control pointing to the `id` of the tab panel associates these elements not only for accessibility, but also programmatically.
* A custom event of `tabActivated` is emitted from the tab control (button), which bubbles and may be listened for at a higher level, such as the tabset. The custom event's `details` contain the following keys:
  * `tab`: a DOM reference to the button element activated
  * `name`: the name of the tab, derived from the `name` attribute of the button, or barring that, the innerText of the button element. For tabs with only icons, the button's `name` attribute should always be used.
  * `nativeEvent`: the full native `click` event from the activated button
* This custom event may be leveraged to asynchronously load content when a tab is activated.
* For tabs with only icons, the button's `name` attribute should always be used for the benefit of the custom event emitter.