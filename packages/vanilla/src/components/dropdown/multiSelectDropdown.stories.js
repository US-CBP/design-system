export default {
  title: 'Patterns/Dropdown',
  argType: {},
};

const Template = () => {
  return `
    <div class="cbp-input-pattern">
      <label for="pod2" class="cbp-input__label">Port(s) of Departure</label>
      <div class="cbp-input__description">
        Required.
      </div>
      <div class="cbp-form__description cbp-form__description--error" hidden>
        <i class="fas fa-exclamation-triangle"></i> This field is required.
      </div>
      
      <div class="cbp-dropdown__wrapper" id="dropdown-demo-3">
        <button class="cbp-dropdown__custom" id="ports-dropdown" data-toggle="dropdown">
          <span class="cbp-dropdown__placeholder">Choose Ports</span>
        </button>

        <div class="cbp-dropdown" id="custom-dropdown-menu">
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="22">
            Port of Baltimore
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="82">
            Port of Newark
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="11">
            Port of Washington
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="667">
            Port of Zoolily
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="2">
            Port of Boston
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="65" autocomplete="off">
            Port of San Ysidro
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo"name="demo" value="87">
            Port of San Diego
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="998">
            Port of Rhode Island
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" name="demo" value="423">
            Port of Galveston
          </label>
        </div>
      </div>
    </div>
  `;
};

export const MultiSelectDropdown = Template.bind({});
MultiSelectDropdown.args = {};
