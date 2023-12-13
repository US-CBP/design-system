export default {
  title: 'Components/Tag',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'The visible text within the tag. HTML markup may be slotted here as well, but is not supported by Storybook.',
      control: 'text'
    },
    color: {
      description: 'The color of the tag, from a predefined list of design tokens.',
      control: { type: 'select' },
      options: ['default', 'danger', 'success', 'warning'],
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },
  },
  args: {
    label: "Tag"
  }
};

const Template = ({ label, color, sx }) => { 
  return ` 
    <cbp-tag
      ${(color && color!= 'default') ? `color=${color}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${label}
    </cbp-tag>
  `
}

export const Tag = Template.bind({});
Tag.args = {};
