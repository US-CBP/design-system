export default {
  title: 'Components/Form Fields',
  tags: ['beta'],
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
    error: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    context: {
      control: 'select',
      options: ['light-inverts', 'light-always', 'dark-inverts', 'dark-always'],
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

const RangeTemplate = ({ label, description, fieldId, error, readonly, disabled, value, context, sx }) => {
  return ` 
      <cbp-form-field
        ${label ? `label="${label}"` : ''}
        ${description ? `description="${description}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${error ? `error` : ''}
        ${disabled ? `disabled` : ''}
        ${readonly ? `readonly` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input 
          type="range" 
          name="range" 
          ${value ? `value="${value}"` : ''} 
        />
      </cbp-form-field>
    `;
};

export const Range = RangeTemplate.bind({});
Range.storyName = 'Range Slider (basic}';
Range.args = {
  value: '',
};
