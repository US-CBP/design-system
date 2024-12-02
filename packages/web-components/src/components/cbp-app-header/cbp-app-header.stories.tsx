export default {
  title: 'Components/Application Header',
  //tags: ['autodocs'],
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
        <cbp-nav-item>
          <cbp-button
              tag='a'
              fill="ghost"
              color="secondary"
              href='/'
            >
            Single Nav Item 1
          </cbp-button>
        </cbp-nav-item>

        <cbp-nav-item>
          <cbp-button
            tag='a'
            fill="ghost"
            color="secondary"
            href='/'
          >
            Single Nav Item 2
          </cbp-button>
        </cbp-nav-item>
      </cbp-app-header>
      `;
};

export const ApplicationHeader = Template.bind({});
