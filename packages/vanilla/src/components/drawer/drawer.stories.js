export default {
  title: 'Patterns/Drawer',
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
          <button aria-label="Open Drawer" class="cbp-hamburger" data-drawer="open">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
    <nav class="cbp-drawer" data-drawer-align="left">
      <div class="cbp-drawer__header">
        <div>
          <i class="fas fa-filter"></i>
          <h6>Filter</h6>
        </div>
        <button aria-label="Close">
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
                <button>Child Page 1 (B)</button>
              </li>
              <li>
                <button>Child Page 2 (B)<i class="fas fa-angle-up"></i></button>
                <ul>
                  <li>
                    <button>
                      Grandchild Page 1 (C)
                      <i class="fas fa-caret-up"></i>
                    </button>
                    <ul>
                      <li>
                        <button>Great-Grandchild Page 1 (D)</button>
                      </li>
                      <li>
                        <button>Great-Grandchild Page 2 (D)</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button>Grandchild Page 2 (C)</button>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <button>
              Sibling Page 1 (A)
              <i class="fas fa-angle-up"></i>
            </button>
          </li>
          <li>
            <button>Sibling Page 2 (A)</button>
          </li>
          <li>
            <button>Sibling Page 3 (A)</button>
          </li>
        </ul>
      </section>
    </nav>
  `;
};

export const Drawer = Template.bind({});
Drawer.args = {};
