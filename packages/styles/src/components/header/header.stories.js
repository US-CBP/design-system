export default {
  title: 'Patterns/Header',
  parameters: {
    layout: 'fullscreen',
  },
};

const UniversalHeaderTemplate = ({ username }) => {
  return `
    <header class="cbp-universal-header">
      <div class="cbp-universal-header__brand">
        <picture>
          <source srcset="assets/images/CBP_SEAL.svg" media="(max-width: 599px)" type="image/svg+xml" height="44" width="44" />
          <img src="assets/images/CBP_LOGO_HORIZONTAL_WHITE_TEXT.svg" alt="cbp brand logo" height="55" width="186" />
        </picture>
      </div>
      <ul class="cbp-universal-header__list">
        <li>
          <a href="#" class="cbp-universal-header__item" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-book"></i>
            <span>
              App Directory
            </span>
          </a>
        </li>
        <li>
          <button class="cbp-universal-header__item">
            <i class="fas fa-comment"></i>
            <span>
              Feedback
            </span>
          </button>
        </li>
        <li>
          <button class="cbp-universal-header__item">
            <i class="fas fa-user"></i>
            <span>
              ${username}
            </span>
          </button>
        </li>
      </ul>
    </header>
  `;
};

const ApplicationHeaderTemplate = () => {
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

export const UniversalHeader = UniversalHeaderTemplate.bind({});
UniversalHeader.args = {
  username: 'John Smithington',
};
UniversalHeader.argTypes = {
  username: {
    name: 'User Name',
    type: { name: 'string', required: true },
    description: 'Name of user to be displayed in the Universal Header',
    control: {
      type: 'text',
    },
  },
};

export const ApplicationHeader = ApplicationHeaderTemplate.bind({});
ApplicationHeader.args = {};
