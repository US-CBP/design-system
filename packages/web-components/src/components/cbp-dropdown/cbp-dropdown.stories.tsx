export default {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
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
    name: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    disabled: {
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
    label: 'Field Label',
    description: 'Field description.',
  },
};

function generateItems(buttons) {
  const html = buttons.map(({ label, value, selected }) => {
    return `<cbp-dropdown-item  value="${value}" ${selected == true ? 'selected' : ''}>${label}</cbp-dropdown-item>`;
  });
  return html.join('');
}

const SingleSelectDropdownTemplate = ({ label, description, fieldId, name, placeholder, error, readonly, disabled, value, context, sx, items }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
         ${generateItems(items)}
      </ul>
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const SingleSelectDropdown = SingleSelectDropdownTemplate.bind({});
SingleSelectDropdown.args = {
  value: '',
  fieldId: 'dropdown-id',
  items: [
    {
      label: 'Option 1',
      value: '1',
      selected: false,
    },
    {
      label: 'Option 2',
      value: '2',
      selected: false,
    },   
    {
      label: 'Option 3',
      value: '3',
      selected: false,
    },    
    {
      label: 'Option 4 has a longer label',
      value: '4',
      selected: false,
    },    
    {
      label: 'Option 5',
      value: '5',
      selected: false,
    },    
    {
      label: 'Option 6',
      value: '6',
      selected: false,
    },    
    {
      label: 'Option 7',
      value: '7',
      selected: false,
    },    
    {
      label: 'Option 8',
      value: '8',
      selected: false,
    },    
    {
      label: 'Option 9',
      value: '9',
      selected: false,
    },    
    {
      label: 'Option 10 has no value specified',
      value: undefined,
      selected: false,
    },
  ]
};





function generateMultiSelectItems(buttons, context) {
  const html = buttons.map(({ label, name, value, selected }) => {
    return `<cbp-dropdown-item  value="${value}" ${selected == true ? 'selected' : ''}>
              <cbp-checkbox 
                ${context && context != 'light-inverts' ? `context=${context}` : ''}
              >
                <input 
                  type="checkbox" 
                  name="${name}"
                  value="${value}"
                />
                ${label}
              </cbp-checkbox>
            </cbp-dropdown-item>
    `;
  });
  return html.join('');
}

const MultiSelectDropdownTemplate = ({ label, description, fieldId, name, error, readonly, disabled, value, context, sx, items }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
      <cbp-dropdown
        multiple
        ${name ? `name="${name}"` : ''}  
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
         ${generateMultiSelectItems(items, context)}
      </ul>
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const MultiSelectDropdown = MultiSelectDropdownTemplate.bind({});
MultiSelectDropdown.args = {
  value: '',
  fieldId: 'dropdown-id',
  items: [
    {
      label: 'Option 1',
      name: 'multiselect',
      value: '1',
      selected: false,
    },
    {
      label: 'Option 2',
      name: 'multiselect',
      value: '2',
      selected: false,
    },   
    {
      label: 'Option 3',
      name: 'multiselect',
      value: '3',
      selected: false,
    },    
    {
      label: 'Option 4 has a longer label',
      name: 'multiselect',
      value: '4',
      selected: false,
    },    
    {
      label: 'Option 5',
      name: 'multiselect',
      value: '5',
      selected: false,
    },    
    {
      label: 'Option 6',
      name: 'multiselect',
      value: '6',
      selected: false,
    },    
    {
      label: 'Option 7',
      name: 'multiselect',
      value: '7',
      selected: false,
    },    
    {
      label: 'Option 8',
      name: 'multiselect',
      value: '8',
      selected: false,
    },    
    {
      label: 'Option 9',
      name: 'multiselect',
      value: '9',
      selected: false,
    },    
    {
      label: 'Option 10 has no value specified',
      name: 'multiselect',
      value: undefined,
      selected: false,
    },
  ]
};