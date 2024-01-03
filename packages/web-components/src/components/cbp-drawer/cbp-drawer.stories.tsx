export default {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: 'The positioning of the drawer relative to the viewport.',
      control: 'radio',
        options: [
          'left',
          'right',
        ],
    },
    open: {
      description: 'Specifies whether the drawer is open or closed.',
      control: 'boolean'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },
  }
};


const Template = ({position, open, accessibilityText, sx}) => {
  return `
    <cbp-button
      type="button"
      color="secondary"
      accessibility-text="Open Drawer"
      target-prop="open"
      controls="drawer"
    >
      <cbp-icon name="bars"></cbp-icon>
    </cbp-button>

    <cbp-drawer
      ${position ? `position=${position}` : ''}
      ${open ? `open=${open}` : ''}
      ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      id="drawer"
    >
      <cbp-panel
        aria-labelledby="panelheader"
        role="complementary"
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="panelheader"
        >
          Sidebar Header
        </cbp-typography>
        <p>Sidebar Content</p>
      </cbp-panel>
    </cbp-drawer>
  `;
};

export const Drawer = Template.bind({});
Drawer.args = {
  position: "left"
};


/*
      <div class="cbp-drawer__header">
        <div>
          <cbp-icon name="filter"></cbp-icon>
          <h3>Filter</h3>
        </div>
        <cbp-button aria-label="Close">
          <cbp-icon name="circle-xmark"></cbp-icon>
        </cbp-button>
      </div>

      <div class="cbp-drawer__content"></div>

*/