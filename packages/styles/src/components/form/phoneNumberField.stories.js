export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Number of Fish</label>
      <span class="cbp-form__description">Required.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-form__number">
        <input type="number" name="numeric" id="numeric" placeholder="Enter Number of Fish"></input>
      </div>
    </div>
  `
}

export const NumericField = Template.bind({});
NumericField.args = {};