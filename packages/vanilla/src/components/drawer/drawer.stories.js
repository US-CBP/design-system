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

      <nav class="cbp-drawer__content">
        <ul class="cbp-drawer__nav">
          <li class="cbp-drawer__nav-item--a">
            <button type="button">
              <span>
                <i class="fas fa-home"></i>
                Default/Home Page (A)
              </span>
              <i class="fas fa-angle-up"></i>
            </button>
            <ul>
              <li>
                <button type="button">Child Page 1 (B)</button>
              </li>
              <li>
                <button type="button">Child Page 2 (B)<i class="fas fa-angle-up"></i></button>
                <ul>
                  <li>
                    <button type="button">
                      Grandchild Page 1 (C)
                      <i class="fas fa-caret-up"></i>
                    </button>
                    <ul>
                      <li>
                        <button type="button" aria-selected="true">Great-Grandchild Page 1 (D)</button>
                      </li>
                      <li>
                        <button type="button">Great-Grandchild Page 2 (D)</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button type="button">Grandchild Page 2 (C)</button>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <button type="button">
              Sibling Page 1 (A)
              <i class="fas fa-angle-up"></i>
            </button>
          </li>
          <li>
            <button type="button">Sibling Page 2 (A)</button>
          </li>
          <li>
            <button type="button">Sibling Page 3 (A)</button>
          </li>
        </ul>
      </nav>
    </div>
  `;
};

export const Drawer = Template.bind({});
Drawer.args = {
  drawerPosition: "Left"
};
