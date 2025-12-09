import { Component, Element, Prop, State, Event, EventEmitter, Listen, Method, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

/** 
 * The File Input component builds upon the native file input, allowing for custom styles and 
 * enhancing functionality when integrated with JavaScript frameworks. This component should 
 * be used within the `cbp-form-field` component like any other input pattern.
 * 
 * @slot - The native `input type="file"` gets slotted in the default slot.
 */
@Component({
  tag: 'cbp-file-input',
  styleUrl: 'cbp-file-input.scss'
})
export class CbpFileInput {

  private formField: HTMLInputElement;
  private initialValue: any; // Save the initial value to support reset functionality

  @Element() host: HTMLElement;

  /** The `name` attribute of the input, which is passed as part of formData (as a key). */
  @Prop({ mutable: true }) name: string;

  /** 
   * Optionally specify the ID of the input here, which is used to generate related pattern 
   * node IDs and associate everything for accessibility. 
   */
  @Prop({ mutable: true }) fieldId: string = createNamespaceKey('cbp-file-input');

  /** Specifies whether the file input accepts multiple files rather than a single file (may also be set directly on the slotted input). */
  @Prop({ reflect: true }) multiple: boolean;

  /** 
   * Specifies the files types accepted by the file input (may also be set directly on the slotted input). 
   * This property is merely a suggestion to the browser and any file type restrictions should still be 
   * enforced in form validation. 
   */
  @Prop() accept: string;

  /** 
   * Experimental: Specifies whether the functionality is enhanced over the native web platform file input. 
   * This functionality requires integration with a framework or manual handling of the custom events
   * and will not work with a native form post.
   */
  @Prop() enhanced: boolean;

  /**
   * Supports passing back status and error messages as an array of objects or stringified JSON 
   * from the application. The array shall be the same length as the current file list.
   * E.g., [ {"status": "error|success|undefined", "message": "string"}, ... ]
   * One could take the valueChange event's detail.value key, which contains an array of File objects, 
   * and add these keys to it before feeding it back to this component via the `status` property.
   */
  @Prop() status: any = {};

  /** 
   * Specifies that the field has an error (and sets aria-invalid accordingly). Primarily controlled by the 
   * parent `cbp-form-field` component. 
   */
  @Prop({ reflect: true }) error: boolean = false;

  /** Specifies that the field is disabled. Primarily controlled by the parent `cbp-form-field` component. */
  @Prop({ reflect: true, mutable: true }) disabled: boolean = false;

  /** 
   * Specifies the context of the component as it applies to the visual design and whether 
   * it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  @State() files: File[] = [];


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;
  handleChange(e) {
    // For the enhanced version accepting multiple files, iteratively add files to the list
    if(this.enhanced && this.multiple) {
      let files = this.files;
      // type fileList does not support forEach or array methods
      for(let i = 0; i < e.target.files.length; i++) {
        // TechDebt: check for duplicates before adding the file?
        files = [...files, e.target.files[i]]
      }
      this.files = files;
      // Clear the native form input value in the end (but maybe after file reader?)
      this.formField.value='';
    }

    // For the native/single file version, a file selection replaces the previous file(s) selected.
    else {
      let files = [];
      // type fileList does not support forEach or array methods
      for(let i = 0; i < e.target.files.length; i++) {
        files = [...files, e.target.files[i]]
      }
      // Updating this state via an event handler will cause a re-render needed for showing the selected files
      this.files = files;
    }
    // send focus back to the form field just in case focus was lost/not applied automatically by the browser.
    this.formField.focus();

    // TechDebt: this event seems to be firing 3 times when adding a file, based on the native change event, which is doing the same.
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      name: this.name,
      value: this.files,
      nativeEvent: e
    });
  }

  
  /** 
   * A custom method to reset the file input component (for enhanced/multi-file inputs) to its initial state and value 
   * since it does not update properly on a native form reset. This method may be called manually, but is automatically 
   * called on form reset when using the `cbp-form` component.
   */
  @Method()
  async reset() {
    this.formField.value = this.initialValue ? this.initialValue: ''; // reset to empty string if undefined, which should always be the case
    this.files=[];
  }


  /* Testing: This method not yet fully supported */
  @Method()
  async getData() {
    const Data={
      host: this.host,
      name: this.name,
      files: this.files
    }
    //console.log('getData(): ', Data);
    return Data;
  }


  @Watch('disabled')
  watchDisabledHandler(newValue: boolean) {
    if (this.formField) {
      (newValue) 
        ? this.formField.setAttribute('disabled', '')
        : this.formField.removeAttribute('disabled');
    }
  }

  @Watch('status')
  watchStatusHandler(newValue: any) {
    // convert a stringified value to an object
    if (typeof newValue == 'string') {
      this.status = JSON.parse(newValue) || {};
    }
  }


  @Listen('buttonClick')
  handleDelete(e) {
    const {detail: {value}} = e;

    // For enhanced mode, remove individual files
    if(this.enhanced) {
      const filterIndex = value;
      this.files.splice(filterIndex, 1);
      this.files = [...this.files];
      // Remove the item from the status array as well, if defined
      if (this.status.length > 0) {
        this.status.splice(filterIndex, 1);
        this.status = [...this.status];
      }
    }
    // For native platform support, we can only clear all files.
    else {
      this.formField.value='';
      this.files=[];
      this.status={};
    }
    // send focus back to the form field after deletion
    this.formField.focus();

    // Emit a valueChange event here as well
    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      name: this.name,
      value: this.files,
      nativeEvent: e
    });
  }


  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });

    // Query the DOM for the slotted form field and wire it up for accessibility and attach an event listener to it
    this.formField = this.host.querySelector('input[type=file]');
    if (this.formField) {
      const Id = this.formField.getAttribute('id');
      Id ? this.fieldId = Id : this.formField.setAttribute('id', this.fieldId);
      const Name = this.formField.getAttribute('name');
      Name ? this.name = Name : (this.name ? this.formField.setAttribute('Name', this.name) : null);
      
      if (this.multiple) this.formField.setAttribute('multiple', '');
      if (this.accept) this.formField.setAttribute('accept', this.accept);
      if (this.disabled) this.formField.setAttribute('disabled', ``);
      // store the initialValue for reset functionality
      this.initialValue = this.formField?.value;

      // Set event listeners
      this.formField.addEventListener('change', (e) => this.handleChange(e));
      this.formField.addEventListener('dragenter', () => this.formField.classList.add('cbp-file-input-dragged'));
      this.formField.addEventListener('dragleave', () => this.formField.classList.remove('cbp-file-input-dragged'));
      this.formField.addEventListener('drop', () => this.formField.classList.remove('cbp-file-input-dragged'));
    }
  }

  render() {
    let msg = (this.files.length == 0 || (this.enhanced && this.multiple))
      ? `Drag & Drop File${this.multiple ? 's' : ''} Here or Browse ${(this.files.length > 0 && this.enhanced && this.multiple) ? 'to Add More': ''}`
      : `Drag & Drop File${this.multiple ? 's' : ''} Here or Browse to Replace`;


    return (
      <Host>
        <div class="cbp-file-input-wrapper">
          <div class="cbp-file-input-visuals">
            <cbp-icon name="file-lines" size="2rem" />
            <div class="cbp-file-input-text">{msg}</div>
            <cbp-button fill="solid" color="secondary">
              <button slot="cbp-button-custom"
                type="button"
                tabindex="-1"
                aria-hidden="true"
              >
                <cbp-icon name="upload" />
                Browse
              </button>
            </cbp-button>
          </div>
          <slot />
        </div>

        <div class="cbp-file-input-filelist">
          { this.files.map( ({ name, size }, index) => 
              <div 
                key={`${name}-${size}`}
                class={ this.status.length > 0 ? `cbp-file-input-file-${this.status[index]?.status}` : ''}
              >
                <div>
                  <div id={`${this.fieldId}-file-${index}`}>{name}</div>
                  {this.status.length > 0 && <div><hr /><div>{this.status[index]?.message}</div></div>}
                </div>
                
                <cbp-button
                  fill="ghost"
                  color="secondary"
                  value={`${index}`}
                  accessibilityText={ (this.files.length > 0 && this.multiple && !this.enhanced) ? 'Remove Files' : `Remove ${name}`}
                >
                  <cbp-icon name="times"></cbp-icon>
                </cbp-button>
              </div>
            )
          }
        </div>
      </Host>
    );
  }

}
