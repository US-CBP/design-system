export default {
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'The visible text within the chip.',
      control: 'text'
    },
    name: {
      control: 'text'
    },
    value: {
      control: 'text'
    },
    pressed: {
      description: 'The initial active/selected state.',
      control: 'boolean',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },
  },
  args: {
    label: "Chip"
  }
};


const Template = ({ label, name, value, pressed, sx }) => { 
  return ` 
      <cbp-chip
        ${name ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${pressed ? 'pressed' : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${label}
      </cbp-chip>
    `
}
export const Chip = Template.bind({});

