export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Number of Fish</label>
      <span class="cbp-form__description">Required.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-form__number cbp-form__number--counter" id="number-counter">
        <input type="number" name="numeric-counter" id="numeric-counter" placeholder="Enter Number of Fish"></input>
        <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary" id="decrement">
          <i class="fas fa-minus"></i>
        </button>
        <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary" id="increment">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  `
}

export const NumericCounterField = Template.bind({});
NumericCounterField.args = {};