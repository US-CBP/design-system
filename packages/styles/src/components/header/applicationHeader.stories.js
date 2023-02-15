export default {
  title: 'Patterns/Header',
};

const Template = () => {
  return `
    <nav class="cbp-application-header">
      <button class="nav-home">Application Name</button>
      <div class="cbp-nav-menu">
        <div class="cbp-application-menus dh-sm-none">
          <button class="cbp-menu-dropdown">Child Page 1<i class="fas fa-chevron-down"></i></button>
          <button class="cbp-menu-dropdown">Child Page 2<i class="fas fa-chevron-down"></i></button>
          <button class="cbp-menu-dropdown">Child Page 3<i class="fas fa-chevron-down"></i></button>
        </div>
        <div>
          <!-- <button class="cbp-hamburger dh-sm-none">
            <i class="fas fa-search"></i>
          </button> -->
          <button class="cbp-hamburger" data-drawer="open">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  `;
};

export const ApplicationHeader = Template.bind({});
ApplicationHeader.args = {};
