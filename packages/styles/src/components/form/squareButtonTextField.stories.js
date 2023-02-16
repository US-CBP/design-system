export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="password" class="cbp-form__label">Add Tags</label>
      <span class="cbp-form__description">Required.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This password does not match our records</span>
      <div class="cbp-form__password">
        <input type="text" name="tag" id="tag" placeholder="Enter Tag Keyword"></input>
        <button type="button">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  `
}

export const SquareButtonTextField = Template.bind({});
SquareButtonTextField.args = {};