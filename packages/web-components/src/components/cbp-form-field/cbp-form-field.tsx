import { Component, Prop, Element, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';


/**
 * @slot - the default slot holds the form control(s)/input(s).
 * @slot cbp-form-field-label - An optional slot for labels containing markup.
 * @slot cbp-form-field-description - An optional slot for descriptions containing markup.
 */
@Component({
  tag: 'cbp-form-field',
  styleUrl: 'cbp-form-field.scss'
})
export class CbpFormField {

  private formField: any;
  private buttons: any;
  private hasDescription: boolean;
  
  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop() description: string;
  
  /** Optionally specify the ID of the field here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-formfield');
  
  @Prop({ reflect: true }) error: boolean;

  @Prop() errorMessages: string | any;

  /** Specifies that the field is readonly; sets all form fields as readonly and related button controls to disabled.  */
  @Prop({ reflect: true }) readonly: boolean;
  
  /** Specifies that the field is disabled; sets all form fields and button controls as disabled. */
  @Prop({ reflect: true }) disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;
  handleChange() {
    this.valueChange.emit({
      host: this.host,
      //nativeElement: this.formField,
      //value: this.formField.value,
    });
  }

  /*
   * Manage the disabled/readonly/error state of slotted form fields and buttons
   * These are implemented as individual Watches so that they don't override direct management of disabled/readonly states on the slotted inputs
   */
  @Watch('readonly')
  watchReadonlyHandler(newValue: boolean) {
    if (this.formField) {
        (newValue) 
          ? this.formField.setAttribute('readonly', '')
          : this.formField.removeAttribute('readonly');
    }
    if(this.buttons) {
      this.buttons.forEach( (el) => {
        el.disabled = this.disabled || this.readonly;
      });
    }
  }

  @Watch('disabled')
  watchDisabledHandler(newValue: boolean) {
    if (this.formField) {
      (newValue) 
        ? this.formField.setAttribute('disabled', '')
        : this.formField.removeAttribute('disabled');
    }
    if(this.buttons) {
      this.buttons.forEach( (el) => {
        el.disabled= this.disabled || this.readonly;
      });
    }
  }

  @Watch('error')
  watchErrorHandler(newValue: boolean) {
    if (this.formField) {
      (newValue) 
        ? this.formField.setAttribute('aria-invalid', 'true')
        : this.formField.removeAttribute('aria-invalid');
    }
    if(this.buttons) {
      this.buttons.forEach( (el) => {
        (newValue) 
          ? el.color="danger"
          : el.color="secondary";
      });
    }
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });

    // query the DOM for the slotted form field and wire it up for accessibility and attach an event listener to it
    this.formField = this.host.querySelector('input,select,textarea');
    this.buttons = this.host.querySelectorAll('cbp-button');
    this.hasDescription = !!this.description || !!this.host.querySelector('[slot=cbp-form-field-description]');

    if (this.formField) {
      this.formField.setAttribute('id',`${this.fieldId}`); // TechDebt: this requires more thought for compound inputs
      this.hasDescription && this.formField.setAttribute('aria-describedby',`${this.fieldId}-description`);
      this.formField.addEventListener('change', this.handleChange());
    }
  }

  componentDidLoad() {
    // The Watch decorators only listen for changes.
    // Set the disabled/readonly/error states on load only if true.
    if (!!this.formField) {
      if (this.readonly) this.formField.setAttribute('readonly', '');
      if (this.disabled) this.formField.setAttribute('disabled', '');
      if (this.error) this.formField.setAttribute('aria-invalid', 'true');
    }
    if (!!this.buttons) {
      this.buttons.forEach( (el) => {
        if (this.disabled || this.readonly) el.disabled=true;
        if (this.error) el.color="danger";
      });
    }
  }


  render() {
    return (
      <Host>
        <label 
          htmlFor={this.fieldId} 
          id={`${this.fieldId}-label`}
          class="cbp-form-field-label"
        >
          {this.label}
          <slot name="cbp-form-field-label" />
        </label>

        <div
          id={`${this.fieldId}-description`}
          class="cbp-form-field-description"
        >
          {this.error && <cbp-icon name="triangle-exclamation" color="var(--cbp-form-field-color-description)" sx='{"margin-inline-end":"var(--cbp-space-1x)","vertical-align":"text-top"}'></cbp-icon>}
          {this.description}
          <slot name="cbp-form-field-description" />
        </div>

        <div class="cbp-form-field-container">
          <slot />
        </div>

        <slot name="cbp-form-field-extra" />
      </Host>
    );
  }

}

