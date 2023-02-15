export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="password" class="cbp-form__label">Add Tags</label>
      <span class="cbp-form__description">Required.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This password does not match our records</span>
      <div class="cbp-field-group" id="demo-square-button-field">
        <input type="text" name="tag" id="tag" placeholder="Add Tag Keyword"></input>
        <button type="button" class="square">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="bacon-tags" style="display: flex;">
        <div class="cbp-chips" style="margin-right: 8px;">
          <span>Pepperoni</span>
          <div class="plus-border">
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div class="cbp-chips">
          <span>Mushroom</span>
          <div class="plus-border">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  `
}

export const ButtonTagTextField = Template.bind({});
ButtonTagTextField.args = {};