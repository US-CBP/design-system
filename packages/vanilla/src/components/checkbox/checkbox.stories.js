export default {
  title: 'Patterns/Checkbox',
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
    <fieldset class="cbp-form__control" id="check-wrapper">
      <div class="form-check">
        <input type="checkbox" name="checkbox1" class="cbp-form__checkbox">
        <label for="checkbox1">Bacon</label>
      </div>
      <div class="form-check">
        <input type="checkbox" name="checkbox2" class="cbp-form__checkbox">
        <label for="checkbox1">Pepperoni</label>
      </div>
      <div class="form-check">
        <input type="checkbox" name="checkbox3" class="cbp-form__checkbox">
        <label for="checkbox1">Sausage</label>
      </div>
    </fieldset>
  `
)

const IndeterminateCheckboxTemplate = () => {
  return `
    <fieldset class="cbp-form__control" id="indy-wrapper">
      <div class="form-check">
        <input type="checkbox" name="toppings" class="cbp-form__checkbox" id="all-toppings">
        <label for="all-toppings">All Toppings</label>
      </div>
      <div class="cbp-form__control--nested">
        <div class="form-check">
          <input type="checkbox" name="toppings" id="checkbox2" class="cbp-form__checkbox">
          <label for="checkbox2">Olives</label>
        </div>
        <div class="form-check">
          <input type="checkbox" name="toppings" id="checkbox3" class="cbp-form__checkbox">
          <label for="checkbox3">Pineapple</label>
        </div>
        <div class="form-check">
          <input type="checkbox" name="toppings" id="checkbox4" class="cbp-form__checkbox">
          <label for="checkbox4">Sardines</label>
        </div>
      </div>
    </fieldset>
  `
}

export const Checkbox = Template.bind({});
Checkbox.args = {};
Checkbox.storyName = 'Default';

export const IndeterminateCheckbox = IndeterminateCheckboxTemplate.bind({});
IndeterminateCheckbox.args = {};