# Hyperlink (Anchor)

### Purpose

`<a href="[url]" class="cbp-link">` creates a hyperlink to web pages within or outside of the current URL. Text links can be embedded within a block of text and should not be used in lieu of a button. 

### Functional Requirements



### Accessibility 

- It is **_NOT RECOMMENDED_** to use `aria-disabled=true` on an element with an `href` attribute.
- HTML does now allow for the use of the `disabled` attribute on a hyperlink, `aria-disabled=true` communicates the hyperlink as being disabled to assisstive technologies but does not actually disable the element.

### References

- Disabled Link with ARIA - (Link)[https://w3c.github.io/html-aria/#example-communicate-a-disabled-link-with-aria]