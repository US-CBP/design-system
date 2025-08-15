import { Component, Element, Event, EventEmitter, Prop, Host, h, Watch} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Toggle component is a visual variant of a Boolean selection form control (checkbox), 
 * representing an on/off toggle switch.
 * 
 * @slot - The label text followed by the native `input type="checkbox"` control are provided in the default slot.
 */
@Component({
  tag: 'cbp-toggle',
  styleUrl: 'cbp-toggle.scss',
})
export class CbpToggle {

  private formField: HTMLInputElement;
  @Element() host: HTMLElement;
  
  /** Marks the toggle as checked by default when specified. */
  @Prop({ reflect: true }) checked: boolean;

  /** Marks the toggle in a disabled state when specified. */
  @Prop({ reflect: true }) disabled: boolean;

  /** Determines if the status text is visible for the render*/
  @Prop() hideStatus: boolean;

  /** Determines the status text for the true toggle*/
  @Prop() statusTextOn: string = 'On';

  /** Determines the status text for the false toggle*/
  @Prop() statusTextOff: string = 'Off';

  /** The `name` attribute of the checkbox, which is passed as part of formData (as a key) only when the checkbox is checked. */
  @Prop() name: string;

  /** Optionally set the `value` attribute of the checkbox at the component level. Not needed if the slotted checkbox has a value. */
  @Prop() value: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
   
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Custom event fired when the control is toggled by the user. */
  @Event() toggleClick: EventEmitter;
  toggleEvent(){
    this.checked=this.formField.checked;

    this.toggleClick.emit({
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

  @Watch('checked')
  watchCheckedHandler(newValue: boolean) {
    if (this.formField) {
      this.formField.checked = newValue;
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
    this.formField = this.host.querySelector('input[type=checkbox]');
    if (this.formField) {
      this.formField.addEventListener('change', () => this.toggleEvent());
    }
  }

  componentDidLoad() {
    // Set the states on load only if true. (The Watch decorators only listen for changes, not initial state)
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
            {!this.hideStatus && <span>{this.checked ? this.statusTextOn : this.statusTextOff}</span>}
          </label>
        </Host>
      );
  }

}
