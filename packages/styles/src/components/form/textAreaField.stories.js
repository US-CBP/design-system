export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="firstName" class="cbp-form__label">Description</label>
      <span class="cbp-form__description">Required. <span id="char-count">500</span>/500 Characters remaining.</span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;You must make a selection</span>
      <textarea class="cbp-form__textarea" name="description" id="description" cols="30" rows="10" maxlength="500" oninput="countChar('char-count', event)" placeholder="Enter a description"></textarea>
    </div>
  `
}

export const TextAreaField = Template.bind({});
TextAreaField.args = {};