export default {
  title: 'Forms/Slider',
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
    value: {
      control: 'text',
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
    gap: {
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
    label: 'Insert Field Label',
    description: 'Insert field description.',
  },
};


const SliderTemplate = ({ label, description, fieldId, name, min, max, step, hideMinmax, hideInput, error, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${error ? 'error' : ''}
      ${disabled ? 'disabled' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-slider
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${value != undefined ? `value="${value}"` : ''}
        ${min != undefined ? `min="${min}"` : ''}
        ${max ? `max="${max}"` : ''}
        ${step ? `step="${step}"` : ''}
        ${hideMinmax ? 'hide-minmax' : ''}
        ${hideInput ? 'hide-input' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <input 
          type="range" 
          ${name ? `name="${name}"` : ''}
        />
      </cbp-slider>
    </cbp-form-field>
  `;
};

export const Slider: any = SliderTemplate.bind({});
Slider.args = {
  name: 'range',
};



const VolumeSliderTemplate = ({ label, description, fieldId, name, min, max, step, hideMinmax, hideInput, error, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${error ? 'error' : ''}
      ${disabled ? 'disabled' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-slider
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${value != undefined ? `value="${value}"` : ''}
        ${min != undefined ? `min="${min}"` : ''}
        ${max ? `max="${max}"` : ''}
        ${step ? `step="${step}"` : ''}
        ${hideMinmax ? 'hide-minmax' : ''}
        ${hideInput ? 'hide-input' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <cbp-icon name="volume-down" size="var(--cbp-font-size-body)" slot="cpb-slider-before"></cbp-icon>

        <input 
          type="range" 
          ${name ? `name="${name}"` : ''}
        />

        <cbp-icon name="volume" size="var(--cbp-font-size-body)" slot="cpb-slider-after"></cbp-icon>

      </cbp-slider>
    </cbp-form-field>
  `;
};

export const VolumeSlider: any = VolumeSliderTemplate.bind({});
VolumeSlider.args = {
  name: 'range',
  hideMinmax: true,
  hideInput: true
};



const RangeSliderTemplate = ({ label, description, fieldId, name, min, max, step, gap, hideMinmax, hideInput, error, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${error ? 'error' : ''}
      ${disabled ? 'disabled' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-slider
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${value != undefined ? `value="${value}"` : ''}
        ${min != undefined ? `min="${min}"` : ''}
        ${max ? `max="${max}"` : ''}
        ${step ? `step="${step}"` : ''}
        ${gap ? `gap="${gap}"` : ''}
        ${hideMinmax ? 'hide-minmax' : ''}
        ${hideInput ? 'hide-input' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <input 
          type="range" 
          ${name ? `name="${name}-start"` : ''}
        />
        <input 
          type="range" 
          ${name ? `name="${name}-end"` : ''}
        />
      </cbp-slider>
    </cbp-form-field>
  `;
};

export const RangeSlider: any = RangeSliderTemplate.bind({});
RangeSlider.argTypes = {
  max: {
    control: 'number',
  },
}
RangeSlider.args = {
  name: 'range',
  value: '30,70'
};

