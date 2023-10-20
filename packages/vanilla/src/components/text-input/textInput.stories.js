export default {
  title: 'Patterns/Text Inputs',
  argTypes: {
    label: {
      name: 'Label Element',
      description: 'Represents a caption for the input element in the user interface.',
      control: { type: 'text' }
    },
    inputDescription: {
      name: 'Input Description',
      description: 'Instructions or supplementary information regarding the input element. Placed below the <label> element.',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      description: 'A message in the input description that a problem has occurred.',
      control: { type: 'text' }
    },
    value: {
      name: 'Input `value` attribute',
      description: 'The value of the input, submitted with the form data as part of a name/value pair.',
      control: { type: 'text' }
    },
    inputName: {
      name: 'Input `name` Attribute',
      description: 'Name of the form control in the input element. Submitted with the form as part of a name/value pair.',
      control: { type: 'text' }
    },
    inputId: {
      name: 'Input `id` Attribute',
      description: 'The `input`\'s `id` used to associate the `label` and `input` tags, as well as generate related pattern `id`s for ARIA associations.',
      control: { type: 'text' }
    },
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
    readonly: {
      name: '`readonly` Attribute',
      description: 'Makes the input element not mutable, meaning the user can not edit the control.',
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story, context) => `
      <div class="cbp-input-pattern">
        <label for=${context.args.inputId} class="cbp-input__label">${context.args.label}</label>
        <div id=${context.args.inputId+'-description'} class="cbp-input__description" ${!context.args.required ? '' : 'hidden'}>
          ${context.args.inputDescription}
        </div>
        <div class="cbp-input__description ${context.args.required ? 'cbp-input__description--error': ''}" ${context.args.required ? '' : 'hidden'}>
          <i class="fas fa-exclamation-triangle"></i> ${context.args.errorMessage}
        </div>
        ${Story().outerHTML || Story()}
      </div>
    `
  ]
};

const tagsExample = () => `
  <div class="cbp-display-flex cbp-padding-top-2x">
    <button type="button" class="cbp-chip cbp-margin-right-2x" aria-pressed="false">
      <span class="cbp-chip__label">Pepperoni</span>
      <div class="cbp-chip__icon">
        <i class="fas fa-plus"></i>
      </div>
    </button>
    <button type="button" class="cbp-chip" aria-pressed="false">
      <span class="cbp-chip__label">Mushroom</span>
      <div class="cbp-chip__icon">
        <i class="fas fa-plus"></i>
      </div>
    </button>
  </div>
`

const TextfieldTemplate = ({ inputId, inputType, inputName, value, disabled, required, readonly }) => (
  `\
    <input
      type="${inputType}"
      value="${value}"
      class="cbp-input"
      name="${inputName}"
      id="${inputId}"

      ${disabled ? 'disabled' : ''}
      ${required ? 'required' : ''}
      ${readonly ? 'readonly' : ''}
      aria-describedby="${inputId+'-description'}"
    /> 
  `
) 

// '\' Removes line break shown in Storybook HTML preview
const PasswordFieldTemplate = ({ inputName, inputId, value, disabled, required, readonly }) => (
  `\
    <div class="cbp-input__wrapper">
      <input class="cbp-input" type="password" name="${inputName}" id="${inputId}" value="${value}" ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} aria-describedby="${inputId+'-description'}" />
      <span class="cbp-input__overlay-right">
        <button class="cbp-btn-square cbp-btn__secondary" type="button" ${disabled || readonly ? 'disabled' : ''} aria-controls=${inputId}><i class="fas fa-eye-slash"></i></button>
      </span>
    </div>  
  `
)

const NumericCounterFieldTemplate = ({ inputId, inputName, value, disabled, required, readonly }) => (
  `\
    <div class="cbp-input__numeric-counter" id="number-counter">
      <input class="cbp-input" type="number" value="${value}" name=${inputName} id=${inputId} ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} aria-describedby="${inputId+'-description'}" />
      <button class="cbp-btn-square cbp-btn__secondary" type="button" id="decrement" ${disabled || readonly ? 'disabled' : ''} aria-label="decrement" aria-controls=${inputId}>
        <i class="fas fa-minus"></i>
      </button>
      <button class="cbp-btn-square cbp-btn__secondary" type="button" id="increment" ${disabled || readonly ? 'disabled' : ''} aria-label="increment" aria-controls=${inputId}>
        <i class="fas fa-plus"></i>
      </button>
    </div>
  `
)

const NumericSwitchTemplate = ({ inputId, inputName, value, disabled, required, readonly }) => (
  `\
    <div class="cbp-input__numeric-switch">
      <div class="cbp-input__wrapper">
        <input class="cbp-input" type="number" name="${inputName}" id="${inputId}" value="${value}" ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} aria-describedby="${inputId+'-description'}" />
        <span class="cbp-input__overlay-right cbp-margin-right-4x" style="line-height:var(--cbp-space-9x)">lbs</span>
      </div>
      <div class="cbp-btn--segment" data-segmented-button-type="single">
        <button class="cbp-btn" type="button" value="lbs" ${disabled || readonly ? 'disabled' : ''} aria-controls=${inputId}>LBS</button>
        <button class="cbp-btn" type="button" value="kg" ${disabled || readonly ? 'disabled' : ''} aria-controls=${inputId}>KG</button>
      </div>
    </div>
  `
)

const TextfieldButtonGroupTemplate = ({ square, inputId, inputType, value, tags, inputName, disabled, buttonLabel, required, readonly }) => (
  `\
    <div class="cbp-input__wrapper">
      <input class="cbp-input" type="${inputType}" name="${inputName}" id="${inputId}" value="${value}" ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} aria-describedby="${inputId+'-description'}" />
      <span class="cbp-input__overlay-right">
        <button class="${square ? 'cbp-btn-square' : 'cbp-btn'} ${required ? 'cbp-btn__danger' : 'cbp-btn__secondary'}" type="button" ${disabled || readonly ? 'disabled' : ''} aria-controls=${inputId}>${square ? '<i class="fas fa-plus"></i>' : buttonLabel}</button>
      </span>
    </div>
    ${tags ? tagsExample() : ''}
  `
)

// TODO: Predictive search functionality
const SearchFieldTemplate = ({ inputId, inputName, value, disabled, required, readonly }) => (
  `\
    <div class="cbp-input__wrapper">
      <input class="cbp-input" type="search" name="${inputName}" id="${inputId}" value="${value}" ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${readonly ? 'readonly' : ''} aria-describedby="${inputId+'-description'}" />
      <span class="cbp-input__overlay-right">
        <button type="button" class="cbp-btn-square ${required ? 'cbp-btn__danger' : 'cbp-btn__secondary'}" ${disabled || readonly ? 'disabled' : ''} aria-label="search"  aria-controls=${inputId}>
          <i class="fas fa-search"></i>
        </button>
      </span>
    </div>
  `
)

export const TextField = TextfieldTemplate.bind({});
TextField.args = {
  label: 'First Name',
  inputDescription: 'Required. 250/250 Characters remaining.',
  errorMessage: 'This field is required.',
  inputId: 'firstName',
  inputType: 'text',
  inputName: 'firstName',
  value: '',
};
TextField.argTypes = {
  inputType: {
    name: 'Input `type` Attribute',
    description: 'Types listed here are the available options for text types, refer to documentation for all other types.',
    control: { type: 'select' },
    options: ['text', 'number', 'email', 'tel', 'url']
  }
}

export const PasswordField = PasswordFieldTemplate.bind({});
PasswordField.args = {
  label: 'Password',
  inputDescription: 'Required',
  inputId: 'password',
  inputName: 'password',
  errorMessage: 'This password does not match our records.',
  value: '',
}

export const NumericCounterField = NumericCounterFieldTemplate.bind({});
NumericCounterField.args = {
  label: 'Number of Fish',
  inputDescription: 'Required. 1,000 fish maximum.',
  inputId: 'numberOfFish',
  inputName: 'numberOfFish',
  errorMessage: 'This field is required.',
  value: '',
};

/*
export const NumericSwitchField = NumericSwitchTemplate.bind({});
NumericSwitchField.args = {
  label: 'Your Weight',
  inputDescription: 'Required.',
  inputId: 'weight',
  inputName: 'weight',
  errorMessage: 'This field is required.',
  value: '',
}
*/

export const TextfieldButtonGroup = TextfieldButtonGroupTemplate.bind({});
TextfieldButtonGroup.args = {
  square: false,
  label: 'Add Tags',
  inputDescription: 'Required.',
  inputId: 'tags',
  inputType: 'text',
  inputName: 'addPerson',
  value: '',
  errorMessage: 'This field is required.',
  buttonLabel: 'Add Person',
  chips: false
};
TextfieldButtonGroup.argTypes = {
  square: {
    name: 'Square Button?',
    description: 'Change button variant, square button variants do not have text and only display an icon.'
  },
  inputType: {
    name: 'Input Type',
    description: 'Types listed here are the available options for text types, refer to documentation for all other types.',
    control: { type: 'select' },
    options: ['text', 'number', 'email', 'tel', 'url']
  },
  buttonLabel: {
    name: 'Button Label',
    description: 'Text inside the button element. **_Not available with square button variant_**',
    control: { type: 'select' },
    options: ['text', 'number', 'email', 'tel', 'url']
  },
  tags: {
    name: 'Show Chips?',
    description: 'Displays Chips that can be part of the text input group.',
    control: { type: 'boolean' },
  }
}
TextfieldButtonGroup.storyName = 'Textfield w/ Button';

export const SearchField = SearchFieldTemplate.bind({});
SearchField.args = {
  label: 'Search',
  inputDescription: 'Required.',
  inputId: 'search',
  inputName: 'search',
  errorMessage: 'This field is required.',
  value: '',
}