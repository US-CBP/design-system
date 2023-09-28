export default {
  title: 'Patterns/Drawer',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    drawerPosition: {
      name: 'Drawer Position',
      description: 'The positioning of the drawer relative to the viewport.',
      control: 'radio',
        options: [
          'Left',
          'Right',
        ],
    },
  }
};

// cbp-hamburger
const Template = ({drawerPosition}) => {

  return `
    <button type="button" aria-label="Open Drawer" class="cbp-btn-square cbp-btn__secondary-outline" data-drawer="open">
      <i class="fas fa-bars"></i>
    </button>

    <div class="cbp-drawer" data-drawer-align="${drawerPosition.toLowerCase()}">
      <div class="cbp-drawer__header">
        <div>
          <i class="fas fa-filter"></i>
          <h3>Filter</h3>
        </div>
        <button aria-label="Close">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>

      <div class="cbp-drawer__content"></div>
    </div>
  `;
};

export const Drawer = Template.bind({});
Drawer.args = {
  drawerPosition: "Left"
};
