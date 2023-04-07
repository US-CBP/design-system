export default {
  title: 'Patterns/Segmented Button Group',
  argTypes: {},
};

const SingleSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="single">
      <button type="button" value="sm">Small</button>
      <button type="button" value="md">Medium</button>
      <button type="button" value="lg">Large</button>
    </div>
  `;
};

const MultiSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="multi">
      <button type="button" value="sauce">Sauce</button>
      <button type="button" value="cheese">Cheese</button>
      <button type="button" value="crust">Crust</button>
      <button type="button" value="toppings">Toppings</button>
    </div>
  `;
};

const IconSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="multi">
      <button type="button" value="bold" aria-label="bold"><i class="fas fa-bold"></i></button>
      <button type="button" value="italic" aria-label="italic"><i class="fas fa-italic"></i></button>
      <button type="button" value="underline" aria-label="underline"><i class="fas fa-underline"></i></button>
      <button type="button" value="ordered list" aria-label="ordered list"><i class="fas fa-list-ol"></i></button>
      <button type="button" value="list" aria-label="unordered list"><i class="fas fa-list"></i></button>
      <button type="button" value="superscript" aria-label="superscript"><i class="fas fa-superscript"></i></button>
      <button type="button" value="subscript" aria-label="subscript"><i class="fas fa-subscript"></i></button>
      <button type="button" value="eye dropper" aria-label="eye dropper"><i class="fas fa-eye-dropper"></i></button>
    </div>
  `;
};

const ReadonlySelectTemplate = (args) => {
  return `
    <div class="cbp-btn--segment read-only" data-segmented-button-type="single">
      <button disabled type="button" value="sm">Small</button>
      <button disabled type="button" value="md" aria-pressed="true">Medium</button>
      <button disabled type="button" value="lg">Large</button>
    </div>
  `;
};


export const SingleSelect = SingleSelectTemplate.bind({});
SingleSelect.args = {};

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.args = {};

export const IconSelect = IconSelectTemplate.bind({});
IconSelect.args = {};

export const ReadonlySelect = ReadonlySelectTemplate.bind({});
ReadonlySelect.args = {};