export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="password" class="cbp-form__label">Add Person to List</label>
      <span class="cbp-form__description">Required.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-field-group" id="demo-button-text-field">
        <input type="text" name="tag" id="tag" placeholder="Add Person"></input>
        <button type="button">
          Add Person
        </button>
      </div>
    </div>
  `
}

export const ButtonTextField = Template.bind({});
ButtonTextField.args = {};