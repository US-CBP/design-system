export default {
  title: 'Components/Chip',
  tags: ['beta'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'The visible text within the chip.',
      control: 'text',
    },
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    pressed: {
      description: 'The initial active/selected state.',
      control: 'boolean',
    },
    disabled: {
      description: '',
      control: 'boolean'
    },
    context: {
      control: 'select',
      options: ["light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    label: 'Chip',
  },
};

const Template = ({ label, name, value, pressed, disabled, context, sx }) => {
  return ` 
      <cbp-chip
        ${name ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${pressed ? 'pressed' : ''}
        ${disabled ? 'disabled' : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${label}
      </cbp-chip>
    `;
};
export const Chip = Template.bind({});


const ChipWithCustomIconTemplate = ({ label, name, value, icon, pressed, disabled, context, sx }) => {
  return ` 
      <cbp-chip
        ${name ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${icon ? `icon="${icon}"` : ''}
        ${pressed ? 'pressed' : ''}
        ${disabled ? 'disabled' : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <cbp-icon slot="cbp-chip-icon" name="${icon}"></cbp-icon>
        ${label}
      </cbp-chip>
    `;
};
export const ChipWithCustomIcon = ChipWithCustomIconTemplate.bind({});
ChipWithCustomIcon.args = {
  icon: 'filter'
}