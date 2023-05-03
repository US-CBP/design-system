export default {
  title: 'Patterns/Text Inputs',
  parameters: {
    layout: 'centered',
    html: {
      root: '.cbp-form'
    }
  },
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
    labelFor: {
      name: 'Label `for` Attribute',
      description: 'When used on a <label> element it indicates the form element that this label describes and has the value which is the `id` of the form element it relates to.',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      description: 'A message in the input description that a problem has occurred.',
      control: { type: 'text' }
    },
    inputName: {
      name: 'Input `name` Attribute',
      description: 'Name of the form control in the input element. Submitted with the form as part of a name/value pair.',
      control: { type: 'text' }
    },
    disabled: {
      name: '`disabled` Attribute',
      description: 'When the `disabled` attribute is present, it makes the element not mutable, focusable or submitted with the form.',
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story, context) => `
      <form class="cbp-form">
        <label for=${context.args.labelFor} class="cbp-input__label">${context.args.label}</label>
        <p class="cbp-input__description">${context.args.inputDescription}</p>
        <p class="cbp-input__description cbp-input__description--error" hidden><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </form>
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

const TextfieldTemplate = ({ labelFor, inputType, inputName, disabled }) => `<input type=${inputType} class="cbp-input" name=${inputName} id=${labelFor} ${disabled ? 'disabled' : ''} placeholder="Enter first name."> `

// '\' Removes line break shown in Storybook HTML preview
const PasswordFieldTemplate = ({ inputName, labelFor, disabled }) => (
  `\
    <div class="cbp-input-group">
      <input class="cbp-input" type="password" name=${inputName} id=${labelFor} ${disabled ? 'disabled' : ''} placeholder="Enter password" />
      <button class="cbp-btn-square cbp-btn__secondary" type="button" aria-label="show password" ${disabled ? 'disabled' : ''}><i class="fas fa-eye-slash"></i></button>
    </div>  
  `
)

const NumericCounterFieldTemplate = ({ labelFor, inputName }) => (
  `\
    <div class="cbp-input__numeric-counter" id="number-counter">
      <input class="cbp-input" type="number" name=${inputName} id=${labelFor} placeholder="Enter Number of Fish"></input>
      <button class="cbp-btn-square cbp-btn__secondary" type="button" id="decrement" aria-label="decrement">
        <i class="fas fa-minus"></i>
      </button>
      <button class="cbp-btn-square cbp-btn__secondary" type="button" id="increment" aria-label="increment">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  `
)

const NumericSwitchTemplate = ({ labelFor, inputName }) => (
  `\
    <div class="cbp-input__numeric-switch">
      <div>
        <input class="cbp-input" type="number" name=${inputName} id=${labelFor} placeholder="Enter Weight"></input>
      </div>
      <div class="cbp-btn--segment">
        <button type="button" value="lbs">LBS</button>
        <button type="button" value="kg">KG</button>
      </div>
    </div>
  `
)

const TextfieldButtonGroupTemplate = ({ square, labelFor, inputType, tags, inputName, disabled }) => (
  `\
    <div class="cbp-input-group">
      <input class="cbp-input" type=${inputType} name=${inputName} id=${labelFor} ${disabled ? 'disabled' : ''} placeholder="Add Person" />
      <button class="${square ? 'cbp-btn-square' : 'cbp-btn'} cbp-btn__secondary" type="button" ${disabled ? 'disabled' : ''}>${square ? '<i class="fas fa-plus"></i>' : 'Add Person'}</button>
    </div>
    ${tags ? tagsExample() : ''}
  `
)

// TODO: Predictive search functionality
const SearchFieldTemplate = ({ labelFor, inputName }) => (
  `\
    <div class="cbp-input-group">
      <input class="cbp-input" type="search" name=${inputName} id=${labelFor} placeholder="Enter Search Criteria"></input>
      <button type="button" class="cbp-btn-square cbp-btn__secondary" aria-label="search">
        <i class="fas fa-search"></i>
      </button>
    </div>
  `
)

export const TextField = TextfieldTemplate.bind({});
TextField.args = {
  label: 'First Name',
  inputDescription: 'Required. 250/250 Characters remaining.',
  errorMessage: 'This field is required.',
  labelFor: 'firstName',
  inputType: 'text',
  inputName: 'firstName'
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
  labelFor: 'password',
  errorMessage: 'This password does not match our records.'
}

export const NumericCounterField = NumericCounterFieldTemplate.bind({});
NumericCounterField.args = {
  label: 'Number of Fish',
  inputDescription: 'Required. 1,000 fish maximum.',
  labelFor: 'numberOfFish',
  errorMessage: 'This field is required.'
};

export const NumericSwitchField = NumericSwitchTemplate.bind({});
NumericSwitchField.args = {
  label: 'Your Weight',
  inputDescription: 'Required.',
  labelFor: 'weight',
  errorMessage: 'This field is required.'
}

export const TextfieldButtonGroup = TextfieldButtonGroupTemplate.bind({});
TextfieldButtonGroup.args = {
  square: false,
  label: 'Add Tags',
  inputDescription: 'Required.',
  labelFor: 'tags',
  inputType: 'text',
  inputName: 'addPerson',
  errorMessage: 'This field is required.',
  tags: false
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
  }
}
TextfieldButtonGroup.storyName = 'Textfield w/ Button';

export const SearchField = SearchFieldTemplate.bind({});
SearchField.args = {
  label: 'Search',
  inputDescription: 'Required.',
  labelFor: 'search',
  errorMessage: 'This field is required.'
}