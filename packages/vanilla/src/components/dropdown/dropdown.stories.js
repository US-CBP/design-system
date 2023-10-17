export default {
  title: 'Patterns/Dropdown',
  argType: {},
};

const Template = () => {
  return `
    <div class="cbp-input-pattern">
      <label for="pod2" class="cbp-input__label">Variant Selector</label>
      <div class="cbp-input__description cbp-form__description--error" hidden>
        <i class="fas fa-exclamation-triangle"></i> This field is required.
      </div>
      <div class="cbp-dropdown__wrapper" id="dropdown-demo-2">
        <button class="cbp-dropdown__custom" id="port-dropdown" data-toggle="dropdown">
          <span class="cbp-dropdown__placeholder">Choose Variant</span>
        </button>
        <div class="cbp-dropdown" id="custom-dropdown-menu">
          <a href="#" class="cbp-dropdown__item">Single Button Card</a>
          <a href="#" class="cbp-dropdown__item">Dual Button Card</a>
          <a href="#" class="cbp-dropdown__item">Three Button Card</a>
          <a href="#" class="cbp-dropdown__item">General Card</a>
          <a href="#" class="cbp-dropdown__item">Clickable Card</a>
          <a href="#" class="cbp-dropdown__item">Single Select Card (Radio)</a>
          <a href="#" class="cbp-dropdown__item">Multi-Select Card (Checkbox)</a>
          <a href="#" class="cbp-dropdown__item">Banner Card</a>
        </div>
      </div>
    </div>
  `;
};

export const SingleSelectDropdown = Template.bind({});
SingleSelectDropdown.args = {};
