export default {
  title: 'Patterns/Badges, Chips, and Tags',
  argTypes: {
    variant: {
      name: 'Variant',
      control: { type: 'select' },
      options: ['', 'danger', 'success', 'warning'],
      description:
        'Adds a modifier class to the component to display different color variations (see generated HTML)',
    },
  },
};

const TagTemplate = ({ variant }) => `
  <div class="cbp-tag ${variant ? 'cbp-tag--' + variant : ''}">
    Hotlist
  </div>
`;

export const Tag = TagTemplate.bind({});
Tag.args = {};
