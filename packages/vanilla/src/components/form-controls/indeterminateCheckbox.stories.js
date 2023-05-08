export default {
  title: 'Patterns/Form Controls'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Pizza Toppings</label>
      <span class="cbp-form__description">Required. Choose as many as you like.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-form__control" id="indy-wrapper">
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
      </div>
    </div>
  `
}

export const IndeterminateCheckbox = Template.bind({});
IndeterminateCheckbox.args = {};