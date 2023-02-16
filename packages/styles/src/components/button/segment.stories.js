export default {
  title: 'Patterns/Button',
  argType: {
    className: { control: 'text' },
  },
};

const SingleSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segment-button="single">
      <button>Small</button>
      <button>Medium</button>
      <button>Large</button>
    </div>
  `;
};

const MultiSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segment-button="multi">
      <button>Sauce</button>
      <button>Cheese</button>
      <button>Crust</button>
      <button>Toppings</button>
    </div>
  `;
};

const IconSelectTemplate = () => {
  return `
    <div class="cbp-btn--segment" data-segment-button="multi">
      <button><i class="fas fa-bold"></i></button>
      <button><i class="fas fa-italic"></i></button>
      <button><i class="fas fa-underline"></i></button>
      <button><i class="fas fa-list-ol"></i></button>
      <button><i class="fas fa-list"></i></button>
      <button><i class="fas fa-superscript"></i></button>
      <button><i class="fas fa-subscript"></i></button>
      <button><i class="fas fa-eye-dropper"></i></button>
    </div>
  `;
};

export const SingleSelect = SingleSelectTemplate.bind({});
SingleSelect.args = {};

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.args = {};

export const IconSelect = IconSelectTemplate.bind({});
IconSelect.args = {};
