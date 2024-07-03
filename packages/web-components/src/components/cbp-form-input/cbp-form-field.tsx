import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';


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

  private formControl: any;
  
  @Element() host: HTMLElement;


  @Prop() label: string;
  @Prop() description: string;
  
  @Prop({ reflect: true }) error: boolean;
  
  @Prop() errorMessages: string | any;

  /** Marks the rendered button/link in a readonly state when specified. */
  //@Prop() readonly: boolean;

  /** Marks the rendered button/link in a disabled state when specified. */
  //@Prop() disabled: boolean;

  

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange!: EventEmitter;
  /** A custom event emitted when the component has completed loading and its internal lifecycles. */
  @Event() componentLoad!: EventEmitter;


  handleChange() {
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formControl,
      value: this.formControl.value,
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
    // If the button was not defined by ref in the render lifecycle, query the DOM for one that may have been slotted and attach an event listener to it
    if (!this.formControl) {
      const slotted = (this.formControl = this.host.querySelector('button,a'));
      if (slotted) {
        this.formControl = slotted;
        this.formControl.addEventListener('change', this.handleChange);
      }
    }

    this.componentLoad.emit({
      host: this.host,
      nativeElement: this.formControl,
      value: this.formControl.value,
    });
  }


  render() {
    return (
      <Host>
        <label htmlFor="id" class="cbp-form-field-label">
          {this.label}
          <slot name="cbp-form-field-label" />
        </label>

        <div class="cbp-form-field-description">
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
