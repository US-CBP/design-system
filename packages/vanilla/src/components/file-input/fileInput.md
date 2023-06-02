# File Input

## Purpose

A File Input allows the user to specify one or more files to be uploaded to a backend or service.

## Functional Requirements

* Display an `input type="file"` with CBP design specifications.
* The component may be configured to allow multiple selections or only a single selection at a time, corresponding with native functionality.

## Technical Specifications

### User Interactions

* Support for drag and drop is determined by browser support and implementation.
* Support for the `accepts` attribute is a hint and actual support is determined by the web browser. This functionality does not replace validation.
* Selecting a file or dragging and dropping a file after a file was already selected will replace that file.

### Responsiveness

* The File Input component is fully responsive down to small mobile screen sizes.

### Accessibility

* A `label` is required to label the file input.

### Usage Notes and Additional Considerations

* Support for `multiple` attribute and multiple file uploads not yet included.
* Uploading the file to a backend or service is up to the application, just as processing form submissions is.