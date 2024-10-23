import { Component, Element, Prop, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps} from '../../utils/utils';


/**
 * @slot - the checkbox control and label text goes in the default slot, both of which are placed inside of the `label` element. The label should not include excessively long descriptive text.
 */
@Component({
  tag: 'cbp-radio',
  styleUrl: 'cbp-radio.scss'
})
export class CbpRadio {

  private formField: HTMLInputElement;

  @Element() host: HTMLElement;

  /** The `name` attribute of the radio button, which is passed as part of formData (as a key) only when the radio button is checked. */
  @Prop() name: string;

  /** Optionally set the `value` attribute of the radio button at the component level. Not needed if the slotted radio button has a value. */
  @Prop() value: string;

  /** Marks the radio button as checked by default when specified. */
  @Prop() checked: boolean;

  /** Marks the radio button in a disabled state when specified. */
  @Prop() disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  //this.formField.indeterminate=true;

  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() stateChanged: EventEmitter;
  handleChange() {
    this.checked=this.formField.checked;
    this.stateChanged.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.formField.value,
      checked: this.formField.checked
    });
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
      this.formField.addEventListener('change', () => this.handleChange());
    }
  }

  componentDidLoad() {
    // Set the disabled/indeterminate states on load only if true. (The Watch decorators only listen for changes, not initial state)
    if (!!this.formField) {
      if (this.checked) this.formField.checked=this.checked;
      if (this.disabled) this.formField.setAttribute('disabled', '');
      if (this.name) this.formField.name=this.name;
      if (this.value) this.formField.value=this.value;
    }
  }

  render() {
    return (
      <Host>
        <label>
          <slot />
        </label>
      </Host>
    );
  }

}
