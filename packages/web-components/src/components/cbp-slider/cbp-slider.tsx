import { Component, Element, Prop, Event, EventEmitter, Method, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

/**
 * The Slider component allows for the selection of a value within a range, styled to design system specifications.
 * 
 * @slot - A native `input type="range"` (or 2 for range sliders) gets slotted within the default slot.
 * @slot cpb-slider-before - an optional slot to place content (e.g., an icon) before the slider control.
 * @slot cpb-slider-after - an optional slot to place content (e.g., an icon) after the slider control.
 */
@Component({
  tag: 'cbp-slider',
  styleUrl: 'cbp-slider.scss'
})
export class CbpSlider {

  private formFields: HTMLInputElement[] = [];
  private valueField1: HTMLInputElement;
  private valueField2: HTMLInputElement;
  private valueFields: HTMLInputElement[] = [];  // You can't set a ref to an array index, so we'll construct the array after they've loaded.
  private initialValue: any; // Save the initial value to support reset functionality

  @Element() private host: HTMLElement;

  /** 
   * Optionally specify the ID of the visible control here, which is used to generate related pattern node IDs and associate everything for accessibility. 
   * For range sliders, "-start" and "-end" are appended to the specified/generated value automatically.
   */
  @Prop() fieldId: string = createNamespaceKey('cbp-slider');

  /** 
   * Specifies the value of the slider and numeric entry field. It is highly recommended to set a contextually sensible default because
   * the native `input type="range"` cannot have an undefined or empty string as a value. If no value is specified, the default value will 
   * be reported (and submitted) as halfway between the specified minimum and maximum; unless the maximum is actually less than the minimum, 
   * in which case the default is set to the value of the minimum attribute.
   * This prop should be set on this component rather than (or in addition to) the slotted `input type="range"`. 
   */
  @Prop({ mutable: true, reflect: true }) value: number | number[] | string | string[];

  /** Specifies the minimum difference in values in a range slider. If a non-zero value is specified, keep in mind the interaction with the "step" property. */
  @Prop() gap: number = 0;

  /** Specifies whether the control is a single slider or a range with two values (can be auto-detected by the number of slotted `input[type=range]` tags). */
  @Prop({ reflect: true, mutable: true }) variant: "single" | "range" = "single";

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

  /** 
   * Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event fired when the value of the slider changes. */
  @Event() valueChange: EventEmitter;

  /** 
   * A custom method to reset the Slider component to its initial state and value since it does not update 
   * properly on a native form reset. This method may be called manually, but is automatically called on 
   * form reset when using the `cbp-form` component.
   */
  @Method()
  async reset() {
    this.value = this.initialValue != undefined ? this.initialValue : '';
    if(this.variant=='range') this.initRangeSlider();

    // Manually set the numeric inputs to their initial values because it's not working via render
    if(!this.hideInput) {
      if(this.variant == 'range') {
        this.valueFields.forEach( (item,index) => {
          !isNaN(this.initialValue[index]) ? item.setAttribute("value", this.initialValue[index]) : item.removeAttribute("value");

        });
      }
      else !isNaN(this.initialValue) ? this.valueField1.setAttribute("value", this.initialValue) : this.valueField1.removeAttribute("value");
    }

    this.setSliderBar();
  }

  @Watch('disabled')
  watchDisabledHandler(newValue: boolean) {
    // for ranges, setting disabled on load isn't working, so do it via watch just in case.
    this.formFields.forEach( (item) => {
      (newValue) 
        ? item.setAttribute('disabled', '')
        : item.removeAttribute('disabled');
    });
  }
  

  // Only emit the valueChange event on native change event for consistency.
  handleChange(e, i=0) {
    // run this again to catch the other cases where an input event is not fired to sync the slider to the value
    this.synchronizeFields(e,i);

    // emit the valueChange event
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formFields[i],
      value: this.value,
      nativeEvent: e
    });
  }


  // Sync the values regardless of which field was updated.
  synchronizeFields(e, i=0) {
    // normalize invalid values to the min or max
    let newValue = (!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value))) ? e.target.value : this.min;
    
    // Enforce the min value
    if(i==1) {
      // set the min of the end input to the range start value + gap
      const Min = Number(this.value?.[0] || this.min) + this.gap;
      if (newValue < Min) newValue = Min;
    }
    else if (newValue < this.min) newValue = this.min;

    // Enforce the max value
    if(i==0 && this.formFields.length > 1) {
      // set the max of the range start to the range end value - gap
      const Max = Number(this.value?.[1] || this.max) - this.gap;
      if (newValue > Max) newValue = Max;
    }
    else if (newValue > this.max) newValue = this.max;

    this.formFields[i].value = newValue;
    if (!!this.valueFields[i]) this.valueFields[i].value = newValue; // set explicitly because the re-render is inconsistent
    
    // Update the component value
    if(this.variant == 'single') this.value = newValue;
    else {
      this.value=[
        i == 0 ? newValue : this.value?.[0] || undefined,
        i == 1 ? newValue : this.value?.[1] || undefined,
      ];
      this.updateRangeBoundaries();
    }
    this.setSliderBar();
  }

  // Set the CSS custom properties that control the slider highlight range based on value(s)
  setSliderBar(){
    if(this.variant == 'single'){
      let newValuePercent = (Number(this.value) - this.min) / (this.max - this.min);
      this.host.style.setProperty('--cbp-slider-track-selection-size', `${newValuePercent || 0}`);
    }
    else {
      let newValuePercent = ((this.value?.[1] - this.value?.[0]) / (this.max - this.min)) || 0;
      let newValueOffsetPercent = (((this.value?.[0] - this.min) / (this.max - this.min)) * 100) || 0;
      this.host.style.setProperty('--cbp-slider-track-selection-size', `${newValuePercent}`);
      this.host.style.setProperty('--cbp-slider-track-selection-offset', `${newValueOffsetPercent}%`);
    }
  }

  initRangeSlider() {
    this.variant="range";
    let value;
    // parse the value into an array
    if (typeof this.value == 'string') {
      value = this.value.split(',').map(Number);
      // replace any NaNs with ''
      value.forEach( (item,index) => {
        if (isNaN(item)) value[index] = '';
      });
      this.value = [...value]
    }
  }

  updateRangeBoundaries() {
    if(!this.hideInput) {
      // Set the max of numeric input 1 and the min of numeric input 2 based on values 
      // We can't actually override the min/max of the sliders because it affects the scale of the input
      this.valueFields.forEach( (item, index) => {
        // set the max of the start input to the range end value - gap
        if(index==0) {
          item?.setAttribute('max', `${Number(this.value[1] || this.max) - this.gap}`);
        }
        // set the min of the end input to the range start value + gap
        if(index==1) {
          item?.setAttribute('min', `${Number(this.value[0] || this.min) + this.gap}`);
        }
      });
    }
  }

  componentWillLoad() {
    this.formFields = Array.from(this.host.querySelectorAll('input[type=range]'));
    
    // initialize the range slider by setting the variant and parsing the value to an array
    if (this.formFields.length > 1) {
      this.initRangeSlider();
    }

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  // Set the min/max/step/value on the native input[type=range] on load.
  componentDidLoad() {
    this.valueFields = this.variant == 'range' ? [this.valueField1,this.valueField2] : [this.valueField1];

    // Loop over the input[type=range] fields to update their attributes based on props
    this.formFields.forEach( (item, index) => {
      if (!!item.getAttribute('id')) {
        this.fieldId = item.getAttribute('id')
      }
      else {
        if (this.variant == 'single') {
          item.setAttribute('id', `${this.fieldId}`);
        }
        else {
          item.setAttribute('id', `${this.fieldId}${index == 1 ? '-end' : ''}`);
        }
      }

      if (this.value) item.setAttribute('value', this.variant == 'range' ? this.value[index] : this.value);
      if (this.min) item.setAttribute('min', `${this.min}`);
      if (this.max) item.setAttribute('max', `${this.max}`);
      if (this.step) item.setAttribute('step', `${this.step}`);
      // this seems to work for a single slider, but not a range slider; added a watch to handle it
      if (this.disabled) item.setAttribute('disabled', '');
      // set aria-labelledby on the second input in a range, since the label only explicitly points to the first.
      // As a faux-group, we don't need to link the description.
      if (index==1) item.setAttribute('aria-labelledby',`${this.fieldId}-label`);
      // Set a description for range sliders for added context
      if(this.variant == "range") {
        if(document.querySelector(`${this.fieldId}-description`)) item.setAttribute('aria-describedby',`${this.fieldId}-description`);
        else item.setAttribute('aria-description', index == 0 ? 'Range start' : 'Range end');
      }

      if(this.value != undefined) {
        this.setSliderBar();
      }

      // The input does not retain focus on Mac when clicked, so force it
      item.addEventListener('click', () => item.focus());
      item.addEventListener('input', (e) => this.synchronizeFields(e, index));
      // Only emit the valueChange event on the actual change event for consistency
      item.addEventListener('change', (e) => this.handleChange(e, index));
      
      // Save the initial value after any parsing has been done
      this.initialValue = this.value;
    })
  }

  componentDidRender(){
    // remove aria-describedby from the numeric input, which is inadvertently set by the cbp-form-field (it's meant for the slider)
    //Techdebt: a11y issue with form field wrapper an aria-describedby on first input for range variant onLoad(), issue is resolved on rerender of slider component
    this.valueFields.forEach( item => {
      item?.removeAttribute('aria-describedby');
    });
  }

  render() {
    return (
      <Host>

        {!this.hideInput && this.variant == 'range' && 
          <input type="number" 
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.variant == 'range' ? this.value?.[0] : `${this.value}`}
            disabled={this.disabled}
            aria-labelledby={`${this.fieldId}-label`}
            aria-description="Slider 1 value"
            aria-invalid={this.error}
            ref={(el) => this.valueField1 = el}
            onChange={ (e) => this.handleChange(e, 0)}
          />
        }


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

        {!this.hideInput && 
          <input type="number" 
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.variant == 'range' ? this.value?.[1] : `${this.value}`}
            disabled={this.disabled}
            aria-labelledby={`${this.fieldId}-label`}
            aria-description={`Slider ${this.variant == 'range' ? 2 : 1} value`}
            aria-invalid={this.error}
            ref={(el) => this.variant == 'range' ? this.valueField2 = el : this.valueField1 = el} 
            onChange={ (e) => this.handleChange(e, this.variant == 'range' ? 1 : 0)}
          />
        }
      </Host>
    );
  }
}