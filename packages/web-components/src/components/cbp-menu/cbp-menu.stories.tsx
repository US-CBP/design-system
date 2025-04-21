export default {
  title: 'Components/Menu',
  tags: ['new'],
  argTypes: {
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
    //content: 'Hide Me.',
  },
};

const Template = ({ context, sx }) => {
  return ` 
        <cbp-menu
          ${context ? `context="${context}"` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          <!-- items -->
        </cbp-menu>
      `;
};

export const Menu = Template.bind({});
Menu.args = {};
