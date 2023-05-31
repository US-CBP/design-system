export default {
  title: 'Patterns',
  parameters: {
    html: {
      root: '.cbp-form'
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

const Template = ({ labelFor, formControlName, placeholderOption, optionsObj: { option1, option2, option3, option4, option5} }) => (
  `
    <select name=${formControlName} id=${labelFor}>
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
  required: false,
};