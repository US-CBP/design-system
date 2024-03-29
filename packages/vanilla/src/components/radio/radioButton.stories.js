export default {
  title: 'Patterns',
  argTypes: {
    legend: {
      name: 'Legend Element',
      description: 'Represents a caption for the content of its parent `<fieldset>` element.',
      control: { type: 'text' }
    },
    inputDescription: {
      name: 'Input Description',
      description: 'Instructions or supplementary information regarding the input element. Placed below the `<fieldset>` element.',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      description: 'A message in the radio button description that a problem has occurred.',
      control: { type: 'text' }
    },
    formControlName: {
      name: '`name` Attribute',
      description: '`name` attributes of the radio buttons. **Only one radio button in a same-named group of radio buttons can be checked at a time.**'
    },
    radioBtnObj: {
      name: 'Radio Button Object',
      description: 'This object contains the attributes/values for the `<input type="checkbox">` elements in the story. This includes the `id`, `label` and `value` attributes. **Setting a value for the `id` key will set the value for the corresponding `<input type="radio">` `id` attribute and associated `<label>` `labelFor` attribute.**'
    },
    displayInline: {
      name: 'Display Inline',
      description: 'Displays the radio buttons and labels `inline`',
      control: { type: 'boolean' }
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable radio button. **In order to see a "checked" disabled radio button, toggle the Checked story control to `true`**',
      control: { type: 'boolean' }
    },
    checked: {
      name: 'Checked',
      description: 'Add the `checked` attribute to the radio button (first choice only)',
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story, context) => `
      <fieldset class="cbp-fieldset ${context.args.displayInline ? 'cbp-fieldset--inline' : ''}" ${context.args.disabled ? 'disabled' : ''}>
        <legend class="cbp-legend">${context.args.legend}</legend>
        <div class="cbp-input__description">${context.args.inputDescription}</div>
        <div class="cbp-input__description cbp-input__description--error" hidden><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</div>
        ${Story().outerHTML || Story()}
      </fieldset>
    `
  ]
};

const Template = ({ formControlName, radioBtnObj: { radio1, radio2, radio3 }, checked }) => (
  `
    <div class="cbp-radio-item">
      <input type="radio" name=${formControlName} class="cbp-input__radio" id=${radio1.id} value=${radio1.value} ${checked ? 'checked' : ''}>
      <label for=${radio1.id}>${radio1.label}</label>
    </div>
    <div class="cbp-radio-item">
      <input type="radio" name=${formControlName} class="cbp-input__radio" id=${radio2.id} value=${radio1.value}>
      <label for=${radio2.id}>${radio2.label}</label>
    </div>
    <div class="cbp-radio-item">
      <input type="radio" name=${formControlName} class="cbp-input__radio" id=${radio3.id} value=${radio1.value}>
      <label for=${radio3.id}>${radio3.label}</label>
    </div>
  `
)

export const RadioButton = Template.bind({});
RadioButton.args = {
  legend: 'Pizza Toppings',
  inputDescription: 'Required. Only one topping is allowed.',
  formControlName: 'pizza-topping',
  errorMessage: 'The field is required.',
  radioBtnObj: {
    radio1: {
      id: 'pepperoni',
      label: 'Pepperoni',
      value: 'pepperoni'
    },
    radio2: {
      id: 'sardines',
      label: 'Sardines',
      value: 'sardines'
    },
    radio3: {
      id: 'olives',
      label: 'Olives',
      value: 'sardines'
    }
  }
};