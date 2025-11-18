import { Component, Element, Host, h } from '@stencil/core';

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
  
  @Element() host: HTMLCbpFormElement;
  




    handleSubmit(e) {
    /*
      Update FormData (or create a copy) with fields not supported natively:
      * File input (allowing manipulation of FileList)
    */
      console.log('cbp-form - Submit event: ', e);
      e.preventDefault();

      // Empty FormData object
      //let formData = new FormData();
      // FormData object populated from an existing form
      let formData = new FormData(this?.form);

      console.log('cbp-form - formData: ', formData);

    /*
    // Empty FormData object
    let formData = new FormData();

    // FormData object populated from an existing form
    const myForm = document.getElementById('myForm');
    let formDataFromForm = new FormData(myForm);




    fetch('/submit-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    */
    }


    handleReset(e) {
    /*
      Call reset methods on form fields that do not natively support it:
      * Dropdown - stores its value in a hidden input so that it is passed in a native form submit, but hidden inputs are not affected by a form reset. Needs to reset all selections and internal states.
      * Segmented button group - when named, this component stores its value in a hidden input so that it is passed in a native form submit, but hidden inputs are not affected by a form reset.
      * Slider - seems to clear numeric entry fields, resets value prop but doesn't update bars. maybe needs @watch on value?
      * Checkboxes set as checked using the component property are unchecked when reset by default
      * Radio - same as above
      * Toggle?      
      * File Input?
      * 
    */
      console.log('cbp-form - Reset event: ', e);
      //e.preventDefault();
      // Do the native reset first
      this.form.reset();

      const SpecialCases: any = this.form.querySelectorAll('cbp-dropdown,cbp-slider,cbp-segmented-button-group');
      // Loop over the components that need extra work via custom reset() methods
      SpecialCases.forEach( item => {
        //console.log(item,item?.value)
        item.reset();
      });
    }



  componentWillLoad(){
    this.form=this.host.querySelector('form');
    this.form.addEventListener('submit', e => this.handleSubmit(e));
    this.form.addEventListener('reset', e => this.handleReset(e));
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
