export default {
  title: 'Components/Radio/RadioList',
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
    label: "Radio List Group Label",
    description: 'Field description.',
    radios: [
      {
        label: "Radio 1",
        name: "radio",
        value: "1",
        checked: false,
        disabled: false
      },
      {
        label: "Radio 2",
        name: "radio",
        value: "2",
        checked: false,
        disabled: false
      },
      {
        label: "Radio 3",
        name: "radio",
        value: "3",
        checked: false,
        disabled: false
      },
      {
        label: "Radio 4",
        name: "radio",
        value: "4",
        checked: false,
        disabled: false
      },
    ],
  },
};



function generateRadios(context, radios) {
  const html = radios.map(({ label, name, value, checked, disabled }) => {
    return `
      <cbp-radio
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
      >
        <input 
          type="radio" 
          name="${name}"
          value="${value}"
          ${checked ? `checked` : ''}
          ${disabled ? `disabled` : ''}
        />
        ${label}
      </cbp-radio>
    `;
  });
  return html.join('');
}

const RadioListTemplate = ({ radios, label, description, fieldId, disabled, error, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${generateRadios(context, radios)}
    </cbp-form-field>
    `;
};

export const RadioList = RadioListTemplate.bind({});




const RadioListHorizontalTemplate = ({ radios, label, description, fieldId, disabled, error, gap, breakpoint, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-flex
        ${gap ? `gap="${gap}"` : ''}
        ${breakpoint ? `breakpoint="${breakpoint}"` : ''}
        sx='{"width":"max-content"}'
      >
        ${generateRadios(context, radios)}
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

export const RadioListHorizontal = RadioListHorizontalTemplate.bind({});
RadioListHorizontal.args = {
  gap: 'var(--cbp-space-1x) var(--cbp-space-5x)',
  breakpoint: '28rem'
}



const RadioListMultiColumnTemplate = ({ radios, gap, columns, width, label, description, fieldId, disabled, error, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-multicol nobreak
        ${gap ? `gap="${gap}"` : ''}
        ${columns ? `columns="${columns}"` : ''}
        ${width ? `width="${width}"` : ''}
      >
        ${generateRadios(context, radios)}
      </cbp-multicol>
    </cbp-form-field>
    `;
};

export const RadioListMultiColumn = RadioListMultiColumnTemplate.bind({});
RadioListMultiColumn.args = {
  gap: 'var(--cbp-space-4x)',
  columns: '3',
  width: '6rem',
  radios: [
    {
      label: "Radio 1",
      name: "radio",
      value: "1",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 2",
      name: "radio",
      value: "2",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 3",
      name: "radio",
      value: "3",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 4",
      name: "radio",
      value: "4",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 5",
      name: "radio",
      value: "5",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 6",
      name: "radio",
      value: "6",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 7",
      name: "radio",
      value: "7",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 8",
      name: "radio",
      value: "8",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 9",
      name: "radio",
      value: "9",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 10",
      name: "radio",
      value: "10",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 11",
      name: "radio",
      value: "11",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 12",
      name: "radio",
      value: "12",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 13",
      name: "radio",
      value: "13",
      checked: false,
      disabled: false
    },
    {
      label: "Radio 14",
      name: "radio",
      value: "14",
      checked: false,
      disabled: false
    },
  ],
}
