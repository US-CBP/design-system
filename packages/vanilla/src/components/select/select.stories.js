export default {
  title: 'Patterns',
  parameters: {
    html: {
      root: '.cbp-form'
    }
  },
  argTypes: {
    label: {
      name: 'Label Element',
      description: 'Represents a caption for the `<select>` element in the user interface.',
      control: { type: 'text' }
    },
    inputDescription: {
      name: 'Input Description',
      description: 'Instructions or supplementary information regarding the `<select>` element.',
      control: { type: 'text' }
    },
    labelFor: {
      name: 'Label `for` Attribute',
      description: 'Indicates the form element that this `<label>` describes and has the value which is the `id` of the `<select>` element it relates to.',
      control: { type: 'text' }
    },
    formControlName: {
      name: 'Input `name` Attribute',
      description: 'Name of the form control in the input element. Submitted with the form as part of a name/value pair.',
      control: { type: 'text' }
    },
    placeholderOption: {
      name: 'Placeholder Option Text',
      description: 'Text of the placeholder option.',
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
    }
  },
  decorators: [
    (Story, context) => `
      <form class="cbp-form">
        <label for=${context.args.labelFor} class="cbp-input__label">${context.args.label}</label>
        <p class="cbp-input__description" ${!context.args.required ? '' : 'hidden'}>${context.args.inputDescription}</p>
        <p class="cbp-input__description ${context.args.required ? 'cbp-input__description--error': ''}" ${context.args.required ? '' : 'hidden'}><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </form>
    `
  ]
}

const Template = ({ labelFor, formControlName, placeholderOption, disabled, optionsObj: { option1, option2, option3, option4, option5} }) => (
  `
    <select class="cbp-input__select" name=${formControlName} id=${labelFor} ${disabled ? 'disabled' : ''}>
      <option value="" selected>${placeholderOption}</option>
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
  labelFor: 'port',
  inputDescription: 'Required.',
  formControlName: 'departurePort',
  placeholderOption: 'Choose Port',
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
  disabled: false
};