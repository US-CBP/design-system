export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'Label text (slotted) for the checkbox.',
      control: 'text',
    },
    name: {
      description: 'Specifies the `name` attribute of the slotted checkbox.',
      control: 'text',
    },
    value: {
      description: 'Specifies the `value` attribute of the slotted checkbox.',
      control: 'text',
    },
    checked: {
      description: 'Specifies the `checked` attribute of the slotted checkbox, which represents its initial checked state only.',
      control: 'boolean',
    },
    indeterminate: {
      description: 'Sets the checkbox to indeterminate, which is only relevant to checkbox groupings.',
      control: 'boolean',
    },
    disabled: {
      description: 'Renders the checkbox in a disabled state. A disabled form control does not pass a value on native submit.',
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

const Template = ({ label, name, value, checked, indeterminate, disabled, context, sx }) => {
  return ` 
      <cbp-checkbox
        ${value ? `value=${value}` : ''}
        ${disabled ? `disabled=${disabled}` : ''}
        ${checked ? `checked=${checked}` : ''}
        ${indeterminate ? `indeterminate=${indeterminate}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input 
          type="checkbox" 
          name="${name}"
          value="${value}"
          ${checked ? `checked=${checked}` : ''}
        />
        ${label}
      </cbp-checkbox>
    `;
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  label: "Checkbox label",
  name: "checkbox",
  value: "1",
}
