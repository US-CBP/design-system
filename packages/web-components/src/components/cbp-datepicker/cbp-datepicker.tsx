import { Component, Element, Prop, Method, Listen, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey, clickAwayListener } from '../../utils/utils';
import { floatUI, floatUIProps } from '../../utils/floatingPlacement';
import * as FocusTrap from 'focus-trap';

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
  private dialog: HTMLElement;
  private datePicker: HTMLCbpDatepickerCalendarElement;
  private focusTrap: any;
  //private initialValue: any; // Save the initial value to support reset functionality
  private type: string = "date";
  private disabled: boolean;
  private readonly: boolean;

  private today: string = new Date().toJSON().slice(0, 10);

  @Element() private host: HTMLElement;

  /** The `name` attribute of the input, which is passed as part of formData (as a key). */
  @Prop({ mutable: true }) name: string;

  /** The `name` attribute of the input, which is passed as part of formData (as a key). */
  @Prop({ mutable: true }) value: string;

  /** 
   * Optionally specify the ID of the input here, which is used to generate related pattern 
   * node IDs and associate everything for accessibility. 
   */
  @Prop({ mutable: true }) fieldId: string = createNamespaceKey('cbp-datepicker');

  @Prop({ mutable: true }) min: string = '01/01/1900' //'1900-01-01';
  @Prop({ mutable: true }) max: string = '12/31/2099' //'2099-12-31';

  /* The `value` attribute of the input, which is passed as part of formData. */
  //@Prop({ mutable: true }) value: string;


  /* 
   * Specifies that the field has an error (and sets aria-invalid accordingly). Primarily controlled by the 
   * parent `cbp-form-field` component. 
   */
  //@Prop({ reflect: true }) error: boolean = false;

  /* Specifies that the field is disabled. Primarily controlled by the parent `cbp-form-field` component. */
  //@Prop({ reflect: true, mutable: true }) disabled: boolean = false;

  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /** 
   * Specifies the context of the component as it applies to the visual design and whether 
   * it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {}

  //@State() private open: boolean = false;

  /** 
   * A custom event emitted when the value of the component changes, either by selecting (non-duplicate) files 
   * or canceling the dialog, or clicking the button in the file list to remove a file.
   */
  @Event() valueChange: EventEmitter;
  handleChange(e) {
    // send focus back to the form field just in case focus was lost/not applied automatically by the browser.
    //this.formField.focus();

    // Only emit the value if the value actually changed
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      name: this.name,
      value: this.formField?.value,
      nativeEvent: e
    });
    
    console.log('cbp-datepickerValue Change Event Emitted: ', {
      host: this.host,
      nativeElement: this.formField,
      name: this.name,
      value: this.formField?.value,
      nativeEvent: e
    });
  }

  @Watch('open')
  watchOpen(newValue) {
    if (newValue) {
      // Toggling the value passed to the calendar should resolve this, letting the datepicker-calendar handle the focus on its own.
      //this.datePicker.setFocus(this.today.toJSON().slice(0, 10));
      console.log('cbp-datepicker opened, setting up clickaway listener.');
      // Set up a clickaway listener to close the menu
      setTimeout(() => {
        clickAwayListener(this.datePicker, _ => {
          this.open = false;
        });
      }, 10);
    }
    else {
      console.log('cbp-datepicker closed, removing clickaway listener?');
      this.focusTrap?.deactivate();
      clickAwayListener(this.datePicker, null); // Remove the clickaway listener when the menu is closed
      this.datePicker.panel='day'; // reset the panel to day when the datepicker is closed
    }
  }

  @Watch('disabled')
  watchDisabledHandler(newValue: boolean) {
    if (this.formField) {
      (newValue) 
        ? this.formField.setAttribute('disabled', '')
        : this.formField.removeAttribute('disabled');
    }
  }

  @Listen('dateSelected')
  handleDateSelected(e) {
    this.open = false;
    this.value = e.detail.date;
    this.formField.value = e.detail.date;
    this.formField.focus();
    this.handleChange(e);
  }

  /** Closes the datepicker dialog and returns focus to the form field. */
  @Method()
  async close() {
    this.open = false;
    this.formField.focus();
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
      this.formField?.addEventListener('change', (e) => this.handleChange(e));

      // If a native date input is used (preferred), prevent it from opening the native date picker dialog
      const dateTypes = ["date", "month", "week"];
      const inputType = this.formField?.getAttribute('type');
      const dateInput = dateTypes.some( keyword => inputType.includes(keyword));
      console.log('Date type detected? : ',dateInput, inputType);
      //const dateInput = this.formField.getAttribute('type').includes("date") ? true : false;
      if (dateInput) {
        this.formField.addEventListener('keydown', (e) => this.preventNativeDatePicker(e));
        this.formField.addEventListener('focus', (e) => e.preventDefault());
        this.formField.addEventListener('click', (e) => e.preventDefault());
      }

      // If the type is month or week, set the type property accordingly (anything else is treated as a date type)
      if (["month", "week"].includes(inputType)) {
        this.type = inputType;
      }
    }
  }

  componentDidLoad() {
    // Create focus trap for the dialog (toggles on in componentDidRender when the dialog is opened and off in the watch decorator)
    this.focusTrap = FocusTrap.createFocusTrap(this.dialog, {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });
  }

  componentWillRender() {
    this.disabled = !!this.formField?.getAttribute('disabled');
    this.readonly = !!this.formField?.getAttribute('readonly');
    //console.log(this.disabled, this.readonly);
  }

  componentDidRender() {
    if (this.open) {
      const floatUiprops: floatUIProps= {
        placement: 'bottom-start',
        offset: {
          mainAxis: 0,
        },
        flip: true,
        size: {
          height: (parseFloat(window?.getComputedStyle(this.dialog).getPropertyValue('height')))
        },
        shift: false,
      }
      floatUI(floatUiprops, this.formField, this.dialog);

      // Activate focus trap when dialog is opened (this may need to be behind a timeout too)
      this.focusTrap.activate();
    }
  }

  render() {
    //console.log('Rendering cbp-datepicker: ');
    //console.log('Form Field Value: ', this.formField?.value);
    //console.log('Today: ', this.today);
    //console.log('What is passed to the datepicker-calendar: ', this.open ? (this.formField?.value ? this.formField?.value : this.today) : '');


    return (
      <Host onKeyDown={(e) => this.handleEscape(e)}>
        <cbp-form-field-wrapper>
          <slot />
          <span slot="cbp-form-field-attached-button">
            <cbp-button
              color="secondary"
              accessibilityText="Date picker dialog"
              aria-describedby={`${this.fieldId}-label`}
              controls={`${this.fieldId}-datepicker`}
              expanded={`${this.open}`}
              //ref={ el => this.control = el}
              onButtonClick={() => this.toggleDatePicker()}
            >
              <cbp-icon name="calendar-days" />
            </cbp-button>
          </span>
        </cbp-form-field-wrapper>
        
        <div
          hidden={!this.open}
          id={`${this.fieldId}-datepicker`}
          role="dialog"
          tabindex={-1}
          arial-label="Select Date"
          ref={el => this.dialog = el!}
        >
          <cbp-datepicker-calendar
            min={this.min}
            max={this.max}
            date={this.open ? (this.formField?.value ? this.formField?.value : this.today) : ''}
            type={this.open ? this.type : ''}
            //panel={this.open ? null : 'day'}
            ref={el => this.datePicker = el!}
          />
        </div>
      </Host>
    );
  }
}
