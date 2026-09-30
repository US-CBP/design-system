import { Component, Element, Prop, Event, EventEmitter, Method, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';


/**
 * The Radio component wraps the slotted native form control (`input type="radio"`) and label text, providing cross-browser styling.
 * 
 * @slot - The radio control and label text goes in the default slot, both of which are placed inside of the `label` element. The label should not include excessively long descriptive text.
 */
@Component({
  tag: 'cbp-radio',
  styleUrl: 'cbp-radio.scss'
})
export class CbpRadio {

  private formField: HTMLInputElement;
  private initialChecked: boolean; // Save the initial value to support reset functionality

  @Element() private host: HTMLElement;

  /** The `name` attribute of the radio button, which is passed as part of formData (as a key) only when the radio button is checked. */
  @Prop() name: string;

  /** Optionally set the `value` attribute of the radio button at the component level. Not needed if the slotted radio button has a value. */
  @Prop() value: string;

  /** Optionally specify the ID of the checkbox input here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop({ mutable: true }) fieldId: string = createNamespaceKey('cbp-radio');

  /** Marks the radio button as checked by default when specified. */
  @Prop() checked: boolean;

  /** Marks the radio button in a disabled state when specified. */
  @Prop() disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() stateChanged: EventEmitter;
  handleChange(e) {
    this.checked=this.formField.checked;
    this.stateChanged.emit({
      host: this.host,
      nativeElement: this.formField,
      name: this.formField.name,
      value: this.formField.value,
      checked: this.formField.checked,
      nativeEvent: e
    });
  }

  /** 
   * A custom method to reset the Radio component to its initial state and value since it does not update 
   * properly on a native form reset when the checked state is set via the component property. This method may 
   * be called manually, but is automatically called on form reset when using the `cbp-form` component.
   */
  @Method()
  async reset() {
    // The prop may not have changed, so don't rely on a re-render to update it
    this.checked = this.initialChecked;
    this.initialChecked ? this.formField?.setAttribute('checked','') : this?.formField.removeAttribute('checked');
  }


  @Watch('disabled')
  watchDisabledHandler(newValue: boolean) {
    if (this.formField) {
      (newValue) 
        ? this.formField.setAttribute('disabled', '')
        : this.formField.removeAttribute('disabled');
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
    this.formField = this.host.querySelector('input[type=radio]');

    if (this.formField) {
      const radioId = this.formField.getAttribute('id');
      radioId ? this.fieldId = radioId : this.formField.setAttribute('id', this.fieldId);
      this.formField.addEventListener('change', e => this.handleChange(e));
    }
  }

  componentDidLoad() {
    // Set the disabled/indeterminate states on load only if true. (The Watch decorators only listen for changes, not initial state)
    if (!!this.formField) {
      if (this.checked) this.formField.checked=this.checked;
      if (this.disabled) this.formField.setAttribute('disabled', '');
      if (this.name) this.formField.name=this.name;
      if (this.value) this.formField.value=this.value;
    
      // sync the checked prop with the checkbox
      this.checked = this.formField.checked;
    }

    this.initialChecked=this.checked;
  }

  render() {
    return (
      <Host>
        <label htmlFor={this.fieldId}>
          <slot />
        </label>
      </Host>
    );
  }

}
