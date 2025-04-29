export default {
  title: 'Components/Menu',
  tags: ['new'],
  argTypes: {
    position: {
      control: 'select',
      options: [ 'bottom-start', "bottom-end", 'top-start', "top-end"]
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
    //content: 'Hide Me.',
  },
};

const Template = ({ position, context, sx }) => {
  return ` 
        <cbp-menu
          uid="menuId"
          ${position ? `position="${position}"` : ''}
          ${context ? `context="${context}"` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >

          <cbp-button
            fill="outline"
            color="secondary"
            target-prop="open"
            controls="menuId"
          >   
            <cbp-icon name="bars"></cbp-icon>     
            Menu
          </cbp-button>

          <cbp-menu-item>
            <cbp-link href="#">Option 1</cbp-link>
          </cbp-menu-item>
          <cbp-menu-item>
            <a href="#">
              <cbp-icon name="user"></cbp-icon>
              Option 2
            </a>
          </cbp-menu-item>
          <cbp-menu-item>
            <cbp-link href="#" context="dark-inverts">Option 3 is longer</cbp-link>
          </cbp-menu-item>
          <cbp-menu-item>
            <cbp-link href="#" context="dark-inverts">Option 4</cbp-link>
          </cbp-menu-item>
        </cbp-menu>
      `;
};

export const Menu = Template.bind({});
Menu.args = {};
