export default {
  title: 'Patterns/Slider'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Price Range for Turnips</label>
      <div class="cbp-form__control cbp-form__control--range" id="demo-multi-thumb">
        <div class="cbp-form__number">
          <input type="number" name="lower-range" id="lower-range">
        </div>
        <span>0</span>
        <div class="range-wrapper">
          <input type="range" name="range-slider" id="range-slider" max="100" min="0" value="25">
          <input type="range" name="range-slider" id="range-slider" max="100" min="0" value="75">
        </div>
        <span>100</span>
        <div class="cbp-form__number">
          <input type="number" name="upper-range" id="upper-range" value="75">
        </div>
      </div>
    </div>
  `
}

export const RangeSlider = Template.bind({});
RangeSlider.args = {}