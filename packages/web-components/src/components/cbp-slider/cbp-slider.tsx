import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

/**
 * @slot - A native `input type="range"` gets slotted within the default slot.
 * @slot cpb-slider-before - an optional slot to place content (e.g., an icon) before the slider control.
 * @slot cpb-slider-after - an optional slot to place content (e.g., an icon) after the slider control.
 */
@Component({
  tag: 'cbp-slider',
  styleUrl: 'cbp-slider.scss'
})
export class CbpSlider {

  private formField: HTMLInputElement;
  private valueField: HTMLInputElement;

  @Element() host: HTMLElement;


  /** Optionally specify the ID of the visible control here, which is used to generate related pattern node IDs and associate everything for accessibility. */
  @Prop() fieldId: string = createNamespaceKey('cbp-slider');

  /** 
   *  Specifies the value of the slider and numeric entry field.
   *  This prop should be set on this component rather than (or in addition to) the slotted `input type="range"`. 
   */
  @Prop() value: number;

  /** 
   *  Specifies the minimum value of the slider and numeric entry field (defaults to 0). 
   *  This prop should be set on this component rather than (or in addition to) the slotted `input type="range"`.  
   */
  @Prop() min: number = 0;

  /** 
   *  Specifies the maximum value of the slider and numeric entry field (defaults to 100). 
   *  This prop should be set on this component rather than (or in addition to) the slotted `input type="range"`.  
   */
  @Prop() max: number = 100;
  
  /** 
   *  Specifies the step value of the slider and numeric entry field (defaults to 1). 
   *  This prop should be set on this component rather than (or in addition to) the slotted `input type="range"`.  
   */
  @Prop() step: number = 1;

  /** Specifies whether the min/max values are hidden (shown by default). */
  @Prop() hideMinmax: boolean;

  /** Specifies whether the numeric input is hidden (shown by default). */
  @Prop() hideInput: boolean;

  /** Specifies that the field has an error (and sets aria-invalid accordingly). Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true }) error: boolean = false;

  /** Specifies that the field is disabled. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  // Sync the values regardless of which field was updated.
  handleChange(e) {
    let newValue = (!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value))) ? e.target.value : this.min;
    if (newValue < this.min) newValue = this.min;
    if (newValue > this.max) newValue = this.max;
    this.formField.value = newValue;
    if (this.valueField) this.valueField.value = newValue; // set explicitly because the re-render is inconsistent
    let newValuePercent = (newValue - this.min) / (this.max - this.min);
    this.host.style.setProperty('--cbp-slider-track-selection-size', `${newValuePercent}`);
    this.value = newValue;
  }

  componentWillLoad() {
    this.formField = this.host.querySelector('input[type=range]');

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    // Set the min/max/step/value on the native input[type=range] on load.
    if (!!this.formField) {
      this.formField.getAttribute('id')
          ? this.fieldId = this.formField.getAttribute('id')
          : this.formField.setAttribute('id', `${this.fieldId}`);
      if (this.value) this.formField.setAttribute('value', `${this.value}`);
      if (this.min) this.formField.setAttribute('min', `${this.min}`);
      if (this.max) this.formField.setAttribute('max', `${this.max}`);
      if (this.step) this.formField.setAttribute('step', `${this.step}`);
      if (this.disabled) this.formField.setAttribute('disabled', ``);

      // The input foes not retain focus on Mac when clicked, so force it
      this.formField.addEventListener('click', () => this.formField.focus());
      this.formField.addEventListener('input', (e) => this.handleChange(e));
    }
  }

  render() {
    return (
      <Host>
        {(!this.hideMinmax || this.host.querySelector('[slot="cpb-slider-before"]')) &&
          <span>
            {!this.hideMinmax && this.min}
            <slot name="cpb-slider-before" />
          </span>
        }

        <div class="cbp-slider-wrapper">
          <span class="cbp-slider-selection"></span>
          <slot />
        </div>
        
        {(!this.hideMinmax || this.host.querySelector('[slot="cpb-slider-after"]')) &&
          <span>
            <slot name="cpb-slider-after" />
            {!this.hideMinmax && this.max}
          </span>
        } 

        {!this.hideInput && <input type="number" 
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          disabled={this.disabled}
          aria-label="Slider value"
          aria-describedby={`${this.fieldId}-label`}
          aria-invalid={this.error}
          ref={(el) => this.valueField = el} 
          onChange={ (e) => this.handleChange(e)}
          onKeyUp={ (e) => this.handleChange(e)}
        />}
      </Host>
    );
  }
}