export default {
  title: 'Patterns/Dropdown',
  argType: {},
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="pod2" class="cbp-form__label">Port(s) of Departure</label>
      <span class="cbp-form__description">
        Required.
      </span>
      <span class="cbp-form__description cbp-form__description--error" hidden><i
          class="fas fa-exclamation-triangle"></i>&nbsp;This field is required.</span>
      <div class="cbp-dropdown-wrapper" id="dropdown-demo-3">
        <button class="cbp-dropdown__custom" id="ports-dropdown" data-toggle="dropdown">
          <span class="cbp-dropdown__placeholder">Choose Ports</span>
        </button>
        <div class="cbp-dropdown" id="custom-dropdown-menu">
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="22" autocomplete="off">
            Port of Balitmore
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="82" autocomplete="off">
            Port of Newark
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="11" autocomplete="off">
            Port of Washington
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="667" autocomplete="off">
            Port of Zoolily
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="2" autocomplete="off">
            Port of Boston
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="65" autocomplete="off">
            Port of San Ysidro
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="87" autocomplete="off">
            Port of San Diego
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="998" autocomplete="off">
            Port of Rhode Island
          </label>
          <label class="cbp-dropdown__item cbp-dropdown__item--multiselect">
            <input type="checkbox" value="423" autocomplete="off">
            Port of Galveston
          </label>
        </div>
      </div>
    </div>
  `;
};

export const MultiSelectDropdown = Template.bind({});
MultiSelectDropdown.args = {};
