export default {
  title: 'Patterns/Form Controls'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">How many turnips you want?</label>
      <div class="cbp-form__control cbp-form__control--value" id="demo-value-slider">
        <span>0</span>
        <input type="range" name="value-slider" id="value-slider" max="100" min="0" value="15" step="1"  data-slider="value">
        <span>100</span>
        <div class="cbp-form__number">
          <input type="number" class="value-slider" name="value-slider-input" id="value-slider-input" value="15" autocomplete="off">
        </div>
      </div>
    </div>
  `
}

export const ValueSlider = Template.bind({});
ValueSlider.args = {}