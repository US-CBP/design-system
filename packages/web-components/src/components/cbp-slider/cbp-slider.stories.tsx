export default {
  title: 'Components/Slider',
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
      control: 'text'
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    hideMinmax: {
      control: 'boolean',
    },
    hideInput: {
      control: 'boolean',
    },
    error: {
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


const SliderTemplate = ({ label, description, fieldId, name, min, max, step, hideMinmax, hideInput, error, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${error ? `error` : ''}
      ${disabled ? `disabled` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-slider
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${value != undefined ? `value="${value}"` : ''}
        ${min != undefined ? `min="${min}"` : ''}
        ${max ? `max="${max}"` : ''}
        ${step ? `step="${step}"` : ''}
        ${hideMinmax ? `hide-minmax` : ''}
        ${hideInput ? `hide-input` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input 
          type="range" 
          ${name ? `name="${name}"` : ''}
        />
      </cbp-slider>
    </cbp-form-field>
  `;
};

export const Slider = SliderTemplate.bind({});
Slider.args = {
  name: 'range',
  value: '',
};
