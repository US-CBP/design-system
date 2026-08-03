import { Component, Prop, Element, Event, EventEmitter, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';


/**
 * The Form Field component represents a generic, reusable pattern for form fields of all types, displaying the 
 * label and form control, along with optional descriptive text and error state in a consistent and accessible manner.
 * 
 * @slot - the default slot holds the form control(s)/input(s).
 * @slot cbp-form-field-label - An optional slot for labels containing markup.
 * @slot cbp-form-field-description - An optional slot for descriptions containing markup.
 */
@Component({
  tag: 'cbp-form-field',
  styleUrl: 'cbp-form-field.scss'
})
export class CbpFormField {

  // These are only set for non-group form fields and should be null for groups
  private formField: any;
  //private formFields: any[] = [];
  private formFieldComponent: any;
  private buttons: any;
  private attachedButtons: any;
  private hasDescription: boolean;
  
  @Element() private host: HTMLElement;


  /** Provide a visible/accessible label for the form field/group. */
  @Prop() label: string;
  
  /** Provide additional details about the field, including whether it's required, which is applied to the form field via `aria-describedby`. */
  @Prop() description: string;

  /** Optionally specify the ID of the field here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-formfield');

  /** Specifies that this form field represents a group of (slotted) inputs, such as a radio list, checklist, or related inputs in a compound pattern. */
  @Prop({ reflect: true }) group: boolean;

  /** Specifies that the field has an error (and sets aria-invalid accordingly). */
  @Prop({ reflect: true }) error: boolean;

  /** Specifies the error message(s) to replace the description text while in an error state. */
  @Prop() errorMessages: string | any;

  /** Specifies that the field is readonly; sets all form fields as readonly and related button controls to disabled.  */
  @Prop({ reflect: true }) readonly: boolean;
  
  /** Specifies that the field is disabled; sets all form fields and button controls as disabled. */
  @Prop({ reflect: true }) disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** 
   * A custom event emitted when a nested input is changed by user interaction.
   * If the nested field is a component that already emits its own valueChange event 
   * this component will not fire another, as the bubbled event will suffice.
   */
  @Event() valueChange: EventEmitter;


  /*
    Handles native change events for which event handlers were explicitly set up for.
    (native change events do not bubble)
  */
  handleChange(e) {
    // emit valueChange event
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.formField.value,
      nativeEvent: e
    });
  }

  // Listen for checkbox and radio button changes to provide a roll-up of values via valueChange
  @Listen('toggleClick')
  @Listen('stateChanged')
  handleStateChange(e) {
    const fieldName = e.detail?.nativeElement.getAttribute('name');
    const isCheckbox:boolean = e.detail?.nativeElement.getAttribute('type') == "checkbox";

    // Determine if this is a checklist of same-named items or not.
    let checkedListItems;
    if(isCheckbox && fieldName != undefined) {
      checkedListItems = Array.from(this.host.querySelectorAll(`input[type="checkbox"][name="${fieldName}"]`));
    }

    if(checkedListItems?.length > 1) {
      // Get all same-named checkboxes/radios and report the values of all checked items in the list as an array
      const checkedItems = Array.from(this.host.querySelectorAll(`input[type="checkbox"][name="${fieldName}"]:checked`));
      let values = [];
      checkedItems.forEach( item => {
        values = [...values, item.getAttribute('value')];
      });

      // Emit the event (only if the fields are named)
      this.valueChange.emit({
        host: this.host,
        nativeElement: e.detail?.nativeElement,
        name: fieldName,
        value: values,
        nativeEvent: e.detail?.nativeEvent
      });
    }

    // If the field was not named or is a radio, just emit a valueChange focused on the single item, returning a null value if unchecked
    else {
      this.valueChange.emit({
        host: this.host,
        nativeElement: e.detail?.nativeElement,
        name: fieldName,
        value: e.detail?.checked ? e.detail?.value : null,
        nativeEvent: e.detail?.nativeEvent
      });
    }
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
    if (this.formFieldComponent) {
      this.formFieldComponent.readonly = newValue;
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
    if (this.formFieldComponent) {
      this.formFieldComponent.disabled = newValue;
    }
    if(this.buttons) {
      this.buttons.forEach( (el) => {
        el.disabled= this.disabled || this.readonly;
      });
    }
  }

  @Watch('error')
  watchErrorHandler(newValue: boolean) {
    // This is already filtered for non-groups
    if (this.formField) {
      (newValue) 
        ? this.formField.setAttribute('aria-invalid', 'true')
        : this.formField.removeAttribute('aria-invalid');
    }
    if (this.formFieldComponent) {
      this.formFieldComponent.error = newValue;
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
  }

  componentDidLoad() {
    // Moved this logic to componentDidLoad so that it works with buttons rendered by the component lifecycle (not just slotted), such as in file input.
    if (!this.group) {
      // query the DOM for the slotted form field
      this.formField = this.host.querySelector('input,select,textarea');
      //this.formFields = Array.from(this.host.querySelectorAll('button[role=combobox],input,select,textarea')) as any;
      
      // Treat nested components separately, as it's hard to modify their rendered content directly
      this.formFieldComponent = this.host.querySelector('cbp-dropdown,cbp-slider,cbp-file-input');

      this.buttons = this.host.querySelectorAll('cbp-button');
      this.attachedButtons = this.host.querySelectorAll('[slot=cbp-form-field-attached-button] cbp-button');
      this.hasDescription = !!this.description || !!this.host.querySelector('[slot=cbp-form-field-description]');

      // For single child/non-grouped form field, hook up the ID and aria-describedby and add an onChange listener where appropriate
      if (this.formField) {
        // If the slotted form field has an ID, use it; otherwise, set it.
        this.formField.getAttribute('id')
          ? this.fieldId = this.formField.getAttribute('id')
          : this.formField.setAttribute('id', `${this.fieldId}`);
        this.hasDescription && this.formField.setAttribute('aria-describedby',`${this.fieldId}-description`);

        // Listen for native change events (unless already handled by a custom component)
        const ignoredField = this.formField.closest('cbp-dropdown,cbp-slider,cbp-file-input');
        if(!ignoredField) this.formField.addEventListener('change', (e) => this.handleChange(e));
      }

      // Set the disabled/readonly/error states on load only if true. (The Watch decorators only listen for changes, not initial state)
      if (!!this.formField) {
        if (this.readonly) this.formField.setAttribute('readonly', '');
        if (this.disabled) this.formField.setAttribute('disabled', '');
        if (this.error) this.formField.setAttribute('aria-invalid', 'true');
      }
      if (this.formFieldComponent) {
        // Use the ID from the slotted formFieldComponent, which should always exist
        this.formFieldComponent.fieldId
          ? this.fieldId = this.formFieldComponent.fieldId
          : this.formFieldComponent.fieldId = this.fieldId;
        if (this.disabled) this.formFieldComponent.disabled=true;
        if (this.error) this.formFieldComponent.error=true;
      }
      if (!!this.buttons) {
        this.buttons.forEach( (el) => {
          if (this.disabled || this.readonly) el.disabled=true;
        });
      }
      // only attached buttons inherit the danger color when errors are present
      if (!!this.attachedButtons) {
        this.attachedButtons.forEach( (el) => {
          if (this.error) el.color="danger";
        });
      }
    }

    // Handle groups
    else {

    }
  }


  render() {
    // Grouped/compound form inputs
    if (this.group) {
      return (
        <Host>
          <fieldset 
            disabled={this.disabled}
            aria-labelledby={`${this.fieldId}-grouplabel`}
            aria-describedby={`${this.fieldId}-description`}
            aria-invalid={this.error ? 'true' : false}
          >
            <legend
              id={`${this.fieldId}-grouplabel`}
              class="cbp-form-field-label"
            >
              <slot name="cbp-form-field-label" />
              {this.label}
            </legend>

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
          </fieldset>
        </Host>
      );
    }

    // Single input patterns
    else {
      return (
        <Host>
          <label 
            htmlFor={this.fieldId} 
            id={`${this.fieldId}-label`}
            class="cbp-form-field-label"
          >
            <slot name="cbp-form-field-label" />
            {this.label}
          </label>

          <div
            id={`${this.fieldId}-description`}
            class="cbp-form-field-description"
            hidden={!this.description && !this.host.querySelector('[slot=cbp-form-field-description]')}
          >
            {this.error && <cbp-icon name="triangle-exclamation" color="var(--cbp-form-field-color-description)" size="var(--cbp-space-3x)" sx='{"margin-inline-end":"var(--cbp-space-1x)"}'></cbp-icon>}
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
}