export default {
  title: 'Patterns/Segmented Button Group',
  argTypes: {
    selection: {
      name: 'Selection',
      description: 'Choose whether a single or multiple selections are allowed.',
      control: 'radio',
      options: ['single', 'multi']
    },
  },
};


function generateButtons(buttons) {
  const html = buttons.map(({ label, value, selected, disabled}) => {
    return `<button type="button" class="cbp-btn" value="${value}" ${selected==true ? 'aria-pressed="true"' : ''} ${disabled==true ? 'disabled' : ''}>${label}</button>`
  })
  return html.join("")
};


const SingleSelectTemplate = ( {buttons, selection} ) => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="${selection}">
      ${generateButtons(buttons)}
    </div>
  `;
};

const MultiSelectTemplate = ({buttons, selection}) => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="${selection}">
      ${generateButtons(buttons)}
    </div>
  `;
};

const IconSelectTemplate = ({buttons, selection}) => {
  return `
    <div class="cbp-btn--segment" data-segmented-button-type="${selection}">
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
SingleSelect.argTypes = {
  buttons: {
    name: 'Buttons',
    description: 'Configure various aspects of the buttons within the segmented button group.',
    control: 'object'
  }
}
SingleSelect.args = {
  buttons: [
      {
        label: "Small",
        value: "sm",
        selected: false,
        disabled: false
      },
      {
        label: "Medium",
        value: "md",
        selected: false,
        disabled: false
      },
      {
        label: "Large",
        value: "lg",
        selected: false,
        disabled: false
      }
    ],
  selection: "single"
};

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.argTypes = {
  buttons: {
    name: 'Buttons',
    description: 'Configure various aspects of the buttons within the segmented button group.',
    control: 'object'
  }
}
MultiSelect.args = {
  buttons: [
    {
      label: "Sauce",
      value: "sauce",
      selected: false,
      disabled: false
    },
    {
      label: "Cheese",
      value: "cheese",
      selected: false,
      disabled: false
    },
    {
      label: "Crust",
      value: "crust",
      selected: false,
      disabled: false
    },
    {
      label: "Toppings",
      value: "toppings",
      selected: false,
      disabled: false
    },
  ],
  selection: "multi"
};

export const IconSelect = IconSelectTemplate.bind({});
IconSelect.args = {
  selection: "multi"
};
