export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Your Weight</label>
      <span class="cbp-form__description">Required.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-form__number cbp-form__number--switch" id="demo-switch">
        <div>
          <input type="number" name="numeric-switch" id="numeric-switch" placeholder="Enter Weight"></input>
          <div class="cbp-form__unit">lbs</div>
        </div>
        <div class="cbp-btn--segment">
          <button class="active">LBS</button>
          <button>KG</button>
        </div>
      </div>
    </div>
  `
}

export const NumericSwitchField = Template.bind({});
NumericSwitchField.args = {};