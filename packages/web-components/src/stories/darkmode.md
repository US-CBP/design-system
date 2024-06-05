# Dark Mode

## Requirements

System Settings and/or Site Toggle must support:

* Light Mode (default)
* Dark Mode

Design Implementation must support:

* Light Context (default)
* Dark Context (based on the fill of the parent/wrapper)

## Use Cases

### Light/Dark Mode  - Toggle with User Settings 

The entire site/page should support a "dark theme" for system-wide dark mode settings or a site-specific dark mode toggle. E.g., cards, buttons, inputs, etc. on the page background switch to dark mode with system settings or site toggle.

### Dark Context

Dark context refers to the scenario where components placed on a dark background (parent/wrapper) while in "light mode" should use their dark mode colors. Based on the CBP-DS design specifications, these usually do not invert in dark mode. E.g., Universal Header, Footer, Inverted Drawer remain in dark context regardless of light/dark mode.

### Light Context

Based on the design specifications, Drawer (and Panel in the Drawer) remain light even when the browser is in dark mode. But Drawer and Panel have a dark design for other use cases.

### Inverted Colors that Toggle

Based on the design specifications, the Menu features a dark design in light mode and light design in dark mode. This means its context switches for nested elements (if not designed explicitly with child components that handle this) and is generally hard to describe with "light" and "dark" terminology.

### Interactive States

Interactive states may also invert from light to dark and vice versa (on hover, focus, active), and nested components should likewise invert in most cases, e.g., badges in an accordion, icons on a button, etc. This is particularly challenging with the available CSS capabilities at this time.

### Additional Concerns

* How do these selectors for dark mode and dark context affect CSS specificity and the ability to override styles with the CSS API?
* The specificity for the selectors (below) is 0,2,1 and 0,3,1 respectively.
  * Investigate using `@layer` to manage specificity at a higher level.
  * Investigate using `:where()` to reduce specificity.
  * How does this interact with styles specified via the sx property? Colors specified via sx would likely only apply to one mode unless the CSS API contains root-level variables for both modes.

## Implementation

### Step 1

Using `@media (prefers-color-scheme: dark)` is virtually useless and results in duplicate CSS if you plan to allow a site-wide toggle and/or have contextual dark mode (dark context).

The `cbp-app` component detects the preferred color scheme and sets this as a `data-cbp-theme` attribute on its host tag, which can then be used as a CSS selector and combined with other relevant parent and/or component-level selectors.

### Step 2 (Testing/Verifying)

Because components may be placed within a dark or light context, they'll need one or more properties to control this. I initially considered two Booleans - one for dark mode and one for behavior (invertable or static). But l decided to move forward with a single `context` property that contains enumerated values (more correctly a string union) of:

* light-inverts
* light-always
* dark-inverts
* dark-always

The default behavior is "light-inverts" and does not require any property to be set. This describes both the context (light/dark) and the behavior (inverts to the opposing design or doesn't) and is easier to understand and harder to forget a second, related property when defining the component's visual behavior.

The following CSS selectors are used for defining the component's dark mode design:

```
[data-cbp-theme=light] cbp-link[context*=dark],
[data-cbp-theme=dark] cbp-link:not([context=dark-inverts]):not([context=light-always]) {  

  /* CSS variable overrides for dark design */

}
```

## Results

The specificity of the above "dark mode" selectors is 0,2,1 and 0,3,1 respectively. While this has not been problematic as yet, these values are a little high and I would like to further investigate using `where()` and/or `@layer` to manage the specificity.

Another important factor in managing specificity is to make sure each component has color variables set at the `:root` level (component CSS API). This makes overriding them with the dark mode selectors (or within another component using the component CSS API) much simpler than if colors are set directly in deeper selectors. This includes (especially) states such as hover, focus, active, etc., as those can be especially difficult and tedious to override with their high specificity. 

