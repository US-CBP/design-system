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

const DropdownTemplate = ({ label, description, fieldId, name, error, readonly, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}  
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${readonly ? `readonly` : ''}
        ${disabled ? `disabled` : ''}
      >
        <cbp-dropdown-item value="1">Option 1</cbp-dropdown-item>
        <cbp-dropdown-item value="2">Option 2</cbp-dropdown-item>
        <cbp-dropdown-item value="3">Option 3</cbp-dropdown-item>
        <cbp-dropdown-item value="4">Option 4 has a longer label</cbp-dropdown-item>
        <cbp-dropdown-item value="5">Option 5</cbp-dropdown-item>
        <cbp-dropdown-item value="6">Option 6</cbp-dropdown-item>
        <cbp-dropdown-item value="7" disabled>Option 7 is disabled</cbp-dropdown-item>
        <cbp-dropdown-item value="8">Option 8</cbp-dropdown-item>
        <cbp-dropdown-item value="9">Option 9</cbp-dropdown-item>
        <cbp-dropdown-item>Option 10 has no value specified</cbp-dropdown-item>
      </ul>
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const Dropdown = DropdownTemplate.bind({});
Dropdown.args = {
  value: '',
  fieldId: 'dropdown-id',
  items: [
    {
      label: 'Option 1',
      value: '1',
      disabled: false
    },
    {
      label: 'Option 2',
      value: '2',
      disabled: false
    },   
    {
      label: 'Option 3',
      value: '3',
      disabled: false
    },    
    {
      label: 'Option 4 has a longer label',
      value: '4',
      disabled: false
    },    
    {
      label: 'Option 5',
      value: '5',
      disabled: false
    },    
    {
      label: 'Option 6',
      value: '6',
      disabled: false
    },    
    {
      label: 'Option 7 is idisabled',
      value: '7',
      disabled: true
    },    
    {
      label: 'Option 8',
      value: '8',
      disabled: false
    },    
    {
      label: 'Option 9',
      value: '9',
      disabled: false
    },    
    {
      label: 'Option 10 has no value specified',
      value: undefined,
      disabled: false
    },
  ]
};

