export default {
  title: 'Components/Radio',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'Label text (slotted) for the radio button.',
      control: 'text',
    },
    name: {
      description: 'Specifies the `name` attribute of the slotted radio button.',
      control: 'text',
    },
    value: {
      description: 'Specifies the `value` attribute of the slotted radio button.',
      control: 'text',
    },
    checked: {
      description: 'Specifies the `checked` attribute of the slotted radio button, which represents its initial checked state only.',
      control: 'boolean',
    },
    disabled: {
      description: 'Renders the radio button in a disabled state. A disabled form control does not pass a value on native submit.',
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
};

const Template = ({ label, name, value, checked, disabled, context, sx }) => {
  return ` 
      <cbp-radio
        ${value ? `value=${value}` : ''}
        ${disabled ? `disabled=${disabled}` : ''}
        ${checked ? `checked=${checked}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input 
          type="radio" 
          name="${name}"
          value="${value}"
          ${checked ? `checked` : ''}
        />
        ${label}
      </cbp-radio>
    `;
};

export const Radio = Template.bind({});
Radio.args = {
  label: "Radio button label",
  name: "radio",
  value: "1",
}

