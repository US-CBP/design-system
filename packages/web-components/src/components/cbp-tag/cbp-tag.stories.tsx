export default {
  title: 'Components/Tag',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'The visible text within the tag. HTML markup may be slotted here as well, but is not supported by Storybook.',
      control: 'text',
    },
    color: {
      description: 'The color of the tag, from a predefined list of design tokens.',
      control: 'select',
      options: ['default', 'danger', 'success', 'warning'],
    },
    withIcon: {
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
    label: 'Tag',
  },
};

const Template = ({ label, color, withIcon, context, sx }) => {
  const Icons = {
    default: 'circle-info',
    danger: 'circle-xmark',
    success: 'check',
    warning: 'triangle-exclamation',
  };
  const Icon = withIcon ? Icons[color] || 'circle-info' : null;

  return ` 
    <cbp-tag
      ${color && color != 'default' ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${Icon ? `<cbp-icon name="${Icon}" size="0.75rem"sx='{"margin-right":"var(--cbp-space-1x)"}'></cbp-icon>` : ''}
      ${label}
    </cbp-tag>
  `;
};

export const Tag = Template.bind({});
Tag.args = {};
