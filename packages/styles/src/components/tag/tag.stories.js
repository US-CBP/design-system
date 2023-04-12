export default {
  title: 'Patterns/Badges, Chips, and Tags',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['', 'danger', 'success', 'warning'],
      description: 'Adds a modifier class to the component to display different color variations (see generated HTML)'
    },
  },
};


const TagTemplate = (args) => {
  const tagType = args.variant ? `cbp-tag--${args.variant}` : null;
  
  return `
      <div class="${tagType ? 'cbp-tag ' + tagType : 'cbp-tag'}">
        Hotlist
      </div>
  `;
};

export const Tag = TagTemplate.bind({});
Tag.args = {};