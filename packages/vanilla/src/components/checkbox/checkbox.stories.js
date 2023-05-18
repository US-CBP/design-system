export default {
  title: 'Patterns/Checkbox',
  argTypes: {
    legend: {
      name: 'Legend Element',
      description: 'Represents a caption for the content of its parent `<fieldset>`.',
      control: { type: 'text' }
    },
    inputDescription: {
      name: 'Input Description',
      description: 'Instructions or supplementary information regarding the inputs in the `<fieldset>`. Placed below the `<legend>` element.',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      description: 'A message in the checkbox description that a problem has occurred.',
      control: { type: 'text' }
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable checkbox. **In order to see a "checked" disabled checkbox, toggle the Checked story control to `true`**',
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story, context) => `
      <fieldset class="cbp-fieldset ${context.args.displayInline ? 'cbp-fieldset--inline' : ''}" ${context.args.disabled ? 'disabled' : ''}>
        <legend class="cbp-legend">${context.args.legend}</legend>
        <p class="cbp-input__description">${context.args.inputDescription}</p>
        <p class="cbp-input__description cbp-input__description--error" hidden><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </fieldset>
    `
  ]
};

const CheckboxTemplate = ({ formControlName, checkboxObj: { checkbox1 }, checked }) => (
  `
    <div class="cbp-checkbox-item">
      <input type="checkbox" name=${formControlName} class="cbp-input__checkbox" id=${checkbox1.id} value=${checkbox1.value} ${checked ? 'checked' : ''}>
      <label for=${checkbox1.id}>${checkbox1.label}</label>
    </div>
  `
)

const CheckListTemplate = ({ formControlName, checkboxObj: { checkbox1, checkbox2, checkbox3 }, checked }) => (
  `
    <div class="cbp-checkbox-item">
      <input type="checkbox" name=${formControlName} class="cbp-input__checkbox" id=${checkbox1.id} value=${checkbox1.value} ${checked ? 'checked' : ''}>
      <label for=${checkbox1.id}>${checkbox1.label}</label>
    </div>
    <div class="cbp-checkbox-item">
      <input type="checkbox" name=${formControlName} class="cbp-input__checkbox" id=${checkbox2.id} value=${checkbox2.value}>
      <label for=${checkbox2.id}>${checkbox2.label}</label>
    </div>
    <div class="cbp-checkbox-item">
      <input type="checkbox" name=${formControlName} class="cbp-input__checkbox" id=${checkbox3.id} value=${checkbox3.value}>
      <label for=${checkbox3.id}>${checkbox3.label}</label>
    </div>
  `
)

const IndeterminateCheckboxTemplate = ({ indeterminateCheckboxObj, nestedCheckboxObj: { name: nestCheckboxName, checkbox1, checkbox2, checkbox3 }, checked }) => {
  return `
    <div class="cbp-checkbox-item">
      <input type="checkbox" name=${indeterminateCheckboxObj.name} class="cbp-input__checkbox" id=${indeterminateCheckboxObj.id} value=${indeterminateCheckboxObj.value} data-checkbox="indeterminate">
      <label for=${indeterminateCheckboxObj.id}>${indeterminateCheckboxObj.label}</label>
    </div>
    <div class="cbp-checkbox--nested">
      <div class="cbp-checkbox-item">
        <input type="checkbox" name=${nestCheckboxName} id=${checkbox1.id} class="cbp-input__checkbox" value=${checkbox1.value}  ${checked ? 'checked' : ''}>
        <label for=${checkbox1.id}>${checkbox1.label}</label>
      </div>
      <div class="cbp-checkbox-item">
        <input type="checkbox" name=${nestCheckboxName} id=${checkbox2.id} class="cbp-input__checkbox" value=${checkbox2.value}>
        <label for=${checkbox2.id}>${checkbox2.label}</label>
      </div>
      <div class="cbp-checkbox-item">
        <input type="checkbox" name=${nestCheckboxName} id=${checkbox3.id} class="cbp-input__checkbox" value=${checkbox3.value}>
        <label for=${checkbox3.id}>${checkbox3.label}</label>
      </div>
    </div>
  `
}

export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {
  legend: 'Terms of Service',
  inputDescription: 'Required.',
  formControlName: 'tos',
  errorMessage: 'This field is required',
  checkboxObj: {
    checkbox1: {
      id: 'tos',
      label: 'I accept the terms and conditions.',
      value: 'tos'
    }
  }
};
Checkbox.argTypes = {
  formControlName: {
    name: '`name` Attribute',
    description: 'The `name` attribute of the checkboxes.',
    control: { type: 'text' }
  },
  checkboxObj: {
    name: 'Checkbox Object',
    description: 'This object contains the attributes/values for the `<input type="checkbox">` elements in the story. This includes the `id`, `label` and `value` attributes. **Setting a value for the `id` key will set the value for the corresponding `<input type="checkbox">` `id` attribute and associated `<label>` `labelFor` attribute.**',
    control: { type: 'object' }
  },
  checked: {
    name: 'Checked',
    description: 'Add the `checked` attribute to the checkbox (first choice only)',
    control: { type: 'boolean' }
  }
}

export const CheckList = CheckListTemplate.bind({});
CheckList.args = {
  legend: 'Pizza Toppings',
  inputDescription: 'Required. Choose as many as you like.',
  formControlName: 'toppings',
  errorMessage: 'This field is required',
  checkboxObj: {
    checkbox1: {
      id: 'bacon',
      label: 'Bacon',
      value: 'bacon'
    },
    checkbox2: {
      id: 'pepperoni',
      label: 'Pepperoni',
      value: 'pepperoni'
    }, 
    checkbox3: {
      id: 'sausage',
      label: 'Sausage',
      value: 'sausage'
    }
  }
};
CheckList.argTypes = {
  formControlName: {
    name: '`name` Attribute',
    description: 'The `name` attribute of the checkboxes.',
    control: { type: 'text' }
  },
  checkboxObj: {
    name: 'Checkbox Object',
    description: 'This object contains the attributes/values for the `<input type="checkbox">` elements in the story. This includes the `id`, `label` and `value` attributes. **Setting a value for the `id` key will set the value for the corresponding `<input type="checkbox">` `id` attribute and associated `<label>` `labelFor` attribute.**',
    control: { type: 'object' }
  },
  checked: {
    name: 'Checked',
    description: 'Add the `checked` attribute to the checkbox (first choice only)',
    control: { type: 'boolean' }
  },
  displayInline: {
    name: 'Display Inline',
    description: 'Displays the checkboxes and labels `inline`',
    control: { type: 'boolean' }
  }
}
CheckList.storyName = 'Check List';

export const IndeterminateCheckbox = IndeterminateCheckboxTemplate.bind({});
IndeterminateCheckbox.args = {
  legend: 'Pizza Toppings',
  inputDescription: 'Required. Choose as many as you like.',
  indeterminateCheckboxObj: {
    name: 'all-toppings',
    label: 'All Toppings',
    id: 'all-toppings',
    value: 'all-toppings'
  },
  nestedCheckboxObj: {
    name: 'toppings',
    checkbox1: {
      label: 'Olives',
      id: 'olives',
      value: 'olives',
    },
    checkbox2: {
      label: 'Pineapple',
      id: 'pineapple',
      value: 'pineapple',
    },
    checkbox3: {
      label: 'Sardines',
      id: 'sardines',
      value: 'sardines',
    }
  }
};
IndeterminateCheckbox.argTypes = {
  indeterminateCheckboxObj: {
    name: 'Indeterminate Checkbox Object',
    description: 'This object contains the attributes/values for the **_top-level_** indeterminate `<input type="checkbox">` element in the story. This includes the`name`, `id`, `label` and `value` attributes. **Setting a value for the `id` key will set the value for the corresponding `<input type="checkbox">` `id` attribute and associated `<label>` `labelFor` attribute.**',
    control: { type: 'object' }
  },
  nestedCheckboxObj: {
    name: 'Nested Checkbox Object',
    description: 'This object contains the attributes/values for the **_nested-level_** indeterminate `<input type="checkbox">` elements in the story. **Setting a value for the `id` key will set the value for the corresponding `<input type="checkbox">` `id` attribute and associated `<label>` `labelFor` attribute.**',
    control: { type: 'object' }
  },
}