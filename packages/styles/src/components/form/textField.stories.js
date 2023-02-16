export default {
  title: 'Patterns/Form/Text Field Components'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="firstName" class="cbp-form__label">First Name</label>
      <span class="cbp-form__description">
        Required. <span id="char-count-2" data-char-counter="true">250</span>/250 Characters remaining.
      </span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <input type="text" class="cbp-form__input" name="firstName" id="firstName" maxlength="250" oninput="countChar('char-count-2', event)" placeholder="Enter first name">
    </div> 
  `
}

export const TextField = Template.bind({});
TextField.args = {};