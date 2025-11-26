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
      // Spreading the formData as an array seems to give the same results as above.
      console.log('formData (array spread): ',[...formData]);
  }

  handleReset() {
    // Call reset methods on form fields that do not natively support it.
    const SpecialCases: any = this.form.querySelectorAll('cbp-dropdown,cbp-slider,cbp-segmented-button-group,cbp-checkbox,cbp-radio,cbp-toggle,cbp-file-input');
    SpecialCases.forEach( item => {
      item.reset();
    });
  }

  componentWillLoad(){
    this.form=this.host.querySelector('form');
    this.form.addEventListener('submit', e => this.handleSubmit(e));
    this.form.addEventListener('reset', () => this.handleReset());
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
