import { Component, Element, Prop, State, Event, EventEmitter, Listen, Watch, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

/** 
 * @slot - The native `input type="file"` gets slotted in the default slot.
 */
@Component({
  tag: 'cbp-file-input',
  styleUrl: 'cbp-file-input.scss'
})
export class CbpFileInput {

  private formField: HTMLInputElement;

  @Element() host: HTMLElement;

  /** The `name` attribute of the input, which is passed as part of formData (as a key). */
  @Prop() name: string;

  /** Optionally specify the ID of the input here, which is used to generate related pattern node IDs and associate everything for accessibility. */
  @Prop({ mutable: true }) fieldId: string = createNamespaceKey('cbp-file-input');

  /** Specifies whether the file input accepts multiple files rather than a single file (may also be set directly on the slotted input). */
  @Prop() multiple: boolean;

  /** Specifies the files types accepted by the file input (may also be set directly on the slotted input). This property is merely a suggestion to the browser and any file type restrictions should still be enforced in form validation. */
  @Prop() accept: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  @State() files: any[] = [];


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;
  handleChange(e) {
    console.log(e, e.target.files);
    let files = [];
    // type fileList does not support forEach or array methods
    for(let i = 0; i < e.target.files.length; i++) {
      files = [...files, e.target.files[i]]
    }
    // Updating this state via an event handler will cause a re-render needed for showing the selected files
    this.files = files;
    console.log(this.files);

    this.valueChange.emit({
      host: this.host,
      nativeElement: this.formField,
      value: this.formField.value,
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

  @Listen('buttonClick')
  handleDelete() {
    // TechDebt: This logic will be forked and expanded for enhanced mode, which allows manipulating individual files.
    this.formField.value='';
    this.files=[];
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
      this.formField.addEventListener('change', (e) => this.handleChange(e));
    }
  }

  componentDidLoad() {
    // Set the input-specific attributes on load only if true.
    if (!!this.formField) {
      if (this.multiple) this.formField.setAttribute('multiple', '');
      if (this.accept) this.formField.setAttribute('accept', this.accept);
      if (this.name) this.formField.setAttribute('name', this.name);
    }
  }

  render() {
    let fileList = [];
    if (this.files.length > 0) {
      console.log('Files: ', this.files);
      this.files.forEach( (item) => {
        fileList = [
          ...fileList,
          <div>
            <span>{item.name}</span>
            <cbp-button
              fill="ghost"
              color="secondary"
              value={item.name}
            >
              <cbp-icon name="times"></cbp-icon>
            </cbp-button>
          </div>
        ]
      });
    }
    console.log('Rendering: ',this.files, {fileList});
    
    let msg = this.files.length > 0
      ? `Drag & Drop File${this.multiple ? 's' : ''} Here or Browse to Replace`
      : `Drag & Drop File${this.multiple ? 's' : ''} Here or Browse`;


    return (
      <Host>
        <div class="cbp-file-input-wrapper">
          <div class="cbp-file-input-visuals">
            <cbp-icon name="file-lines" size="2rem" color="var(--cbp-color-text-base)" />
            <div class="cbp-file-input-text">{msg}</div>
            <cbp-button fill="solid" color="secondary">
              <button slot="cbp-button-custom"
                type="button"
                tabindex="-1"
                aria-hidden="true"
              >
                <cbp-icon name="upload" sx='{"margin-right":"var(--cbp-space-1x)"}' />
                Browse
              </button>
            </cbp-button>

          </div>
          <slot />
        </div>
        { (this.files.length > 0) &&
          <div class="cbp-file-input-filelist">
            {fileList}
          </div>
        }
      </Host>
    );
  }

}
