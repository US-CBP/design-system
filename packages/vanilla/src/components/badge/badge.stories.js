export default {
  title: 'Patterns/Badges, Chips, and Tags',
  argTypes: {
    danger: {
      name: 'Danger',
      control: { type: 'boolean' },
      description: 'Adds a modifier class to the component to display the danger variation (see generated HTML)'

    },
  },
};

const BadgeTemplate = ({danger}) => (`
  <div class="cbp-badge ${danger ? 'cbp-badge--danger' : ''}">
    5
  </div>
`);

export const Badge = BadgeTemplate.bind({});
Badge.args = {};
