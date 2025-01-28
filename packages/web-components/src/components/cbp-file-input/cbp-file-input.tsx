import { Component, Element, Prop, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
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

  /** Optionally set the `value` attribute of the input at the component level. */
  //@Prop() value: string;

  /** Optionally specify the ID of the input here, which is used to generate related pattern node IDs and associate everything for accessibility */
  @Prop({ mutable: true }) fieldId: string = createNamespaceKey('cbp-checkbox');

  /** Specifies whether the file input accepts multiple files rather than a single file. */
  @Prop() multiple: boolean;

  /** Marks the checkbox as checked by default when specified. */
  @Prop() readonly: boolean;

  /** Marks the checkbox in a disabled state when specified. */
  @Prop() disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() valueChange: EventEmitter;
  handleChange(e) {
    console.log(e);
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

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });

    // query the DOM for the slotted form field and wire it up for accessibility and attach an event listener to it
    this.formField = this.host.querySelector('input[type=file]');
    if (this.formField) {
      const Id = this.formField.getAttribute('id');
      Id ? this.fieldId = Id : this.formField.setAttribute('id', this.fieldId);
      this.formField.addEventListener('change', (e) => this.handleChange(e));
    }
  }

  componentDidLoad() {
    // Set the disabled/multiple on load only if true. (The Watch decorators only listen for changes, not initial state)
    if (!!this.formField) {
      if (this.multiple) this.formField.multiple=this.multiple;
      if (this.readonly) this.formField.setAttribute('readonly', ''); // Is this applicable?
      if (this.disabled) this.formField.setAttribute('disabled', '');
      if (this.name) this.formField.name=this.name;
      //if (this.value) this.formField.value=this.value;
    }
  }

  render() {
    return (
      <Host>
        <div class="cbp-file-input-wrapper">
          <div class="cbp-file-input-visuals">
            <cbp-icon name="file-lines" size="2rem" color="var(--cbp-color-text-base)" />
            <div class="cbp-file-input-text">Drag & Drop Files Here or Browse</div>
            <cbp-button fill="solid" color="secondary">
              <cbp-icon name="upload" sx='{"margin-right":"var(--cbp-space-1x)"}' />
              Browse
            </cbp-button>

          </div>
          <slot />
        </div>
      </Host>
    );
  }

}
