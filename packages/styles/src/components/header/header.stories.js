export default {
  title: 'Patterns/Header',
};

const UniversalHeaderTemplate = () => {
  return `
    <header class="cbp-header">
      <div class="cbp-header__brand">
        <img src="../assets/images/CBP_LOGO_HORIZONTAL_WHITE_TEXT.svg" alt="cbp brand logo" class="dh-sm-none">
        <img src="../assets/images/CBP_SEAL.svg" alt="cbp brand logo" class="dh-lg-none">
        <span class="dh-lg-none">CBP</span>
      </div>
      <div class="cbp-header__info dh-sm-none">
        <a href="#" class="cbp-header__item" target="_blank" rel="noopener noreferrer"><i class="fas fa-book"></i>App Directory</a>
        <button class="cbp-header__item"><i class="fas fa-comment"></i>Feedback</button>
        <button class="cbp-header__item"><i class="fas fa-user"></i>John Smithington</button>
      </div>
      <div class="cbp-header__info dh-lg-none">
        <a href="#" class="cbp-header__item" target="_blank" rel="noopener noreferrer"><i class="fas fa-book"></i></a>
        <button class="cbp-header__item"><i class="fas fa-comment"></i></button>
        <button class="cbp-header__item"><i class="fas fa-user"></i></button>
      </div>
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
UniversalHeader.args = {};

export const ApplicationHeader = ApplicationHeaderTemplate.bind({});
ApplicationHeader.args = {};
