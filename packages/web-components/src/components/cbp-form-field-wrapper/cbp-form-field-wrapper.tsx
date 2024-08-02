import { Component, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * @slot - The default slot holds the form control.
 * @slot cbp-form-field-overlay-start - Holds an overlay positioned on the left side of the form field.
 * @slot cbp-form-field-overlay-end - Holds an overlay positioned on the right side of the form field.
 * @slot cbp-form-field-attached-buttons
 * @slot cbp-form-field-unattached-buttons
 */
@Component({
  tag: 'cbp-form-field-wrapper',
  styleUrl: 'cbp-form-field-wrapper.scss'
})

export class CbpFormFieldWrapper {

  private overlayStartWidth;
  private overlayEndWidth;
  private attachedButtonsWidth;
    
  @Element() host: HTMLElement;

  componentDidLoad() {
    // Calculate the size of the overlays to set the input padding accordingly
    // TechDebt: as a first cut, this is not reactive. How reactive does it need to be?
    const overlayStart: HTMLElement = this.host.querySelector('[slot="cbp-form-field-overlay-start"]');
    this.overlayStartWidth = overlayStart ? overlayStart.offsetWidth + 8 : 0;

    const overlayEnd: HTMLElement = this.host.querySelector('[slot="cbp-form-field-overlay-end"]');
    this.overlayEndWidth = overlayEnd ? overlayEnd.offsetWidth + 8 : 0;

    const attachedButtons: HTMLElement = this.host.querySelector('[slot="cbp-form-field-attached-buttons"]');
    this.attachedButtonsWidth = attachedButtons ? attachedButtons.offsetWidth : 0;

    // Update this with the buttons size
    this.overlayEndWidth = this.overlayEndWidth +  this.attachedButtonsWidth

    //this.attachedButtonWidth = (this.host.querySelector('[slot="cbp-form-field-attached-buttons"]') as HTMLElement).offsetWidth  || 0;
    console.log(this.overlayStartWidth, this.overlayEndWidth);

    setCSSProps(this.host, {
      "--cbp-form-field-overlay-start-width": `${this.overlayStartWidth}px`,
      "--cbp-form-field-overlay-end-width": `${this.overlayEndWidth}px`,
      "--cbp-form-field-attached-buttons-width": `${this.attachedButtonsWidth}px`,
    });
  }

  render() {
    return (
      <Host>
        <div class="cbp-form-field-wrapper-shrinkwrap">
          <slot name="cbp-form-field-overlay-start" />
          <slot />
          <slot name="cbp-form-field-overlay-end" />
          <slot name="cbp-form-field-attached-buttons" />
        </div>
        <slot name="cbp-form-field-unattached-buttons" />
      </Host>
    );
  }

}
