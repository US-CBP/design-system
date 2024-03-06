export default {
  title: 'Components/Hide',
  tags: ['autodocs'],
  argTypes: {
    content: {
      name: 'Content (slotted)',
      description: 'The content to be conditionally hidden. (May contain any markup, which is not supported by Storybook.)',
      control: 'text',
    },
    display: {
      control: 'text',
    },
    hide: {
      control: 'boolean',
    },
    visuallyHide: {
      control: 'boolean',
    },
    hideAt: {
      control: 'text',
    },
    visuallyHideAt: {
      control: 'text',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    content: 'Hide Me.',
  },
};


const Template = ({ display, hide, visuallyHide, hideAt, visuallyHideAt, content, sx }) => {
  return ` 
        <cbp-hide
          ${display ? `display=${display}` : ''}
          ${hide ? `hide` : ''}
          ${visuallyHide ? `visually-hide` : ''}
          ${hideAt ? `hide-at=${hideAt}` : ''}
          ${visuallyHideAt ? `visually-hide-at=${visuallyHideAt}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${content}
        </cbp-hide>
      `;
};

export const Hide = Template.bind({});
Hide.args = {}