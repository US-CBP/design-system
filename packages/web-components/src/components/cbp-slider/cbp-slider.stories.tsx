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
};





const VolumeSliderTemplate = ({ label, description, fieldId, name, min, max, step, hideMinmax, hideInput, error, disabled, value, context, sx }) => {
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
        <cbp-icon size="var(--cbp-font-size-subhead)" slot="cpb-slider-before">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg>
        </cbp-icon>

        <input 
          type="range" 
          ${name ? `name="${name}"` : ''}
        />

        <cbp-icon size="var(--cbp-font-size-body)" slot="cpb-slider-after">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
        </cbp-icon>


      </cbp-slider>
    </cbp-form-field>
  `;
};

export const VolumeSlider = VolumeSliderTemplate.bind({});
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
        ${gap ? `gap="${gap}"` : ''}
        ${hideMinmax ? `hide-minmax` : ''}
        ${hideInput ? `hide-input` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
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

export const RangeSlider = RangeSliderTemplate.bind({});
RangeSlider.argTypes = {
  max: {
    control: 'number',
  },
}
RangeSlider.args = {
  name: 'range',
};

