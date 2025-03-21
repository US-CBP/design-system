export default {
  title: 'Components/Checkbox/Checklist',
  //tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    fieldId: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    context : {
      control: 'select',
      options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    label: "Checklist Group Label",
    description: 'Field description.',
    checkboxes: [
      {
        label: "Checkbox 1",
        name: "checkbox",
        value: "1",
        checked: false,
        disabled: false
      },
      {
        label: "Checkbox 2",
        name: "checkbox",
        value: "2",
        checked: false,
        disabled: false
      },
      {
        label: "Checkbox 3",
        name: "checkbox",
        value: "3",
        checked: false,
        disabled: false
      },
      {
        label: "Checkbox 4",
        name: "checkbox",
        value: "4",
        checked: false,
        disabled: false
      },
    ],
  },
};



function generateCheckboxes(context, checkboxes) {
  const html = checkboxes.map(({ label, name, value, checked, disabled }) => {
    return `
    <cbp-checkbox
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
      <input 
        type="checkbox" 
        name="${name}"
        value="${value}"
        ${checked ? `checked` : ''}
        ${disabled ? `disabled` : ''}
      />
      ${label}
    </cbp-checkbox>`;
  });
  return html.join('');
}

const ChecklistTemplate = ({ checkboxes, label, description, fieldId, disabled, error, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${generateCheckboxes(context, checkboxes)}
    </cbp-form-field>
    `;
};

export const Checklist = ChecklistTemplate.bind({});




const ChecklistHorizontalTemplate = ({ checkboxes, label, description, fieldId, disabled, error, gap, breakpoint, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-flex
        ${gap ? `gap="${gap}"` : ''}
        ${breakpoint ? `breakpoint="${breakpoint}"` : ''}
        sx='{"width":"max-content"}'
      >
        ${generateCheckboxes(context, checkboxes)}
      </cbp-flex>
    </cbp-form-field>
    `;
};

/*
      <cbp-resize-observer>
        <cbp-flex gap="var(--cbp-space-5x)" breakpoint="31rem" sx='{"width":"max-content"}'>
          ${generateCheckboxes(context, checkboxes)}
        </cbp-flex>
      </cbp-resize-observer>
    </cbp-form-field>
*/

export const ChecklistHorizontal = ChecklistHorizontalTemplate.bind({});
ChecklistHorizontal.args = {
  gap: 'var(--cbp-space-5x)',
  breakpoint: '35rem'
}



const ChecklistMultiColumnTemplate = ({ checkboxes, gap, columns, width, label, description, fieldId, disabled, error, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-multicol nobreak
        ${gap ? `gap="${gap}"` : ''}
        ${columns ? `columns="${columns}"` : ''}
        ${width ? `width="${width}"` : ''}
      >
        ${generateCheckboxes(context, checkboxes)}
      </cbp-multicol>
    </cbp-form-field>
    `;
};

export const ChecklistMultiColumn = ChecklistMultiColumnTemplate.bind({});
ChecklistMultiColumn.args = {
  gap: 'var(--cbp-space-4x)',
  columns: '3',
  width: '10rem',
  checkboxes: [
    {
      label: "Checkbox 1",
      name: "checkbox",
      value: "1",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 2",
      name: "checkbox",
      value: "2",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 3",
      name: "checkbox",
      value: "3",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 4",
      name: "checkbox",
      value: "4",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 5",
      name: "checkbox",
      value: "5",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 6",
      name: "checkbox",
      value: "6",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 7",
      name: "checkbox",
      value: "7",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 8",
      name: "checkbox",
      value: "8",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 9",
      name: "checkbox",
      value: "9",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 10",
      name: "checkbox",
      value: "10",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 11",
      name: "checkbox",
      value: "11",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 12",
      name: "checkbox",
      value: "12",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 13",
      name: "checkbox",
      value: "13",
      checked: false,
      disabled: false
    },
    {
      label: "Checkbox 14",
      name: "checkbox",
      value: "14",
      checked: false,
      disabled: false
    },
  ],
}
