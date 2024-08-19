import { Component, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - The default slot holds the form control.
 * @slot cbp-form-field-overlay-start - Holds an overlay positioned on the left side of the form field.
 * @slot cbp-form-field-overlay-end - Holds an overlay positioned on the right side of the form field.
 * @slot cbp-form-field-attached-button
 * @slot cbp-form-field-unattached-buttons
 */
@Component({
  tag: 'cbp-form-field-wrapper',
  styleUrl: 'cbp-form-field-wrapper.scss'
})

export class CbpFormFieldWrapper {

  private parent: HTMLCbpFormFieldElement;
  private formField: any;
  private attachedButton: any;

  private overlayStart: HTMLElement;
  private overlayEnd: HTMLElement;

  private overlayStartWidth;
  private overlayEndWidth;
  private attachedButtonWidth;
  
  @Element() host: HTMLElement;

  componentWillLoad() {
    // query the DOM for the slotted form field and wire it up for accessibility and attach an event listener to it
    this.parent = this.host.closest('cbp-form-field');
    this.formField = this.host.querySelector('input,select,textarea');
    this.attachedButton = this.host.querySelector('[slot=cbp-form-field-attached-button] cbp-button');
    this.overlayStart = this.host.querySelector('[slot=cbp-form-field-overlay-start]');
    this.overlayEnd = this.host.querySelector('[slot=cbp-form-field-overlay-end]');
  }

  componentDidLoad() {
    // Calculate the size of the overlays to set the input padding accordingly
    // TechDebt: as a first cut, this is not reactive. How reactive does it need to be?
    this.overlayStartWidth = this.overlayStart ? this.overlayStart.offsetWidth + 8 : 0;
    this.overlayEndWidth = this.overlayEnd ? this.overlayEnd.offsetWidth + 8 : 0;
    this.attachedButtonWidth = this.attachedButton ? this.attachedButton.offsetWidth : 0;

    // Update this with the buttons size
    this.overlayEndWidth = this.overlayEndWidth +  this.attachedButtonWidth

    setCSSProps(this.host, {
      "--cbp-form-field-overlay-start-width": `${this.overlayStartWidth}px`,
      "--cbp-form-field-overlay-end-width": `${this.overlayEndWidth}px`,
      "--cbp-form-field-attached-button-width": `${this.attachedButtonWidth}px`,
    });

    // Set the IDs on the slotted overlays (if needed) and assign them to the native input's `aria-describedby` attribute.
    let overlayids = '';
    const overlays = ["overlayStart", "overlayEnd"];
    overlays.forEach( (overlay) => {
      if (this[overlay]) {
        let id = `${overlay}ID`;
        if (this[overlay].getAttribute('id')) {
          id = this[overlay].getAttribute('id');
        }
        else {
          id = `${this.parent.fieldId}-${overlay}`;
          this[overlay].setAttribute('id',`${id}`);
        }
        overlayids 
          ? overlayids+=` ${id}` 
          : overlayids=id;
          }
    });

    if (overlayids){
      let ariadescribedby = this.formField.getAttribute('aria-describedby');
      ariadescribedby
        ? this.formField.setAttribute('aria-describedby', `${ariadescribedby} ${overlayids}`)
        : this.formField.setAttribute('aria-describedby', `${overlayids}`);
    }
  }

  render() {
    return (
      <Host>
        <div class="cbp-form-field-wrapper-shrinkwrap">
          <slot name="cbp-form-field-overlay-start" />
          <slot />
          <slot name="cbp-form-field-overlay-end" />
          <slot name="cbp-form-field-attached-button" />
        </div>
        <slot name="cbp-form-field-unattached-buttons" />
      </Host>
    );
  }

}
