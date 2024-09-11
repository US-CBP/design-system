import { Component, Element, Prop, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps} from '../../utils/utils';


/**
 * @slot - the checkbox control and label text goes in the default slot, both of which are placed inside of the `label` element. The label should not include excessively long descriptive text.
 */
@Component({
  tag: 'cbp-checkbox',
  styleUrl: 'cbp-checkbox.scss'
})
export class CbpCheckbox {

  //private checkbox: any; // HTMLButtonElement or HTMLAnchorElement
  private formField: any;

  @Element() host: HTMLElement;

  /** The `name` attribute of the checkbox, which is passed as part of formData (as a key) only when the checkbox is checked. */
  @Prop() name: string;

  /** The `value` attribute of the checkbox, which is passed as part of formData (as a value) only when the checkbox is checked. */
  @Prop() value: string;

  /** Marks the checkbox as checked by default when specified. */
  @Prop() checked: boolean;

  /** Marks the checkbox in a disabled state when specified. */
  @Prop() disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() stateChanged: EventEmitter;
  handleChange() {
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
    this.formField = this.host.querySelector('input,select,textarea');

    if (this.formField) {
      this.formField.addEventListener('change', this.handleChange());
    }
  }

  componentDidLoad() {
    // Set the disabled state on load only if true. (The Watch decorators only listen for changes, not initial state)
    if (!!this.formField) {
      if (this.disabled) this.formField.setAttribute('disabled', '');
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
