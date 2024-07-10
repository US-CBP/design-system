import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
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
  private hasDescription: boolean;
  
  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop() description: string;
  
  /** Optionally specify the ID of the field here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop() fieldId: string = createNamespaceKey('cbp-formfield');
  
  @Prop({ reflect: true }) error: boolean;
  
  @Prop() errorMessages: string | any;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange!: EventEmitter;
  /* A custom event emitted when the component has completed loading and its internal lifecycles. */
  //@Event() componentLoad!: EventEmitter;


  handleChange() {
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.formField.value,
    });
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
    this.hasDescription = !!this.description || !!this.host.querySelector('[slot=cbp-form-field-description]');

    // query the DOM for the slotted form field and wire it up for accessibility and attach an event listener to it
    if (!this.formField) {
      const slotted = (this.formField = this.host.querySelector('input,select,textarea'));
      if (slotted) {
        this.formField = slotted;
        this.formField.setAttribute('id',`${this.fieldId}`);
        this.hasDescription && this.formField.setAttribute('aria-describedby',`${this.fieldId}-description`);
        this.formField.addEventListener('change', this.handleChange);
      }
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
