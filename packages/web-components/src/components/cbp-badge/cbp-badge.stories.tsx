export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'The visible text within the badge.',
      control: 'text',
    },
    color: {
      description: 'The color of the badge.',
      control: { type: 'select' },
      options: ['default', 'danger'],
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
    label: '33',
  },
};

const BadgeTemplate = ({ label, color, context, sx }) => {
  return ` 
    <cbp-badge
      ${color ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${label}
    </cbp-badge>
  `;
};

export const Badge = BadgeTemplate.bind({});
Badge.args = {};
