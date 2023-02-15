export default {
  title: 'Patterns/Form Controls'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Pizza Toppings</label>
      <span class="cbp-form__description">Required. Choose as many as you like.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-form__control" id="check-wrapper">
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
      </div>
    </div>
  `
}

export const Checkbox = Template.bind({});
Checkbox.args = {};