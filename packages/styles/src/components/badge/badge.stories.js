export default {
  title: 'Patterns/Badges, Chips, and Tags',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['', 'danger'],
      description: 'Adds a modifier class to the component to display the danger variation (see generated HTML)'
    },
  },
};

const BadgeTemplate = (args) => {
  const badgeType = args.variant ? `cbp-badge--${args.variant}` : null;
  
  return `
    <div class="${badgeType ? 'cbp-badge ' + badgeType : 'cbp-badge'}">
      5
    </div>
  `;
};

export const Badge = BadgeTemplate.bind({});
Badge.args = {};
