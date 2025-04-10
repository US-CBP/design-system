export default {
  title: 'Components/Slider',
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




/* Datalist not supported since we're overriding the default appearance
const SliderWithDatalistTemplate = ({ label, description, fieldId, name, min, max, step, hideMinmax, hideInput, error, readonly, disabled, value, context, sx }) => {
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
        <cbp-slider
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
            list="values"
            ${name ? `name="${name}"` : ''}
          />
          <datalist id="values">
            <option value="0" label="0"></option>
            <option value="25" label="25"></option>
            <option value="50" label="50"></option>
            <option value="75" label="75"></option>
            <option value="100" label="100"></option>
          </datalist>
        </cbp-slider>
      </cbp-form-field>
    `;
};

export const SliderWithDatalist = SliderWithDatalistTemplate.bind({});
//Slider.storyName = 'Slider';
SliderWithDatalist.args = {
  name: 'range',
  value: '',
};
*/