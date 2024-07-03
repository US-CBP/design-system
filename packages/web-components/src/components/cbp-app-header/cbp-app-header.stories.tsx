export default {
  title: 'Components/Application Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
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
};

const Template = ({ context, sx }) => {
  return ` 
      <cbp-app-header
        context="${context}"
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <a slot="cbp-home" href="/" class="nav-home">Application Name</a>
      </cbp-app-header>
      `;
};

export const ApplicationHeader = Template.bind({});
