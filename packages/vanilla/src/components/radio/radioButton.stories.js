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
};

const Template = () => (
  `
    <fieldset class="cbp-form__control" id="radio-wrapper">
      <div class="form-radio">
        <input type="radio" name="pizza-radio" class="cbp-form__radio" id="pepperoni">
        <label for="pepperoni">Pepperoni</label>
      </div>
      <div class="form-radio">
        <input type="radio" name="pizza-radio" class="cbp-form__radio" id="sardines">
        <label for="sardines">Sardines</label>
      </div>
      <div class="form-radio">
        <input type="radio" name="pizza-radio" class="cbp-form__radio" id="olives">
        <label for="olives">Olives</label>
      </div>
    </fieldset>
  `
)

export const RadioButton = Template.bind({});
RadioButton.args = {};