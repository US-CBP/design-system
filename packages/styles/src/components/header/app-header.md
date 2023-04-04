# Application Header

## Purpose

The Application Header comprises the primary navigation for an application, usually coming after the Universal Header.

## Functional Requirements

* The Application Header holds the primary navigation, which can consist of links and buttons.
* Navigation items representing a group of sub-items shall be represented with a button that triggers the drawer to open. 

## Technical Specifications

### User Interactions

* Activating any link within the navigation shall navigate or route to the specified destination.
* Activating any button within the navigation shall open a drawer containing the entire list of navigation options.

### Responsiveness

* Individual navigation items will be hidden at an application-defined breakpoint.
* The drawer control (hamburger menu) is shown at that same breakpoint.

### Accessibility

* The primary navigation items are wrapped in the `nav`, which has an implicit landmark role.
* Selected links shall have `aria-current="true"` applied to indicate the current location.
* Navigation items with additional options within will render a button that controls a drawer, holding the entire navigation.
  * These buttons shall contain an `aria-controls` attribute, referencind the ID of the drawer.
  * `aria-current="true"` may be applicable when navigating to a child of a top-level navigation group.
  * Upon activating the button, focus shall be sent to the drawer.

### Additional Notes and Considerations

* In frameworks that implement component-based routing, the `a` tag may not be the direct child within the `nav` element.
