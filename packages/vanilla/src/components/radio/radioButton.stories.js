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
    }
  },
  decorators: [
    (Story, context) => `
      <fieldset class="cbp-fieldset">
        <legend class="cbp-legend">${context.args.legend}</legend>
        <p class="cbp-input__description">${context.args.inputDescription}</p>
        <p class="cbp-input__description cbp-input__description--error" hidden><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </fieldset>
    `
  ]
};

const Template = ({ formControlName, radioBtnObj }) => (
  `
    <div class="cbp-radio-item cbp-margin-bottom-5x">
      <input type="radio" name=${formControlName} class="cbp-input__radio" id=${radioBtnObj.radio1.id} value=${radioBtnObj.radio1.value}>
      <label for=${radioBtnObj.radio1.id}>${radioBtnObj.radio1.label}</label>
    </div>
    <div class="cbp-radio-item cbp-margin-bottom-5x">
      <input type="radio" name=${formControlName} class="cbp-input__radio" id=${radioBtnObj.radio2.id} value=${radioBtnObj.radio1.value}>
      <label for=${radioBtnObj.radio2.id}>${radioBtnObj.radio2.label}</label>
    </div>
    <div class="cbp-radio-item">
      <input type="radio" name=${formControlName} class="cbp-input__radio" id=${radioBtnObj.radio3.id} value=${radioBtnObj.radio1.value}>
      <label for=${radioBtnObj.radio3.id}>${radioBtnObj.radio3.label}</label>
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