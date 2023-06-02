export default {
  title: 'Patterns/File Input',
  argTypes: {
    label: {
      name: 'Label',
      description: 'Represents a caption for the input element in the user interface.',
      control: { type: 'text' }
    },
    description: {
      name: 'Description',
      description: 'Instructions or supplementary information regarding the `input` element. Placed below the `label` element.',
      control: { type: 'text' }
    },
    inputName: {
      name: 'Input Name',
      description: 'The `name` attribute of the input element. Submitted with the form as part of a name/value pair.',
      control: { type: 'text' }
    },
    inputId: {
      name: 'Input ID',
      description: 'The `id` on the native `input` tag, required to link the `label` and `input` for accessibility purposes.',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      description: 'A message in the input description that a problem has occurred.',
      control: { type: 'text' }
    },
    accept: {
      name: 'Accepted File Types',
      description: 'A string, comprised of a comma-separated list of unique file type specifiers, which defines the file types the input should accept. This attribute acts as a browser hint and does not prevent other file types from being selected.',
      control: { type: 'text' }
    },
    /*
    multiple: {
      name: '`multiple` Attribute',
      description: 'When the `multiple` is present on the input element, the input accepts multiple files, which must be selected all at once.',
      control: 'boolean'
    },
    */
    disabled: {
      name: '`disabled` Attribute',
      description: 'When the `disabled` attribute is present on the input element, it makes the element not mutable, focusable or submitted with the form.',
      control: { type: 'boolean' }
    },
    required: {
      name: '`required` Attribute',
      description: 'Indicates that the user must specify a value for the input before submission.',
      control: { type: 'boolean' }
    },
    /*
    readonly: {
      name: '`readonly` Attribute',
      description: 'Makes the input element not mutable, meaning the user can not edit the control.',
      control: { type: 'boolean' }
    }
    */
  },
};

const FileInputTemplate = ({label, description, inputName, inputId, accept, multiple, disabled, required}) => {
  return `
    <div class="cbp-file-input ${disabled ? 'disabled' : ''}">
      <label for="${inputId}" class="cbp-input__label">
        ${label}
      </label>
      <div class="cbp-input__description cbp-form__label--error" hidden>
        <i class="fas fa-exclamation-triangle"></i>&nbsp;Upload Files
      </div>
      <div class="cbp-input__description">
        ${required ? 'Required.' : ''} ${description}
      </div>
      
      <div class="cbp-file-input__wrapper">
        <i class="fas fa-file-alt"></i>
        Drag & Drop File${multiple ? 's' : ''} Here or
        <button class="cbp-btn cbp-btn__secondary" tabindex="-1">
          <i class="fas fa-upload"></i>
          browse
        </button>
        <input type="file" 
          name="${inputName}"
          id="${inputId}"
          accept="${accept}"
          ${multiple ? 'multiple' : ''}
          ${required ? 'aria-required="true"' : ''}
          ${disabled ? 'disabled' : ''}>
      </div>
    </div>
  `;
};

export const FileInput = FileInputTemplate.bind({});
FileInput.args = {
  label: "Upload File",
  description: "Accepted files: .doc, .docx, .pdf, .jpg, .png, .gif. Max File size 10mb per file.",
  inputName: "file-input-demo",
  inputId: "file-input-demo"
};


/*
const UploadProgressTemplate = () => {
  return `
    <div class="cbp-file-input">
      <span>super_duper-fun_times_at_the_beach.jpg</span>
      <button><i class="fa fa-times" aria-hidden="true"></i></button>
      <progress value="70" max="100">70 %</progress>
    </div>
  `;
};

const UploadErrorTemplate = () => {
  return `
    <div class="cbp-file-input cbp-file-input--error">
      <div>
        <span>super_duper-fun_times_at_the_beach.jpg</span>
        <button><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
      <hr>
      <span>
        <i class="fas fa-exclamation-triangle"></i>File size exceeds the limit.
      </span>
    </div>
  `;
};

export const UploadProgress = UploadProgressTemplate.bind({});
UploadProgress.args = {};

export const UploadError = UploadErrorTemplate.bind({});
UploadError.args = {};
*/