import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';

/**
 * The Form component may optionally be used to wrap a native HTML form, providing enhanced functionality and support 
 * for some component functionality that would otherwise not be supported by the native platform, e.g., an enhanced 
 * file input that supports manipulating the file list and reset functionality for some custom form components.
 * 
 * @slot - This tag is a wrapper for the native `form` tag and its contents, which are slotted in the default slot.
 */
@Component({
  tag: 'cbp-form',
})
export class CbpForm {

  private form: HTMLFormElement;
  private enhancedFileInputs: HTMLCbpFileInputElement[] = [];
  private files: object = {}; 
  
  @Element() private host: HTMLCbpFormElement;

  /** When specified, applies preventDefault() to the submit event and emits a custom event with the formData to hand off to the application. */
  @Prop() preventSubmit: boolean;
  
  @Event() suppressedSubmit: EventEmitter;

  
  handleReset() {
    // Call reset methods on form fields that do not natively support it.
    const SpecialCases: any = this.form.querySelectorAll('cbp-dropdown,cbp-slider,cbp-segmented-button-group,cbp-checkbox,cbp-radio,cbp-toggle,cbp-file-input');
    SpecialCases.forEach( item => {
      item.reset();
    });
    // reset enhanced/multi-file inputs to []
    Object.keys(this.files).forEach( key => {
      this.files[key] = [];
    });
  }

  handleSubmit(e) {
    const form = e.srcElement;
    // FormData object populated from an existing form
    let formData = new FormData(form);

    e.preventDefault();

    // Add files from enhanced/multi-file inputs
    formData = this.addFiles(formData);

    console.log('cbp-form - Resulting formData (array spread): ', [...formData]);
    
    // If the form submission is prevented, emit an event with the data instead
    if (this.preventSubmit) {
      this.suppressedSubmit.emit({
        host: this.host,
        form: form,
        formData: formData,
        nativeEvent: e
      });
    }
    // otherwise submit after updating the formData
    else form.submit();
  }

  addFiles(formData) {
    // Update formData with enhanced/multi-file input (allowing manipulation of FileList)
    Object.keys(this.files).forEach( key => {
      if (this.files?.[key]?.length > 0){
        // delete the empty key if there are files specified
        formData.delete(key);
        // loop over the files and add each as a new entry using append (set overrides the same entry)
        this.files?.[key].forEach( file => {
          formData.append(key, file);
        });
      }
      formData[key] = this.files[key];
    });
    return formData;
  }

  handleEnhancedFileInput(e) {
    // Keep tabs on enhanced/multi-file inputs' values
    const {name, value} = e.detail;
    // Only bother if the input has a name
    if(!!name) this.files[name] = value;
  }

  componentWillLoad() {
    this.form=this.host.querySelector('form');
    this.form.addEventListener('submit', e => this.handleSubmit(e));
    this.form.addEventListener('reset', () => this.handleReset());

    // Listen for changes to enhanced/multi-file inputs
    this.enhancedFileInputs=Array.from(this.host.querySelectorAll('cbp-file-input[multiple]'));
    this.enhancedFileInputs.forEach( item => {
      item.addEventListener('valueChange', e => this.handleEnhancedFileInput(e));
    });
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
