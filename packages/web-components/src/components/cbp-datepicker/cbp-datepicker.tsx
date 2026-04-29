import { Component, Element, Prop, State, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';


/** 
 * The File Input component builds upon the native file input, allowing for custom styles and 
 * enhancing functionality when integrated with JavaScript frameworks. This component should 
 * be used within the `cbp-form-field` component like any other input pattern.
 * 
 * @slot - The native `input type="file"` gets slotted in the default slot.
 */
@Component({
  tag: 'cbp-datepicker',
  styleUrl: 'cbp-datepicker.scss'
})
export class CbpDatepicker {

  private formField: HTMLInputElement;
  //private initialValue: any; // Save the initial value to support reset functionality
  private disabled: boolean;
  private readonly: boolean;

  @Element() private host: HTMLElement;

  /** The `name` attribute of the input, which is passed as part of formData (as a key). */
  @Prop({ mutable: true }) name: string;

  /** 
   * Optionally specify the ID of the input here, which is used to generate related pattern 
   * node IDs and associate everything for accessibility. 
   */
  @Prop({ mutable: true }) fieldId: string = createNamespaceKey('cbp-datepicker');

  /* The `value` attribute of the input, which is passed as part of formData. */
  //@Prop({ mutable: true }) value: string;


  /* 
   * Specifies that the field has an error (and sets aria-invalid accordingly). Primarily controlled by the 
   * parent `cbp-form-field` component. 
   */
  //@Prop({ reflect: true }) error: boolean = false;

  /* Specifies that the field is disabled. Primarily controlled by the parent `cbp-form-field` component. */
  //@Prop({ reflect: true, mutable: true }) disabled: boolean = false;

  /** 
   * Specifies the context of the component as it applies to the visual design and whether 
   * it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {}


  @State() private open: boolean = false;

  /** 
   * A custom event emitted when the value of the component changes, either by selecting (non-duplicate) files 
   * or canceling the dialog, or clicking the button in the file list to remove a file.
   */
  @Event() valueChange: EventEmitter;
  handleChange(e) {
    // send focus back to the form field just in case focus was lost/not applied automatically by the browser.
    this.formField.focus();

    // Only emit the value if the value actually changed
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      name: this.name,
      value: this.formField.value,
      nativeEvent: e
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

  // Don't allow enter or space to open the native date picker dialog
  private preventNativeDatePicker(e) {
    console.log(e);
    
    const { key } = e;
    if (key == 'Enter' || key ==' ') {
      e.preventDefault();
      if (!this.disabled && !this.readonly){
        this.toggleDatePicker();
      }
    }
    return true;
  }

  // Clicking the button or hitting enter/space toggles the picker
  private toggleDatePicker() {
    if (!this.disabled && !this.readonly) {
      this.open = !this.open;
    }
  }

  // Pressing ESC closes the picker
  private handleEscape(e) {
    const { key } = e;
    if (key == 'Escape') {
      this.open=false;
      //return false;
    }
    return true;
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });

    // Query the DOM for the slotted form field and wire it up for accessibility and attach an event listener to it
    this.formField = this.host.querySelector('input');
    
    if (this.formField) {
      const Id = this.formField.getAttribute('id');
      Id ? this.fieldId = Id : this.formField.setAttribute('id', this.fieldId);
      const Name = this.formField.getAttribute('name');
      Name ? this.name = Name : (this.name ? this.formField.setAttribute('Name', this.name) : null);
      
      //if (this.disabled) this.formField.setAttribute('disabled', ``);
      //if (this.readonly) this.formField.setAttribute('readonly', ``);

      // Set event listeners
      //this.formField.addEventListener('change', (e) => this.handleChange(e));

      // If a native date input is used (preferred), prevent it from opening the native date picker dialog
      const dateInput = this.formField.getAttribute('type') == "date" ? true : false;
      if (dateInput) {
        this.formField.addEventListener('keydown', (e) => this.preventNativeDatePicker(e));
        this.formField.addEventListener('focus', (e) => e.preventDefault());
        this.formField.addEventListener('click', (e) => e.preventDefault());
      }
    }
  }

  componentWillRender() {
    this.disabled = !!this.formField?.getAttribute('disabled');
    this.readonly = !!this.formField?.getAttribute('readonly');
    console.log(this.disabled, this.readonly);
  }

  render() {
    return (
      <Host onKeyDown={(e) => this.handleEscape(e)}>
        <cbp-form-field-wrapper>
          <slot />
          <cbp-button
            color="secondary"
            accessibilityText="Open date picker dialog"
            aria-describedby={`${this.fieldId}-label`}
            slot="cbp-form-field-attached-button"
            //ref={ el => this.control = el}
            onButtonClick={() => this.toggleDatePicker()}
          >
            <cbp-icon name="calendar-days" />
          </cbp-button>
        </cbp-form-field-wrapper>
        
        <div
          hidden={!this.open}
          id={`${this.fieldId}-datepicker`}
          role="dialog"
          tabindex={-1}
          arial-label="Select Date"
        >
          Datepicker goes here.
        </div>
      </Host>
    );
  }
}
