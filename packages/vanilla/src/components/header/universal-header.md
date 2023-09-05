# Application Header

## Purpose

The Universal Header is the primary header for an application, usually coming before the Application Header at the top of the page.

## Functional Requirements

* Controls in the Universal Header are styled after the secondary ghost buttons for **_dark mode_**.
* Login button only appears if the user has not logged in and will appear only by itself.
* User button text will match the name of the logged in user. 
* Feedback button opens a modal and contains a feedback form that will be forwarded to the application team.

## Technical Specifications

### User Interactions

* The feedback button opens a modal with a feedback form that is forwarded to the app team.
* The app directory button opens a drawer with app directory information.
* The user button opens a drawer with application preferences, logout button and dark/light mode switch.

### Responsiveness

* Buttons and links within Universal Header are reduced to displaying only icons at smaller viewports. 

### Accessibility

* Universal header is a `<header>` element and defines a `banner` landmark role when its context is the `<body>` element.
* Images for the seal have an `alt` attribute with the value "U.S. Customs and Border Protection"
* Buttons and links should have a `aria-labelledby` attribute with a matching `id` attribute on its labelling `<span>` element.
* Feedback button displays a modal and should have a `aria-haspopup="dialog"` attribute.

### Additional Notes and Considerations
