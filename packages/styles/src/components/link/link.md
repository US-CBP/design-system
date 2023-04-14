# Hyperlink (Anchor)

### Purpose

`<a href="[url]" class="cbp-link">` creates a hyperlink to web pages within or outside of the current URL. Text links can be embedded within a block of text and should not be used in lieu of a button. 

### Functional Requirements

- **Inline Text Link:** used when a link needs to be embedded in a chunk of text. These links These links should lead to toher pages or applications.
- **Definition Text Link:** used when the developer wants to give more informatoin about a term or acronym and can be used in conjuction with an `<abbr>` tag. These links should lead to other pages or applications. 

### Accessibility 

- It is **_NOT RECOMMENDED_** to use `aria-disabled=true` on an element with an `href` attribute.
- HTML does now allow for the use of the `disabled` attribute on a hyperlink, `aria-disabled=true` communicates the hyperlink as being disabled to assisstive technologies but does not actually disable the element.
- Most effective way to communicate and actually disable a hyperlink would be to remove the `href` from the `<a>` eleemtn, creating a placeholder. ARIA can be applied to this placeholder link to communicate the lement's inteded role and state.

### References

- Disabling a Link (Blog Post) - (Link)[https://www.scottohara.me/blog/2021/05/28/disabled-links.html]
- Disabled Link with ARIA - (Link)[https://w3c.github.io/html-aria/#example-communicate-a-disabled-link-with-aria]
- `<a>`: The Anchor Element - (MDN)[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a]