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
          <img src="assets/images/CBP_LOGO_HORIZONTAL_WHITE_TEXT.svg" alt="U.S. Customs and Border Protection" height="55" width="186" />
        </picture>
      </div>
      <ul class="cbp-universal-header__list">
        <li>
          <a href="#" class="cbp-universal-header__item" target="_blank" rel="noopener noreferrer" aria-labelledby="application-directory">
            <i class="fas fa-book"></i>
            <span id="application-directory">
              App Directory
            </span>
          </a>
        </li>
        <li>
          <button class="cbp-universal-header__item" aria-labelledby="feedback">
            <i class="fas fa-comment"></i>
            <span id="feedback">
              Feedback
            </span>
          </button>
        </li>
        <li>
          <button class="cbp-universal-header__item" aria-label="User Login">
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
      <a href="/" class="nav-home">Application Name</a>
      <div class="cbp-nav-menu">
        <div class="cbp-application-menus dh-sm-none">
          <button type="button" class="cbp-nav-item cbp-menu-dropdown" data-target="cbp-nav-drawer-control" data-controls="cbp-nav-drawer">Child Page 1<i class="fas fa-chevron-down"></i></button>
          <button type="button" class="cbp-nav-item cbp-menu-dropdown" data-target="cbp-nav-drawer-control" data-controls="cbp-nav-drawer">Child Page 2<i class="fas fa-chevron-down"></i></button>
          <a href="#" class="cbp-nav-item">Child Page 3</a>
        </div>
        <div>
          <button class="cbp-hamburger" data-drawer="open" id="cbp-nav-drawer-control" aria-label="Open navigation drawer">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>

    <nav class="cbp-drawer" id="cbp-nav-drawer" data-drawer-align="right">
      <div class="cbp-drawer__header">
        <div>
          <i class="fas fa-filter"></i>
          <h6>Filter</h6>
        </div>
        <button>
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
      <section class="cbp-drawer__content">
        <ul class="cbp-drawer__nav">
          <li class="cbp-drawer__nav-item--a">
            <button>
              <span>
                <i class="fas fa-home"></i>
                Default/Home Page (A)
              </span>
              <i class="fas fa-angle-up"></i>
            </button>
            <ul>
              <li>
                <button>
                  Child Page 1 (B)
                  <i class="fas fa-angle-up"></i>
                </button>
                <ul>
                  <li><a href="#">Grandchild Page 1 (B)</a></li>
                  <li><a href="#">Grandchild Page 2 (B)</a></li>
                  <li><a href="#">Grandchild Page 3 (B)</a></li>
                </ul>
              </li>
              <li>
                <button>
                  Child Page 2 (B)
                  <i class="fas fa-angle-up"></i>
                </button>
                <ul>
                  <li><a href="#">Grandchild Page 1 (B)</a></li>
                  <li><a href="#">Grandchild Page 2 (B)</a></li>
                  <li><a href="#">Grandchild Page 3 (B)</a></li>
                </ul>
              </li>
              <li><a href="#">Child Page 3</a></li>
            </ul>
        </ul>
      </section>
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
