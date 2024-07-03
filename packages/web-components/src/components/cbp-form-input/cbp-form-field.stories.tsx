export default {
  title: 'Components/Form Field',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    description: {
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

const TextInputTemplate = ({ label, description, error, readonly, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <input type="text" name="textinput" ${value ? `value="${value}"` : ''}  ${readonly ? `readonly` : ''} ${disabled ? `disabled` : ''} />
    </cbp-form-field>
  `;
};

export const TextInput = TextInputTemplate.bind({});
TextInput.argTypes = {
  readonly: {
    control: 'boolean',
  },
}
TextInput.args = {
  value: '',
};


const SelectTemplate = ({ label, description, error, disabled, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <select name="select" ${disabled ? `disabled` : ''}>
        <option value=""></option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </cbp-form-field>
  `;
};

export const Select = SelectTemplate.bind({});
Select.args = {
  //label: 'Text Input Label',
};


const TextareaTemplate = ({ label, description, error, readonly, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <textarea name="textarea" ${readonly ? `readonly` : ''} ${disabled ? `disabled` : ''}>${value}</textarea>
    </cbp-form-field>
  `;
};

export const Textarea = TextareaTemplate.bind({});
Textarea.argTypes = {
  readonly: {
    control: 'boolean',
  },
}
Textarea.args = {
  value: '',
};
