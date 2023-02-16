export default {
  title: 'Patterns/Form Controls'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="number" class="cbp-form__label">Volume</label>
      <div class="cbp-form__control cbp-form__control--range" id="demo-slider">
        <i class="fas fa-volume-down"></i>
        <input type="range" name="volume" id="volume" max="100" min="0" value="88" data-slider="continuous">
        <i class="fas fa-volume-up"></i>
      </div>
    </div>
  `
}

export const ContinuousSlider = Template.bind({});
ContinuousSlider.args = {}