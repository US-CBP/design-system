export default {
  title: 'Patterns/Form Controls'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Pizza Toppings</label>
      <span class="cbp-form__description">Required. Choose as many as you like.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-form__control" id="radio-wrapper">
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
      </div>
    </div>
  `
}

export const RadioButton = Template.bind({});
RadioButton.args = {};