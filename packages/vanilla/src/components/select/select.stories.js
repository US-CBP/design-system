export default {
  title: 'Patterns',
  parameters: {
    html: {
      root: '.cbp-form'
    }
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Represents a caption for the `<select>` element in the user interface.',
      control: { type: 'text' }
    },
    inputDescription: {
      name: 'Description',
      description: 'Instructions or supplementary information regarding the `<select>` element.',
      control: { type: 'text' }
    },
    inputId: {
      name: 'Input ID',
      description: 'The `id` on the native `select` tag, required to link the `label` and `select` for accessibility purposes.',
      control: { type: 'text' }
    },
    formControlName: {
      name: 'Input Name',
      description: 'Name of the form control in the input element. Submitted with the form as part of a name/value pair.',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      description: 'A message in the input description that a problem has occurred.',
      control: { type: 'text' }
    },
    optionsObj: {
      name: 'Options Object',
      description: 'Sets the label of the `<option>` and the `value` attribute.',
      control: { type: 'object' }
    },
    disabled: {
      name: '`disabled` Attribute',
      description: 'Attribute that indicates that the user cannot interact with the control.',
      control: { type: 'boolean' }
    },
    required: {
      name: '`required` Attribute',
      description: 'Indicates that the user must specify a value for the input before submission.',
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story, context) => `
      <form class="cbp-form">
        <label for=${context.args.inputId} class="cbp-input__label">${context.args.label}</label>
        <p class="cbp-input__description" ${!context.args.required ? '' : 'hidden'}>${context.args.inputDescription}</p>
        <p class="cbp-input__description ${context.args.required ? 'cbp-input__description--error': ''}" ${context.args.required ? '' : 'hidden'}><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </form>
    `
  ]
}

const Template = ({ inputId, formControlName, disabled, required, optionsObj: { option1, option2, option3, option4, option5} }) => (
  `
    <select class="cbp-input__select" name=${formControlName} id=${inputId} ${disabled ? 'disabled' : ''} ${required ? 'required' : ''} ${required ? 'aria-required="true"' : ''}>
      <option value="">-- Select --</option>
      <option value=${option1.value}>${option1.label}</option>
      <option value=${option2.value}>${option2.label}</option>
      <option value=${option3.value}>${option3.label}</option>
      <option value=${option4.value}>${option4.label}</option>
      <option value=${option5.value}>${option5.label}</option>
    </select>
  `
)

export const Select = Template.bind({});
Select.args = {
  label: 'Port of Departure',
  inputId: 'port',
  inputDescription: 'Required.',
  formControlName: 'departurePort',
  errorMessage: 'This field is required.',
  optionsObj: {
    option1: {
      value: 'baltimore',
      label: 'Port of Baltimore'
    },
    option2: {
      value: 'boston',
      label: 'Port of Boston'
    },
    option3: {
      value: 'philadelphia',
      label: 'Port of Philadelphia'
    },
    option4: {
      value: 'washington',
      label: 'Port of Washington'
    },
    option5: {
      value: 'zoolily',
      label: 'Port of Zoolily'
    },
  },
  disabled: false,
  required: false
};