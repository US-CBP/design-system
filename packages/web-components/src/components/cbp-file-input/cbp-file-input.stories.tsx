export default {
  title: 'Components/File Input',
  tags: ['new'],
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
    multiple: {
      control: 'boolean',
    },
    accept: {
      control: 'text',
    },
    error: {
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


const FileInputTemplate = ({ label, description, fieldId, name, multiple, accept, error, disabled, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
      <cbp-file-input
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${multiple ? 'multiple' : ''}
        ${accept ? `accept="${accept}"` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input type="file" />
      </cbp-file-input>
    </cbp-form-field>
  `;
};

export const FileInput = FileInputTemplate.bind({});

