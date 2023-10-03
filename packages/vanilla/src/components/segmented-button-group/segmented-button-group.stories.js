export default {
  title: 'Patterns/Segmented Button Group',
  argTypes: {},
};

const SingleSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="single">
      <button class="cbp-btn" type="button" value="sm">Small</button>
      <button class="cbp-btn" type="button" value="md">Medium</button>
      <button class="cbp-btn" type="button" value="lg">Large</button>
    </div>
  `;
};

const MultiSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="multi">
      <button class="cbp-btn" type="button" value="sauce">Sauce</button>
      <button class="cbp-btn" type="button" value="cheese">Cheese</button>
      <button class="cbp-btn" type="button" value="crust">Crust</button>
      <button class="cbp-btn" type="button" value="toppings">Toppings</button>
    </div>
  `;
};

const IconSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="multi">
      <button class="cbp-btn-square" type="button" value="bold" aria-label="bold"><i class="fas fa-bold"></i></button>
      <button class="cbp-btn-square" type="button" value="italic" aria-label="italic"><i class="fas fa-italic"></i></button>
      <button class="cbp-btn-square" type="button" value="underline" aria-label="underline"><i class="fas fa-underline"></i></button>
      <button class="cbp-btn-square" type="button" value="ordered list" aria-label="ordered list"><i class="fas fa-list-ol"></i></button>
      <button class="cbp-btn-square" type="button" value="list" aria-label="unordered list"><i class="fas fa-list"></i></button>
      <button class="cbp-btn-square" type="button" value="superscript" aria-label="superscript"><i class="fas fa-superscript"></i></button>
      <button class="cbp-btn-square" type="button" value="subscript" aria-label="subscript"><i class="fas fa-subscript"></i></button>
      <button class="cbp-btn-square" type="button" value="eye dropper" aria-label="eye dropper"><i class="fas fa-eye-dropper"></i></button>
    </div>
  `;
};

export const SingleSelect = SingleSelectTemplate.bind({});
SingleSelect.args = {};

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.args = {};

export const IconSelect = IconSelectTemplate.bind({});
IconSelect.args = {};